import { GatewayServicesPage } from "@src/kong-manager/e2e/page-objects/workspaces/gateway-services-page";
import { expect, test } from '@src/kong-manager/fixtures';

export class GatewayServicesSteps {
    // TODO: more steps
    readonly gatewayServicesPage: GatewayServicesPage;

    constructor(gatewayServicesPage: GatewayServicesPage) {
        this.gatewayServicesPage = gatewayServicesPage;
    }

    async clickNewGatewayServiceBtn(): Promise<void> {
        await test.step('click + New Gateway Service btn', async () => {
            const btn = await this.gatewayServicesPage.getNewGatewayServiceBtn()
            await btn.click();
            await expect(
                this.gatewayServicesPage.getCreateServiceContainer(),
                { message: 'New Gateway Service container is visible' }
            ).toBeVisible();
        })
    }
    async checkFullUrlRadio(): Promise<void> {
        await test.step('select Full URL radio', async () => {
            await this.gatewayServicesPage.getFullUrlRadio().check();
            // TODO expect
        })
    }

    async checkProtocolRadio(): Promise<void> {
        await test.step('select Protocol, host, port, and path radio', async () => {
            await this.gatewayServicesPage.getProtocolRadio().check();
            // TODO expect
        })
    }

    async inputFullUrl(url: string): Promise<void> {
        await test.step(`input Full URL:${url}`, async () => {
            await this.gatewayServicesPage.getFullUrlInput().fill(url);
            // TODO expect
        })
    }

    async clickAdvancedFieldsCollapse(): Promise<void> {
        await test.step('click View advanced fields', async () => {
            await this.gatewayServicesPage.getAdvancedFieldsCollapse().click();
            // TODO expect
        })
    }

    async inputGatewayServiceName(name?: string): Promise<string> {
        let trueName = name ?? await this.gatewayServicesPage.getGatewayServiceNameInput().getAttribute('value');
        await test.step(`set Gateway Service: ${trueName}`, async () => {
            if (name) {
                await this.gatewayServicesPage.getGatewayServiceNameInput().fill(name);
            }
            // TODO expect
        })
        return trueName
    }

    async clickAddTags(): Promise<void> {
        await test.step('click Add Tags btn', async () => {
            await this.gatewayServicesPage.getAddTagsCollapse().click();
            // TODO expect
        })
    }
    async clickSaveBtn(): Promise<void> {
        await test.step('click Save btn', async () => {
            await this.gatewayServicesPage.getSaveBtn().click();
            await expect(this.gatewayServicesPage.getVtabNavTabs('Configuration')).toBeVisible();
            // TODO expect
            // await expect(this.gatewayServicesPage.getKongponentsToasterContainer()).toBeVisible()
            // results = await this.gatewayServicesPage.getKongponentsToasterContainer().textContent()
        })
    }
}
