import { type PlaywrightTestConfig } from '@playwright/test';


export const konnectConfig: PlaywrightTestConfig = {
    testDir: '../src/konnect/e2e',
    /* Folder for test artifacts such as screenshots, videos, traces, etc.*/
    outputDir: 'test-results/konnect',
    // reporter: [['json', { outputFile: './reports/json/results.json' }]],
}
