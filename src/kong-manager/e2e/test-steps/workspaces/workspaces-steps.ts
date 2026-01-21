import { WorkspacesPage } from "@src/kong-manager/e2e/page-objects/workspaces/workspaces-page";
import { expect, test } from '@src/kong-manager/fixtures';

export class WorkspacesSteps {
    // TODO: more steps
    readonly workspacesPage: WorkspacesPage;

    constructor(workspacesPage: WorkspacesPage) {
        this.workspacesPage = workspacesPage;
    }
    async navToWorkspaces(): Promise<void> {
        await test.step('loading done', async () => {
            await Promise.all([
                this.workspacesPage.getLoading()
                    .waitFor(
                        { state: 'hidden' }
                    ),
                this.workspacesPage.getSiderbarContentContainer()
                    .waitFor(
                        { state: 'visible' }
                    )
            ])
        });
        await test.step('click sidebar of Workspaces', async () => {
            await this.workspacesPage.getWorkspacesSidebar().click();
            await expect(this.workspacesPage.getPage()).toHaveURL(/.*workspaces/);
            expect(await this.workspacesPage.getWorkspace().count()).toBeGreaterThanOrEqual(1);
        });
    }

    async navToOverview(by?: string | number): Promise<void> {
        await test.step(`click workspace item: ${by}`, async () => {
            await this.workspacesPage.getWorkspace(by).click();
            await expect(this.workspacesPage.getPage()).toHaveURL(/.*\/overview/);
        })
    }
}
