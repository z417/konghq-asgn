import { type Page } from '@playwright/test';

export class ScreenshotHelper {
  constructor(private page: Page) {}
  
  async takeFullPageScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }
  

  async takeElementScreenshot(selector: string, name: string): Promise<void> {
    const element = await this.page.$(selector);
    if (element) {
      await element.screenshot({
        path: `screenshots/${name}-${Date.now()}.png`,
      });
    }
  }
  

  async takeViewportScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
    });
  }
}
