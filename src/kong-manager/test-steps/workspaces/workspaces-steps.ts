import { expect, test } from '@src/kong-manager/fixtures/index';
import { WorkspacesPage } from "@src/kong-manager/page-objects/workspaces/workspaces-page";

export class WorkspacesSteps {
    private readonly workspacesPage: WorkspacesPage;

    constructor(workspacesPage: WorkspacesPage) {
        this.workspacesPage = workspacesPage;
    }

    async navToWorkspaces(): Promise<void> {
        await test.step('nav to workspaces', async () => {
            await this.workspacesPage.getWorkspaces().click();
            await expect(this.workspacesPage.getPage()).toHaveURL(/.*workspaces/);
        })
    }

    async navToOverview(by: string | number): Promise<void> {
        await test.step(`nav to overview of workspace ${by}`, async () => {
            await this.workspacesPage.getWorkspace(by).click();
            await expect(this.workspacesPage.getPage()).toHaveURL(/.*\/overview/);
        })
    }
}
