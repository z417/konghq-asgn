import { expect, test } from '@src/kong-manager/fixtures';

test.describe('example suite', () => {
  test('example test', { tag: '@sanity' }, async ({ uniqueStr }) => {
    const prefix = uniqueStr('-');
    console.log(`Test prefix: ${prefix}`);
    console.log(`isCI: ${!!process.env.CI}`);
    expect(prefix).toContain(process.platform);

  });

  test('should create a service successfully @sanity @smoke', async ({ kongManagerHandler, kongAdminTokenSet }) => {
    const { workspacesSteps } = kongManagerHandler;
    kongAdminTokenSet;
  });

  test('should handle complex service configurations @full @regression', async ({ page }) => {
    // ...
  });

});

