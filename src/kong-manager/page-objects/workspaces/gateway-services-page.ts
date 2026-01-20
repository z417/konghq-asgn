import { type Locator, type Page } from '@playwright/test';
import { SidebarPage } from './sidebar-page';

export class GatewayServicesPage extends SidebarPage {
  private $newGatewayServiceBtn: Locator;
  private $tableOfGatewayServices: Locator;
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
  private $emptyStateAction: Locator;
  // TODO: more locators

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  initLocators(): void {
    this.$newGatewayServiceBtn = this.page.getByTestId('toolbar-add-gateway-service');
    this.$tableOfGatewayServices = this.page.getByTestId('.table.has-hover.is-clickable');
    this.$createServiceContainer = this.page.locator('.main-content > div.create-service');
    this.$showServiceContainer = this.page.locator('.main-content > div.show-service');
    this.$fullUrlRadio = this.$createServiceContainer.getByTestId('gateway-service-url-radio-label');
    this.$protocolRadio = this.$createServiceContainer.getByTestId('gateway-service-protocol-radio-label');
    this.$fullUrlInput = this.$createServiceContainer.getByTestId('gateway-service-url-input');
    // createServiceContainer
    this.$advancedFieldsCollapse = this.$createServiceContainer.getByTestId('advanced-fields-collapse');
    this.$gatewayServiceNameInput = this.$createServiceContainer.getByTestId('gateway-service-name-input');
    this.$addTagsCollapse = this.$createServiceContainer.getByTestId('tags-collapse');
    this.$viewConfigurationBtn = this.$createServiceContainer.getByTestId('service-create-form-view-configuration');
    this.$cancelBtn = this.$createServiceContainer.getByTestId('service-create-form-cancel');
    this.$saveBtn = this.$createServiceContainer.getByTestId('service-create-form-submit');
    // showServiceContainer
    this.$breadcrumbsItemGatewayService = this.$showServiceContainer.locator('a.breadcrumbs-item[title="Gateway Services"]')
    this.$breadcrumbsItemActiveService = this.$showServiceContainer.locator('a.breadcrumbs-item[aria-current="page"]')
    this.$statusBadge = this.$showServiceContainer.getByTestId('status');
    this.$vtabContainer = this.$showServiceContainer.getByTestId('vtab-container');
    this.$emptyStateAction = this.$showServiceContainer.getByTestId('empty-state-action');
  }
  getNewGatewayServiceBtn(): Locator {
    return this.$newGatewayServiceBtn;
  }

  getfullUrlRadio(): Locator {
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
  getNewRouteBtn(): Locator {
    return this.$emptyStateAction;
  }
  getNewPluginBtn(): Locator {
    return this.$emptyStateAction;
  }
  getGatewayService(by: string | number): Locator {
    const tableWithData = this.$tableOfGatewayServices.locator('tbody tr');
    switch (typeof by) {
      case 'string':
        return tableWithData.getByTestId(by);
      case 'number':
        return tableWithData.locator(`tbody tr:nth-child(${by + 1})`);
      default:
        return tableWithData.first();
    }
  }
}
