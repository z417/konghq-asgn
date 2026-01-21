import { managerEnv } from '@configs/kong-manager';
import { test } from '@src/kong-manager/fixtures';
export const useCreateServiceInWorkspace = ({
    workspaceName,
    serviceName,
    url,
}: Record<'workspaceName' | 'serviceName' | 'url', string>) => {
    const adminUrl = managerEnv.current.adminUrl;

    test.beforeAll(async ({ kmApiHandler }) => {
        const { request, servicesApi } = kmApiHandler
        await servicesApi.createNewServiceInWorkspace(
            request,
            {
                host: adminUrl,
                pathParams: workspaceName,
                body: {
                    name: serviceName,
                    url,
                }
            }
        );
    });

    test.afterAll(async ({ kmApiHandler }) => {
        const { request, servicesApi } = kmApiHandler
        await servicesApi.deleteService(
            request,
            {
                host: adminUrl,
                pathParams: serviceName,
            }
        );
    });
}

export function useGoToWorkspaces() {
    test.beforeAll(async ({ kmUIHandler }) => {
    });
}

export function useContextDebug() {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`[Start] Running ${testInfo.title}`);
    });
}
