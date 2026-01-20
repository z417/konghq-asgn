import { PlaywrightTestConfig } from '@playwright/test';
import { getConfigs } from './configs';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  ...getConfigs(),
  /* path to the global setup files.*/
  // globalSetup: require.resolve('./global-setup'),

  /* path to the global teardown files.*/
  // globalTeardown: require.resolve('./global-teardown'),
  // Glob patterns or regular expressions to ignore test files.
  testIgnore: '*test-assets',
  // Glob patterns or regular expressions that match test files.
  testMatch: '*.spec.ts',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: !!process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: !!process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: !!process.env.CI ? 'blob' : 'html',
  // config for browser
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry', // 'on-first-retry',
    screenshot: 'only-on-failure',
    // Toggles bypassing Content-Security-Policy.
    bypassCSP: true,
    // Run browser in headless mode.
    headless: true,
    // Whether to ignore HTTPS errors during navigation.
    ignoreHTTPSErrors: true,
    // Emulates `'prefers-colors-scheme'` media feature.
    colorScheme: 'dark',
    video: 'on',
  },
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

export default config;
