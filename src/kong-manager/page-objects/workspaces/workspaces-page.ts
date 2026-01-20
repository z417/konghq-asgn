import { Locator, Page } from 'playwright';
import { BasePage } from '../base-page';

export class WorkspacesPage extends BasePage {
  private $newWorkspace: Locator;
  private $filterWorkspaces: Locator;
  private $tableOfWorkspace: Locator;
  // TODO: more locators

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  initLocators(): void {
    this.$newWorkspace = this.page.getByTestId('entity-button');
    this.$filterWorkspaces = this.page.locator('div.k-input.workspace-filter');
    this.$tableOfWorkspace = this.page.locator('.table.has-hover.is-clickable');
  }
  getFilterWorkspaces(): Locator {
    return this.$filterWorkspaces;
  }
  getWorkspace(by: string | number): Locator {
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
  getNewWorkspace(): Locator {
    return this.$newWorkspace;
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
}
