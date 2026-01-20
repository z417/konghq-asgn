import { Page, TestFixture } from '@playwright/test';
import { createTestSteps, type KongManagerHandler } from '@src/kong-manager/test-steps/step-factory';

export const kongManagerHandler: TestFixture<KongManagerHandler, { page: Page }> = async ({ page }, use) => {
    const handler = createTestSteps(page);
    await use(handler);
};

export { KongManagerHandler };

