import { managerEnv } from '@configs/kong-manager';
import { expect, test } from '@src/kong-manager/fixtures';

test.describe('Kong Manager: Wokspaces', () => {
  const adminUrl = managerEnv.current.adminUrl;
  test.beforeEach(async ({ page }) => {

  });

  test('should have a default workspace at least',
    { tag: '@sanity' },
    async ({ kmUIHandler, kmApiHandler }) => {
      const { page, workspacesSteps } = kmUIHandler;
      const { workspacesApi } = kmApiHandler;
      await workspacesSteps.navToWorkspaces();
      let resp = await workspacesApi.getWorkspaces(
        page.request,
        {
          host: adminUrl,
          queryParams: { size: 15 }
        });
      expect(
        await workspacesSteps.workspacesPage.getWorkspaceRowCount(),
        { message: "api level assert" })
        .toEqual(resp.data.length);

    });

  test('should nav to the given workspace',
    { tag: '@sanity' },
    async ({ kmUIHandler }) => {
      const { workspacesSteps } = kmUIHandler;
      await workspacesSteps.navToOverview();
    })
});
