import { TestFixture } from '@playwright/test';
import { executeQuery } from '../helpers/db-helper';

export type DbClient = { query: typeof executeQuery };
export const dbClient: TestFixture<DbClient, any> = async ({ }, use) => {
    // Inject the query helper as a fixture
    await use({ query: executeQuery });
};
