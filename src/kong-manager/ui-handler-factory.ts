import { type Page } from "@playwright/test";
import { GatewayServicesPage } from "@src/kong-manager/e2e/page-objects/workspaces/gateway-services-page";
import { OverviewPage } from "@src/kong-manager/e2e/page-objects/workspaces/overview-page";
import { RoutesPage } from "@src/kong-manager/e2e/page-objects/workspaces/routes-page";
import { WorkspacesPage } from "@src/kong-manager/e2e/page-objects/workspaces/workspaces-page";
import { GatewayServicesSteps } from "@src/kong-manager/e2e/test-steps/workspaces/gateway-services-steps";
import { OverviewSteps } from "@src/kong-manager/e2e/test-steps/workspaces/overview-steps";
import { RoutesSteps } from "@src/kong-manager/e2e/test-steps/workspaces/routes-steps";
import { WorkspacesSteps } from "@src/kong-manager/e2e/test-steps/workspaces/workspaces-steps";

export interface KongManagerUIHandler {
    page?: Page;
    workspacesSteps?: WorkspacesSteps;
    overviewSteps?: OverviewSteps;
    gatewayServicesSteps?: GatewayServicesSteps;
    routesSteps?: RoutesSteps;
}

export const createUiHandler = (page: Page): KongManagerUIHandler => {
    const workspacesPage = new WorkspacesPage(page);
    const overviewPage = new OverviewPage(page);
    const gatewayServicesPage = new GatewayServicesPage(page);
    const routesPage = new RoutesPage(page);

    const workspacesSteps = new WorkspacesSteps(workspacesPage);
    const overviewSteps = new OverviewSteps(overviewPage);
    const gatewayServicesSteps = new GatewayServicesSteps(gatewayServicesPage);
    const routesSteps = new RoutesSteps(routesPage);
    return {
        page,
        workspacesSteps,
        overviewSteps,
        gatewayServicesSteps,
        routesSteps,
    }
}
