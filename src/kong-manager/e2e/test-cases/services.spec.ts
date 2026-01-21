import { managerEnv } from '@configs/kong-manager';
import { expect, test } from '@src/kong-manager/fixtures';

test.describe('Kong Manager: Services Management', () => {
  const adminUrl = managerEnv.current.adminUrl;

  test('should create a service and verify in control plane',
    { tag: '@sanity @function' },
    async ({ kmUIHandler, uniqueStr, kmApiHandler }) => {
      const { workspacesSteps, gatewayServicesSteps } = kmUIHandler;
      const { request, servicesApi } = kmApiHandler
      await workspacesSteps.navToWorkspaces();
      await workspacesSteps.navToOverview();
      await workspacesSteps.navToGatewayServices();

      await gatewayServicesSteps.clickNewGatewayServiceBtn();
      await gatewayServicesSteps.checkFullUrlRadio();
      await gatewayServicesSteps.inputFullUrl('https://httpbin.konghq.com');
      const name = await gatewayServicesSteps.inputGatewayServiceName(uniqueStr('-'));
      await gatewayServicesSteps.clickSaveBtn();

      let resp = await servicesApi.getAService(
        request,
        {
          host: adminUrl,
          pathParams: { name }
        }
      )
      expect(resp.name).toEqual(name);
    });

  test('TODO:should create a service successfully if service name length is less than 64 characters',
    { tag: '@sanity @buondary' },
    async ({ }) => {
    });

  test('TODO:should create a service failed if service name repeated',
    { tag: '@sanity @exception' },
    async ({ }) => {
    });

});

