import { test as base, expect } from '@playwright/test';
import { ScreenshotHelper } from '../helpers/screenshot-helper';
import { gatewayTraffic, type GatewayTraffic } from './traffic-fixture';
import { uniqueStr, type UniqueStr } from './unique-str-fixture';

interface CommonFixtures {
    screenshoter: ScreenshotHelper;
    gatewayTraffic: GatewayTraffic;
}

interface WorkerFixtures {
    uniqueStr: UniqueStr;
}

export const test = base.extend<CommonFixtures, WorkerFixtures>({
    screenshoter: async ({ page }, use) => {
        await use(new ScreenshotHelper(page));
    },
    gatewayTraffic,
    uniqueStr: [uniqueStr, { scope: 'worker' }],
});

export { expect };
