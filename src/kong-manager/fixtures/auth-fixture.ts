import { BrowserContext, TestFixture } from '@playwright/test';
import { fetchKongAdminToken } from '../helpers/auth-helper';

export type KongAdminTokenSet = (ctx: BrowserContext) => Promise<void>;

/**
 * Fixture to conditionally set Admin Token.
 */
export const kongAdminTokenSet: TestFixture<KongAdminTokenSet, {}> = async (
    { },
    use,
): Promise<void> => {
    await use(
        async (context: BrowserContext): Promise<void> => {
            const token = await fetchKongAdminToken();
            // Only set header if a valid token was returned (Defensive Check)
            if (token && token.length > 0) {
                await context.setExtraHTTPHeaders({
                    'Kong-Admin-Token': `${token}`
                });
                console.log('[Fixture] Admin Token successfully injected into Context.');
            } else {
                console.log('[Fixture] No token found or required. Proceeding with unauthenticated context.');
            }
        }
    );
};
