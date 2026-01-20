import { test } from '@src/kong-manager/fixtures';

test.describe('Kong Manager: Wokspaces', () => {
  test('should have a default workspace at least',
    { tag: '@sanity' },
    async ({ kmUIHandler }) => {
      const { workspacesSteps } = kmUIHandler;
      await workspacesSteps.navToWorkspaces();
    });
});

