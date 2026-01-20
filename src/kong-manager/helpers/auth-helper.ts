import { managerEnv } from '@configs/kong-manager';
import { request } from '@playwright/test';

// Cache the token at the module level to share across tests in the same worker
let cachedToken: string | null = null;

export const fetchKongAdminToken = async (): Promise<string> => {
    // Return cached token if available to avoid redundant API calls
    if (cachedToken) return cachedToken;

    const { adminUrl, auth } = managerEnv.current;
    const apiContext = await request.newContext();
    
    try {
        const response = await apiContext.post(`${adminUrl}/auth/login`, {
            data: { username: auth.username, password: auth.password },
            timeout: 5000 // Short timeout for faster failover
        });

        // Defensive Programming: 
        // 404 means Auth is not enabled (OSS version), 401/403 means credentials needed but failed
        if (response.status() === 404 || response.status() === 405) {
            console.warn('[AuthHelper] Auth endpoint not found. Assuming Kong OSS (No Auth).');
            return '';
        }

        if (!response.ok()) {
            console.error(`[AuthHelper] Auth failed with status ${response.status()}. Proceeding without token.`);
            return '';
        }

        const body = await response.json();
        cachedToken = body.token || body.access_token || '';
        return cachedToken;
    } catch (error) {
        console.error('[AuthHelper] Network error during auth, possibly no connectivity to Admin API:', error);
        return '';
    } finally {
        await apiContext.dispose();
    }
};
