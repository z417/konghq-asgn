import { test as base, expect } from '@src/common/fixtures';
import { kongAdminTokenSet, type KongAdminTokenSet } from './auth-fixture';
import { dbClient, type DbClient } from './db-fixture';
import { kongManagerApiHandler, kongManagerUIHandler, type KongManagerApiHandler, type KongManagerUIHandler } from './handler-fixture';


interface KongManagerFixtures {
    kongAdminTokenSet: KongAdminTokenSet
    kmApiHandler: KongManagerApiHandler
    kmUIHandler: KongManagerUIHandler
    dbClient: DbClient
}

const test = base.extend<KongManagerFixtures>({
    // This fixture is set to 'auto: false' by default, 
    // but can be requested by tests that need auth.
    kmApiHandler: kongManagerApiHandler,
    kmUIHandler: kongManagerUIHandler,
    kongAdminTokenSet,
    dbClient
});

export { expect, test };

