import { closeDbPool } from '../helpers/db-helper';
// TODO
async function globalTeardown() {
    console.log('Closing all shared resources...');
    await closeDbPool();
}

export default globalTeardown;
