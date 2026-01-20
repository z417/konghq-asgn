import { type APIRequestContext, type Page, type TestFixture } from '@playwright/test';
import { createApiHandler, type KongManagerApiHandler } from '@src/kong-manager/api-handler-factory';
import { createUiHandler, type KongManagerUIHandler } from '@src/kong-manager/ui-handler-factory';

export const kongManagerUIHandler: TestFixture<KongManagerUIHandler, { page: Page }>
    = async ({ page }, use) => {
        await page.goto('/', { waitUntil: 'load' });
        await use(createUiHandler(page));
    };

export const kongManagerApiHandler: TestFixture<KongManagerApiHandler, { request: APIRequestContext }>
    = async ({ request }, use) => {
        await use(createApiHandler(request));
        await request.dispose();
    };

export { KongManagerApiHandler, KongManagerUIHandler };

