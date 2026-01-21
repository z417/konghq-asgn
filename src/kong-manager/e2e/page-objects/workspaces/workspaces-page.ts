import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class WorkspacesPage extends BasePage {
  private $workspaces: Locator;
  private $sidebarOverview: Locator;
  private $sidebarGatewayServices: Locator;
  private $sidebarRoutes: Locator;
  private $newWorkspaceBtn: Locator;
  private $filterWorkspaces: Locator;
  private $tableOfWorkspace: Locator;
  // TODO: more locators

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  initLocators(): void {
    super.initLocators();
    this.$workspaces = this.page.locator('.workspace-overview.page');
    this.$sidebarOverview = this.page.getByTestId('sidebar-item-overview');
    this.$sidebarGatewayServices = this.page.getByTestId('sidebar-item-gateway-services');
    this.$sidebarRoutes = this.page.getByTestId('sidebar-item-routes');
    this.$newWorkspaceBtn = this.page.getByTestId('entity-button');
    this.$filterWorkspaces = this.page.locator('div.k-input.workspace-filter');
    this.$tableOfWorkspace = this.page.locator('.table.has-hover.is-clickable');
  }
  getSidebar: {
    overview: () => Locator,
    gatewayServices: () => Locator,
    routes: () => Locator,
  } = {
      overview: (): Locator => this.$sidebarOverview,
      gatewayServices: (): Locator => this.$sidebarGatewayServices,
      routes: (): Locator => this.$sidebarRoutes,
    }

  getWorkspaces(): Locator {
    return this.$workspaces;
  }
  getFilterWorkspaces(): Locator {
    return this.$filterWorkspaces;
  }
  getWorkspace(by?: string | number): Locator {
    const tableWithData = this.$tableOfWorkspace.locator('tbody tr');
    switch (typeof by) {
      case 'number':
        return tableWithData.locator(`tbody tr:nth-child(${by + 1})`);
      case 'string':
        return tableWithData.filter({
          has: tableWithData.locator('div.workspace-name').filter({ hasText: by })
        });
      default:
        return tableWithData.first();
    }
  }
  getNewWorkspaceBtn(): Locator {
    return this.$newWorkspaceBtn;
  }
  getInfoByTitle(title: string): Locator {
    return this.page.locator('div.metric-title')
      .filter({ has: this.page.locator(`div.metric-title-text:has-text("${title}")`) })
      .getByTestId('kui-icon-wrapper-info-icon')
  }
  getServicesInfo(): Locator {
    return this.getInfoByTitle('Services');
  }
  getRoutesInfo(): Locator {
    return this.getInfoByTitle('Routes');
  }
  getConsumersInfo(): Locator {
    return this.getInfoByTitle('Consumers');
  }
  getPluginsInfo(): Locator {
    return this.getInfoByTitle('Plugins');
  }
  getAPIRequestsInfo(): Locator {
    return this.getInfoByTitle('API Requests');
  }

  async getWorkspaceRowCount(): Promise<number> {
    return await this.$tableOfWorkspace.locator('tbody tr').count();
  }
}
