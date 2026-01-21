import { type Locator, type Page } from '@playwright/test';
import { SidebarPage } from './sidebar-page';

export class GatewayServicesPage extends SidebarPage {
  private $emptyTableState: Locator;
  private $tableOfGatewayServices: Locator;
  private $servicesContainer: Locator;
  private $createServiceContainer: Locator;
  private $showServiceContainer: Locator;
  private $fullUrlRadio: Locator;
  private $protocolRadio: Locator;
  private $fullUrlInput: Locator;
  private $advancedFieldsCollapse: Locator;
  private $gatewayServiceNameInput: Locator;
  private $addTagsCollapse: Locator;
  private $viewConfigurationBtn: Locator;
  private $cancelBtn: Locator;
  private $saveBtn: Locator;
  private $breadcrumbsItemGatewayService: Locator;
  private $breadcrumbsItemActiveService: Locator;
  private $statusBadge: Locator;
  private $vtabContainer: Locator;
  // TODO: more locators

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  initLocators(): void {
    super.initLocators();
    this.$emptyTableState = this.page.getByTestId('table-empty-state');
    this.$tableOfGatewayServices = this.page.getByTestId('.table.has-hover.is-clickable');
    // belongs to servicesContainer
    this.$servicesContainer = this.page.locator('.main-content > div.services');
    this.$createServiceContainer = this.page.locator('.main-content > div.create-service');
    this.$showServiceContainer = this.page.locator('.main-content > div.show-service');
    // belongs to createServiceContainer
    this.$fullUrlRadio = this.$createServiceContainer.getByTestId('gateway-service-url-radio-label');
    this.$protocolRadio = this.$createServiceContainer.getByTestId('gateway-service-protocol-radio-label');
    this.$fullUrlInput = this.$createServiceContainer.getByTestId('gateway-service-url-input');
    this.$advancedFieldsCollapse = this.$createServiceContainer.getByTestId('advanced-fields-collapse');
    this.$gatewayServiceNameInput = this.$createServiceContainer.getByTestId('gateway-service-name-input');
    this.$addTagsCollapse = this.$createServiceContainer.getByTestId('tags-collapse');
    this.$viewConfigurationBtn = this.$createServiceContainer.getByTestId('service-create-form-view-configuration');
    this.$cancelBtn = this.$createServiceContainer.getByTestId('service-create-form-cancel');
    this.$saveBtn = this.$createServiceContainer.getByTestId('service-create-form-submit');
    // belongs to showServiceContainer
    this.$breadcrumbsItemGatewayService = this.$showServiceContainer.locator('a.breadcrumbs-item[title="Gateway Services"]')
    this.$breadcrumbsItemActiveService = this.$showServiceContainer.locator('a.breadcrumbs-item[aria-current="page"]')
    this.$statusBadge = this.$showServiceContainer.getByTestId('status');
    this.$vtabContainer = this.$showServiceContainer.getByTestId('vtab-container');
  }
  async getNewGatewayServiceBtn(): Promise<Locator> {
    const emptyState = await this.elementExists(this.$emptyTableState)
    if (emptyState) {
      return this.$emptyTableState.getByTestId('empty-state-action');
    }
    return this.$servicesContainer.getByTestId('toolbar-add-gateway-service');
  }

  getCreateServiceContainer(): Locator {
    return this.$createServiceContainer;
  }

  getFullUrlRadio(): Locator {
    return this.$fullUrlRadio;
  }

  getProtocolRadio(): Locator {
    return this.$protocolRadio;
  }

  getFullUrlInput(): Locator {
    return this.$fullUrlInput;
  }
  getAdvancedFieldsCollapse(): Locator {
    return this.$advancedFieldsCollapse.getByTestId('collapse-trigger-icon');
  }
  getGatewayServiceNameInput(): Locator {
    return this.$gatewayServiceNameInput;
  }
  getAddTagsCollapse(): Locator {
    return this.$addTagsCollapse.getByTestId('collapse-trigger-icon');
  }
  getViewConfigurationBtn(): Locator {
    return this.$viewConfigurationBtn;
  }
  getCancelBtn(): Locator {
    return this.$cancelBtn;
  }
  getSaveBtn(): Locator {
    return this.$saveBtn;
  }
  getBreadcrumbsItemGatewayService(): Locator {
    return this.$breadcrumbsItemGatewayService;
  }
  getBreadcrumbsItemActiveService(): Locator {
    return this.$breadcrumbsItemActiveService;
  }
  getStatusBadge(): Locator {
    return this.$statusBadge.locator('div.badge-content');
  }
  getVtabNavTabs(tab: 'Configuration' | 'Routes' | 'Plugins' | 'Document'): Locator {
    switch (tab) {
      case 'Configuration':
        return this.$vtabContainer.locator('#show-service');
      case 'Routes':
        return this.$vtabContainer.locator('#service-routes');
      case 'Plugins':
        return this.$vtabContainer.locator('#service-plugins');
      case 'Document':
        return this.$vtabContainer.locator('#service-documents');
    }
  }
  getGatewayService(by: string | number): Locator {
    const tableWithData = this.$tableOfGatewayServices.locator('tbody tr');
    switch (typeof by) {
      case 'string':
        return tableWithData.getByTestId(by);
      case 'number':
        return tableWithData.locator(`tbody tr[tabindex="${by}"]`);
      default:
        return tableWithData.first();
    }
  }
}
