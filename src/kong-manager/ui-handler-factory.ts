import { type Page } from "@playwright/test";
import { GatewayServicesPage } from "@src/kong-manager/page-objects/workspaces/gateway-services-page";
import { OverviewPage } from "@src/kong-manager/page-objects/workspaces/overview-page";
import { WorkspacesPage } from "@src/kong-manager/page-objects/workspaces/workspaces-page";
import { OverviewSteps } from "@src/kong-manager/test-steps/workspaces/overview-steps";
import { WorkspacesSteps } from "@src/kong-manager/test-steps/workspaces/workspaces-steps";

export interface KongManagerUIHandler {
    page?: Page;
    workspacesSteps?: WorkspacesSteps;
    overviewSteps?: OverviewSteps;
}

export const createUiHandler = (page: Page): KongManagerUIHandler => {
    const workspacesPage = new WorkspacesPage(page);
    const overviewPage = new OverviewPage(page);
    const gatewayServicesPage = new GatewayServicesPage(page);

    const workspacesSteps = new WorkspacesSteps(workspacesPage);
    const overviewSteps = new OverviewSteps(overviewPage);
    return {
        page,
        workspacesSteps,
        overviewSteps,
    }
}
