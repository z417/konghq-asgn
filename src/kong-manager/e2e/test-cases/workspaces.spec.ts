import { test } from '@src/kong-manager/fixtures';

test.describe('Kong Manager: Wokspaces', () => {

  test.beforeEach(async ({ page }) => {

  });

  test('should have a default workspace at least',
    { tag: '@sanity' },
    async ({ kmUIHandler,kmApiHandler }) => {
      const { workspacesSteps } = kmUIHandler;
      await workspacesSteps.navToWorkspaces();
    });

  test('should nav to the given workspace',
    { tag: '@sanity' },
    async ({ kmUIHandler }) => {
      const { workspacesSteps } = kmUIHandler;
      await workspacesSteps.navToOverview(0);
    })
});
