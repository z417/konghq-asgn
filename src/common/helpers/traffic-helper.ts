import { request } from '@playwright/test';
import * as net from 'net';

export type Protocol = 'http' | 'https' | 'tcp' | 'udp' | 'ws' | 'grpc';

export interface TrafficOptions {
    protocol: Protocol;
    method?: string;
    headers?: Record<string, string>;
    data?: string;
    port?: number;
    timeout?: number;
    maxRetries?: number;
}

export interface TrafficResponse {
    status?: number;
    body?: string | Buffer;
    headers?: Record<string, string>;
}

async function withRetry(
    fn: () => Promise<TrafficResponse>,
    maxRetries: number
): Promise<TrafficResponse> {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (e) {
            lastError = e;
            await new Promise(res => setTimeout(res, 1000 * Math.pow(2, i)));
        }
    }
    throw new Error(`Traffic failed after ${maxRetries} retries. Last error: ${lastError}`);
}

/**
 * Multi-Protocol Traffic Engine
 * Essential for Gateway testing as config sync takes time.
 */
export const sendGatewayRequest = async (
    url: string,
    options: TrafficOptions
): Promise<TrafficResponse> => {
    const { timeout = 5000, maxRetries = 5 } = options;
    return withRetry(async (): Promise<TrafficResponse> => {
        switch (options.protocol) {
            case 'http':
            case 'https': {
                const ctx = await request.newContext();
                const resp = await ctx.fetch(url, {
                    method: options.method || 'GET',
                    headers: options.headers,
                    data: options.data,
                    timeout
                });
                if (resp.status() === 404 || resp.status() >= 500) {
                    throw new Error(`HTTP ${resp.status()}: Gateway not ready`);
                }
                return { status: resp.status(), body: await resp.text(), headers: resp.headers() };
            }

            case 'tcp':
                return new Promise((resolve, reject) => {
                    const [host, portStr] = url.replace('tcp://', '').split(':');
                    const client = net.createConnection({
                        host,
                        port: parseInt(portStr || options.port?.toString() || '80')
                    });
                    client.setTimeout(timeout);
                    client.on('connect', () => {
                        const payload = typeof options.data === 'string'
                            ? options.data : (options.data || 'ping');
                        client.write(payload);
                    });
                    client.on('data', (data) => {
                        resolve({ status: 200, body: data });
                        client.end();
                    });
                    client.on('error', (err) => { client.destroy(); reject(err); });
                    client.on('timeout', () => { client.destroy(); reject(new Error('TCP Timeout')); });
                });
            case 'udp':
                return new Promise((resolve, reject) => { 
                });
            case 'ws':
                return new Promise((resolve, reject) => { 
                });
            case 'grpc':
                return { status: 0, body: Buffer.from('gRPC Response Stub') };

            default:
                throw new Error(`Protocol ${options.protocol} not implemented`);
        }
    }, maxRetries);
}
