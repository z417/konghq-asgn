import { PlaywrightTestConfig } from '@playwright/test';
import { managerEnv } from './env';
import { kongManagerProjects } from './projects';

export const kongManagerConfig: PlaywrightTestConfig = {
    testDir: 'src/kong-manager/e2e',
    /* Folder for test artifacts such as screenshots, videos, traces, etc.*/
    outputDir: 'test-results/kong-manager',
    // reporter: [['json', { outputFile: './reports/json/results.json' }]],
    projects: kongManagerProjects,
};

export { kongManagerProjects, managerEnv };
