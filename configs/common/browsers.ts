import { devices, type Project } from '@playwright/test';

/**
 * Define the specific type for browser configuration to ensure type safety.
 * We extract the 'use' property type from the Playwright Project interface.
 */
type BrowserOptions = Project['use'];

const COMMON_VIEWPORT = { width: 1920, height: 1080 };

/**
 * Shared device settings to maintain consistency across different browsers.
 * Following the DRY (Don't Repeat Yourself) principle.
 */
const commonDeviceSettings: BrowserOptions = {
  viewport: COMMON_VIEWPORT,
  ignoreHTTPSErrors: true,
  /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
  actionTimeout: 15 * 1000,
  navigationTimeout: 60000,
};

/**
 * Desktop browser configurations.
 * Explicitly typed as a Record to ensure all required browsers are defined with correct types.
 */
export const commonBrowsers: Record<'chromium' | 'firefox' | 'webkit', BrowserOptions> = {
  chromium: {
    ...devices['Desktop Chrome'],
    ...commonDeviceSettings,
    ...(!!process.env.CI &&
    {
      launchOptions: {
        // Optimization for headless execution in Docker/CI environments
        args: [
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-features=Translate',
          '--disable-translate',
          '--disable-infobars',
          '--no-first-run',
        ],
      }
    }),
  },
  firefox: {
    ...devices['Desktop Firefox'],
    ...commonDeviceSettings,
    ...(!!process.env.CI &&
    {
      launchOptions: {
        // Optimization for headless execution in Docker/CI environments
        args: [
          '--no-sandbox',
          '--disable-gpu'
        ],
      }
    }),
  },
  webkit: {
    ...devices['Desktop Safari'],
    ...commonDeviceSettings,
    ...(!!process.env.CI &&
    {
      launchOptions: {
        // Optimization for headless execution in Docker/CI environments
        args: [
          '--no-sandbox',
        ],
      }
    }),
  },
};

/**
 * Mobile device configurations for responsive testing.
 */
export const mobileBrowsers: Record<string, BrowserOptions> = {
  'iPhone 13': {
    ...devices['iPhone 13'],
  },
  'Pixel 5': {
    ...devices['Pixel 5'],
  },
  'Galaxy S9+': {
    ...devices['Galaxy S9+'],
  },
};
