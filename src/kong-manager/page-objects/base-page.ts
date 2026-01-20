import { Locator, Page } from 'playwright';

export class BasePage {
  protected readonly page: Page;
  private $notification: Locator;
  private $license: Locator;
  private $konnect: Locator;
  private $contactSales: Locator;
  private $workspaces: Locator;
  private $teams: Locator;
  private $devPortal: Locator;
  private $analytics: Locator;
  private $dropdown: Locator;
  private $info: Locator;
  private $githubStar: Locator;
  private $kongponentsToasterContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.initLocators();
  }

  getPage(): Page {
    return this.page;
  }

  initLocators(): void {
    this.$notification = this.page.locator('#kong-ui-app-layout-notification');
    this.$license = this.page.getByRole('link', { name: 'license' });
    this.$konnect = this.page.getByRole('link', { name: 'Konnect' });
    this.$contactSales = this.page.getByRole('link', { name: 'Contact sales' });
    this.$workspaces = this.page.getByTestId('sidebar-item-workspaces');
    this.$teams = this.page.getByTestId('sidebar-item-teams');
    this.$devPortal = this.page.getByTestId('sidebar-item-dev-portal--konnect-');
    this.$analytics = this.page.getByTestId('sidebar-item-analytics--konnect-');
    this.$dropdown = this.page.getByTestId('dropdown-trigger');
    this.$info = this.page.locator('a.info-link');
    this.$githubStar = this.page.getByTestId('github-star');
    this.$kongponentsToasterContainer = this.page.locator('#kongponents-toaster-container');
  }

  getNotification(): Locator {
    return this.$notification;
  }
  getLicense(): Locator {
    return this.$license;
  }
  getKonnect(): Locator {
    return this.$konnect;
  }
  getContactSales(): Locator {
    return this.$contactSales;
  }
  getWorkspaces(): Locator {
    return this.$workspaces;
  }
  getTeams(): Locator {
    return this.$teams;
  }
  getDevPortal(): Locator {
    return this.$devPortal;
  }
  getAnalytics(): Locator {
    return this.$analytics;
  }
  getDropdown(): Locator {
    return this.$dropdown;
  }
  getInfo(): Locator {
    return this.$info;
  }
  getGithubStar(): Locator {
    return this.$githubStar;
  }
  getKongponentsToasterContainer(): Locator {
    return this.$kongponentsToasterContainer;
  }
  /**
   * for debug if the given locator actually exists
   * @param locator target locator
   */
  async highlight(locator: Locator): Promise<void> {
    await locator.highlight();
  }

  async debugLocatorIsVisible(locator: Locator): Promise<void> {
    console.log(`--------`, await locator.isVisible());
  }
}
