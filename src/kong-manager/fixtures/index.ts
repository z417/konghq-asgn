import { test as base, expect } from '@src/common/fixtures';
import { kongAdminTokenSet, type KongAdminTokenSet } from './auth-fixture';
import { dbClient, type DbClient } from './db-fixture';
import { kongManagerHandler, type KongManagerHandler } from './steps-fixture';


interface KongManagerFixtures {
    kongAdminTokenSet: KongAdminTokenSet
    kongManagerHandler: KongManagerHandler
    dbClient: DbClient
}

const test = base.extend<KongManagerFixtures>({
    // This fixture is set to 'auto: false' by default, 
    // but can be requested by tests that need auth.
    kongManagerHandler,
    kongAdminTokenSet,
    dbClient
});

export { expect, test };
