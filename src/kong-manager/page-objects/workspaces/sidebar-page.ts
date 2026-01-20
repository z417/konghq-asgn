import { Locator, Page } from 'playwright';
import { BasePage } from '../base-page';

export class SidebarPage extends BasePage {
    private $overview: Locator;
    private $gatewayServices: Locator;
    private $routes: Locator;
    // TODO: more locators

    constructor(page: Page) {
        super(page);
        this.initLocators();
    }
    initLocators(): void {
        this.$overview = this.page.getByTestId('sidebar-item-overview');
        this.$gatewayServices = this.page.getByTestId('sidebar-item-gateway-services')
        this.$routes = this.page.getByTestId('sidebar-item-routes')
    }

    getOverviewItem(): Locator {
        return this.$overview;
    }
    getGatewayServicesItem(): Locator {
        return this.$gatewayServices;
    }
    getRoutesItem(): Locator {
        return this.$routes;
    }
}
