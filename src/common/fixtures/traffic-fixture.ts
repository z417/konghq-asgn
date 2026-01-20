import { managerEnv } from '@configs/kong-manager/env';
import { type TestFixture } from '@playwright/test';
import { sendGatewayRequest, type TrafficOptions, type TrafficResponse } from '../helpers/traffic-helper';

export type GatewayTraffic = (path: string, options: TrafficOptions) => Promise<TrafficResponse>;

export const gatewayTraffic: TestFixture<GatewayTraffic, any> = async ({ }, use): Promise<void> => {
  const proxyBaseUrl = managerEnv.current.proxyUrl;

  const verifyTraffic: GatewayTraffic = async (path, options) => {
    const fullUrl = `${proxyBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    console.log(`[Traffic Fixture] Verifying ${options.protocol} to: ${fullUrl}`);

    return await sendGatewayRequest(fullUrl, options);
  };

  await use(verifyTraffic);
};
