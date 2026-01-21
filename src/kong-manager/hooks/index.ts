import { managerEnv } from '@configs/kong-manager';
import { expect, test } from '@src/kong-manager/fixtures';
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
        const status = await servicesApi.deleteService(
            request,
            {
                host: adminUrl,
                pathParams: serviceName,
            }
        );
        await expect(status,
            {
                message: "Successfully deleted Service or the resource didn't exist"
            }).toEqual(204)
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
