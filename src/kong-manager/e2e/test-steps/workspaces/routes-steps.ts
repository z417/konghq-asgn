import { Locator } from "@playwright/test";
import { RoutesPage } from "@src/kong-manager/e2e/page-objects/workspaces/routes-page";
import { expect, test } from '@src/kong-manager/fixtures';

export class RoutesSteps {
    // TODO: more steps
    readonly routesPage: RoutesPage;

    constructor(routesPage: RoutesPage) {
        this.routesPage = routesPage;
    }

    async clickNewRouteBtn(): Promise<void> {
        await test.step('click + New Route btn', async () => {
            const btn = await this.routesPage.getNewRouteBtn()
            await btn.click();
            await expect(
                this.routesPage.getCreateRouteContainer(),
                { message: 'Create Route container is visible' }
            ).toBeVisible();
        })
    }
    async checkBasicRadio(): Promise<void> {
        await test.step('select Basic radio', async () => {
            await this.routesPage.getBasicRadio().check();
            // TODO expect
        })
    }

    async checkAdvanceRadio(): Promise<void> {
        await test.step('select Advance radio', async () => {
            await this.routesPage.getAdvancedRadio().check();
            // TODO expect
        })
    }

    async inputName(name: string): Promise<void> {
        await test.step(`input Name:${name}`, async () => {
            await this.routesPage.getNameInput().fill(name);
            // TODO expect
        })
    }

    async inputService(iden?: string | number): Promise<string> {
        await test.step('click Service input', async () => {
            await this.routesPage.getServiceSelectInput().click();
            expect(await this.routesPage.getServiceSelectOption().count()).toBeGreaterThan(0);
        })
        let stepName: string, chooseService: string
        switch (typeof iden) {
            case 'string':
                stepName = `input Service by name: ${iden}`
                break
            case 'number':
                stepName = `input Service by index: ${iden}`
                break
            default:
                stepName = 'input Service by index: 0'
                iden = 0
                break
        }
        await test.step(stepName, async () => {
            let chooseItem: Locator
            if (typeof iden === 'string') {
                chooseItem = this.routesPage.getServiceSelectOption().filter({ hasText: iden });
            } else {
                chooseItem = this.routesPage.getServiceSelectOption().nth(iden);
            }
            chooseService = await chooseItem.getAttribute('value')
            await chooseItem.click();
            // TODO expect
        })
        return chooseService
    }

    async inputTags(tags: string): Promise<void> {
        await test.step(`input Tags: ${tags}`, async () => {
            await this.routesPage.getTagsInput().fill(tags);
            // TODO expect
        })
    }
    async inputPath(path: string = '/mock'): Promise<void> {
        await test.step(`input Path: ${path}`, async () => {
            await this.routesPage.getPathInput().fill(path);
            // TODO expect
        })
    }
    async clickSaveBtn(): Promise<void> {
        await test.step('click Save btn', async () => {
            await this.routesPage.getSaveBtn().click();
            await expect(this.routesPage.getVtabNavTabs('Configuration'))
                .toBeVisible()
            // await expect(this.routesPage.getKongponentsToasterContainer()).toBeVisible()
            // results = await this.routesPage.getKongponentsToasterContainer().textContent()
        })
    }
}
