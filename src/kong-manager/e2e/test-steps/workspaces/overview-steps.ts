import { OverviewPage } from "@src/kong-manager/e2e/page-objects/workspaces/overview-page";
import { test } from '@src/kong-manager/fixtures';

export class OverviewSteps {
    // TODO: more steps
    readonly overviewPage: OverviewPage;

    constructor(overviewPage: OverviewPage) {
        this.overviewPage = overviewPage;
    }

    async clickAddGatewayServiceBtn(): Promise<void> {
        await test.step('click Add a Gateway Service btn', async () => {
            await this.overviewPage.getAddGatewayServiceBtn().click();
            // TODO expect
        })
    }
    async clickAddPlugin(): Promise<void> {
        await test.step('click Add a Plugin btn', async () => {
            await this.overviewPage.getAddPluginBtn().click();
            // TODO expect
        })
    }

    async clickAddConsumer(): Promise<void> {
        await test.step('click Add a Consumer btn', async () => {
            await this.overviewPage.getAddConsumerBtn().click();
            // TODO expect
        })
    }
}
