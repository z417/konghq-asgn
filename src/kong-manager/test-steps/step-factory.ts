import { Page } from "@playwright/test";
import { WorkspacesPage } from "@src/kong-manager/page-objects/workspaces/workspaces-page";
import { WorkspacesSteps } from "@src/kong-manager/test-steps/workspaces/workspaces-steps";

export interface KongManagerHandler {
    page?: Page;
    workspacesSteps?: WorkspacesSteps;
}

export const createTestSteps = (page: Page): KongManagerHandler => {
    const workspacesPage = new WorkspacesPage(page);

    const workspacesSteps = new WorkspacesSteps(workspacesPage);
    return { page, workspacesSteps }
}
