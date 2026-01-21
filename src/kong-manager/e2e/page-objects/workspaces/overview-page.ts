import { type Locator, type Page } from '@playwright/test';
import { SidebarPage } from './sidebar-page';

export class OverviewPage extends SidebarPage {
  private $onboardingCard: Locator;
  private $actionBth: Locator;
  private $dismissBtn: Locator;
  // TODO: more locators

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  initLocators(): void {
    super.initLocators();
    this.$onboardingCard = this.page.locator('div.k-card.onboarding-card');
    this.$actionBth = this.page.getByTestId('action-button');
    this.$dismissBtn = this.page.getByTestId('dismiss-button');
  }
  getPluginCard(): Locator {
    return this.$onboardingCard.filter({ hasText: 'Add a Plugin' });
  }
  getConsumerCard(): Locator {
    return this.$onboardingCard.filter({ hasText: 'Add a Consumer' });
  }
  getAddPluginBtn(): Locator {
    return this.getPluginCard().filter({ has: this.$actionBth });
  }

  getAddConsumerBtn(): Locator {
    return this.getConsumerCard().filter({ has: this.$actionBth });
  }

  getDismissPluginBtn(): Locator {
    return this.getPluginCard().filter({ has: this.$dismissBtn });
  }
  getDismissConsumerBtn(): Locator {
    return this.getConsumerCard().filter({ has: this.$dismissBtn });
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
