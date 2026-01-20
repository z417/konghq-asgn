import { type APIRequestContext, type Page, type TestFixture } from '@playwright/test';
import { createApiHandler, type KongManagerApiHandler } from '@src/kong-manager/api-handler-factory';
import { createUiHandler, type KongManagerUIHandler } from '@src/kong-manager/ui-handler-factory';

export const kongManagerUIHandler: TestFixture<KongManagerUIHandler, { page: Page }>
    = async ({ page }, use) => {
        const handler = createUiHandler(page);
        await use(handler);
    };

export const kongManagerApiHandler: TestFixture<KongManagerApiHandler, { request: APIRequestContext }>
    = async ({ request }, use) => {
        const handler = createApiHandler(request);
        await use(handler);
        await request.dispose();
    };

export { KongManagerApiHandler, KongManagerUIHandler };

