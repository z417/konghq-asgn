import { test } from '@src/kong-manager/fixtures';

export function useGoToWorkspaces() {
    test.beforeAll(async ({ kongManagerHandler }) => {
    });
}

export function useContextDebug() {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`[Start] Running ${testInfo.title}`);
    });
}
