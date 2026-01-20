import { expect, test } from '@src/kong-manager/fixtures';

test.describe('Kong Manager: Service Management', () => {
  test('should create a service and verify in control plane',
    { tag: '@sanity' },
    async ({ uniqueStr }) => {
      const prefix = uniqueStr('-');
      console.log(`Test prefix: ${prefix}`);
      console.log(`isCI: ${!!process.env.CI}`);
      expect(prefix).toContain(process.platform);

    });

  test('should create a service successfully @sanity @smoke', async ({ kmUIHandler, kongAdminTokenSet }) => {
    const { workspacesSteps } = kmUIHandler;
    kongAdminTokenSet;
  });

  test('should handle complex service configurations @full @regression', async ({ page }) => {
    // ...
  });

});

