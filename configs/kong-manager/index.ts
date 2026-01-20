import { type PlaywrightTestConfig } from '@playwright/test';
import { managerEnv } from './env';
import { kongManagerProjects } from './projects';

const testType = process.env.TEST_TYPE?.toLowerCase() === 'api' ? 'api' : 'e2e';

export const kongManagerConfig: PlaywrightTestConfig = {
    testDir: `src/kong-manager/${testType}`,
    /* Folder for test artifacts such as screenshots, videos, traces, etc.*/
    outputDir: 'test-results/kong-manager',
    // reporter: [['json', { outputFile: './reports/json/results.json' }]],
    projects: kongManagerProjects,
    timeout: testType === 'api' ? 30000 : 60000,
};

export { kongManagerProjects, managerEnv, testType };

