import { test } from '@src/kong-manager/fixtures';

test.describe('Kong Admin API - Service Management', () => {

    test('should manage service lifecycle via API', async ({ kmApiHandler, uniqueStr }) => {
        const serviceName = `api-svc-${uniqueStr()}`;
        const { request, servicesApi } = kmApiHandler

        const payload = {
            name: serviceName,
            url: 'https://httpbin.konghq.com',
        };
        // TODO
    })
});
