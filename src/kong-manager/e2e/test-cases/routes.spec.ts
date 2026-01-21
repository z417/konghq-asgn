import { managerEnv } from '@configs/kong-manager';
import { expect, test } from '@src/kong-manager/fixtures';
import { useCreateServiceInWorkspace } from '@src/kong-manager/hooks';

test.describe('Kong Manager: Routes Management', () => {
  const { adminUrl, proxyUrl } = managerEnv.current;
  useCreateServiceInWorkspace({
    workspaceName: 'default',
    serviceName: 'Service4RoutesTests',
    url: 'https://httpbin.konghq.com'
  });

  test('should create a route and verify in control plane',
    { tag: '@sanity @function' },
    async ({ kmUIHandler, uniqueStr, kmApiHandler, gatewayTraffic }) => {
      const { workspacesSteps, routesSteps } = kmUIHandler;
      const { request, routesApi } = kmApiHandler
      const nameOrPath = uniqueStr('/');

      await workspacesSteps.navToWorkspaces();
      await workspacesSteps.navToOverview();
      await workspacesSteps.navToRoutes();

      await routesSteps.clickNewRouteBtn();
      await routesSteps.inputName(nameOrPath.replaceAll('/', ''));
      const chooseService = await routesSteps.inputService();
      await routesSteps.inputPath(`/${nameOrPath}`);
      await routesSteps.clickSaveBtn();
      // api level verification
      let resp = await routesApi.getARoute(
        request,
        {
          host: adminUrl,
          pathParams: nameOrPath.replaceAll('/', '')
        }
      )
      expect(resp.name).toEqual(nameOrPath.replaceAll('/', ''));
      // TODO: db level verification
      // verify proxy success
      const { status, headers } = await gatewayTraffic(`${nameOrPath}/anything`,
        {
          protocol: 'http',
          method: 'GET',
        })
      await expect(status).toEqual(200);
    });

  test('TODO:should create a route successfully if route name length is less than 64 characters',
    { tag: '@sanity @buondary' },
    async ({ }) => {
    });

  test('TODO:should create a route failed if route name repeated',
    { tag: '@sanity @exception' },
    async ({ }) => {
    });
});

