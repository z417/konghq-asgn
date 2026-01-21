import { type Locator, type Page } from '@playwright/test';
import { SidebarPage } from './sidebar-page';

export class RoutesPage extends SidebarPage {
  private $emptyTableState: Locator;
  private $tableOfRoutes: Locator;
  private $routesContainer: Locator;
  private $createRouteContainer: Locator;
  private $showRouteContainer: Locator;
  private $nameInput: Locator;
  private $serviceSelectInput: Locator;
  private $tagsInput: Locator;
  private $basicRadio: Locator;
  private $advancedRadio: Locator;
  private $pathInput: Locator;
  private $stripPathCheckbox: Locator;
  private $methodsListbox: Locator;
  private $hostInput: Locator;
  private $viewConfigurationBtn: Locator;
  private $cancelBtn: Locator;
  private $saveBtn: Locator;
  private $vtabContainer: Locator;
  // TODO: more locators

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  initLocators(): void {
    super.initLocators();
    this.$emptyTableState = this.page.getByTestId('table-empty-state');
    this.$tableOfRoutes = this.page.locator('.table.has-hover.is-clickable');
    // belongs to routesContainer
    this.$routesContainer = this.page.locator('.main-content > div.routes');
    // belongs to createRouteContainer
    this.$createRouteContainer = this.page.locator('.main-content > div.create-route');
    this.$nameInput = this.$createRouteContainer.getByTestId('route-form-name');
    this.$serviceSelectInput = this.$createRouteContainer.getByTestId('route-form-service-id');
    this.$tagsInput = this.$createRouteContainer.getByTestId('route-form-tags');
    this.$basicRadio = this.$createRouteContainer.getByTestId('route-form-config-type-basic-label');
    this.$advancedRadio = this.$createRouteContainer.getByTestId('route-form-config-type-advanced-label');
    this.$pathInput = this.$createRouteContainer.getByTestId('route-form-paths-input-1');
    this.$stripPathCheckbox = this.$createRouteContainer.getByTestId('route-form-strip-path');
    this.$methodsListbox = this.$createRouteContainer.getByTestId('multiselect-trigger');
    this.$hostInput = this.$createRouteContainer.getByTestId('route-form-hosts-input-1');
    this.$viewConfigurationBtn = this.$createRouteContainer.getByTestId('route-create-form-view-configuration')
    this.$cancelBtn = this.$createRouteContainer.getByTestId('route-create-form-cancel')
    this.$saveBtn = this.$createRouteContainer.getByTestId('route-create-form-submit');
    // showRouteContainer
    this.$showRouteContainer = this.page.locator('.main-content > div.show-route');
    this.$vtabContainer = this.$showRouteContainer.getByTestId('vtab-container');
  }
  async getNewRouteBtn(): Promise<Locator> {
    const emptyState = await this.elementExists(this.$emptyTableState)
    if (emptyState) {
      return this.$emptyTableState.getByTestId('empty-state-action');
    }
    return this.$routesContainer.getByTestId('toolbar-add-route');
  }

  getCreateRouteContainer(): Locator {
    return this.$createRouteContainer;
  }

  getBasicRadio(): Locator {
    return this.$basicRadio;
  }

  getAdvancedRadio(): Locator {
    return this.$advancedRadio;
  }

  getNameInput(): Locator {
    return this.$nameInput;
  }
  getServiceSelectInput(): Locator {
    return this.$serviceSelectInput;
  }

  getServiceSelectOption(): Locator {
    return this.$createRouteContainer
      .locator('.select-items-container > div button');
  }
  getTagsInput(): Locator {
    return this.$tagsInput;
  }
  getPathInput(): Locator {
    return this.$pathInput;
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
  getStripPathCheckbox(): Locator {
    return this.$stripPathCheckbox;
  }
  getMethodsListbox(): Locator {
    return this.$methodsListbox;
  }
  getHostInput(): Locator {
    return this.$hostInput;
  }
  getVtabNavTabs(tab: 'Configuration' | 'Plugins'): Locator {
    switch (tab) {
      case 'Configuration':
        return this.$vtabContainer.locator('#show-route');
      case 'Plugins':
        return this.$vtabContainer.locator('#route-plugins');
    }
  }

  getRoute(by: string | number): Locator {
    const tableWithData = this.$tableOfRoutes.locator('tbody tr');
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
