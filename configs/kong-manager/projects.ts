import { Project } from '@playwright/test';
import { commonBrowsers } from '../common/browsers';
import { managerEnv } from './env';

/**
 * Define the test match pattern for Kong Manager to ensure isolation.
 */
const MANAGER_TEST_MATCH = /.*src\/kong-manager\/.*\.spec\.ts/;

/**
 * Define test scopes with their corresponding tags.
 */
const SCOPE_CONFIGS = {
  sanity: { grep: /@sanity/ },
  regression: { grep: /@regression/ },
  full: { grep: undefined }, // Run all
} as const;

/**
 * Generate projects dynamically. 
 * Senior approach: Only generate specific projects based on the current testing goal 
 * to avoid redundant execution during 'npx playwright test'.
 */
function createManagerProjects(): Project[] {
  const projects: Project[] = [];

  // Get scope from environment variable, default to 'sanity' to save time/resources
  const targetScope = (process.env.TEST_SCOPE as keyof typeof SCOPE_CONFIGS) || 'sanity';

  // Define which platform to use for different scopes
  if (targetScope === 'sanity') {
    // Sanity usually runs on the most common platform only
    projects.push({
      name: `manager-sanity-chrome`,
      use: { ...commonBrowsers['chromium'], baseURL: managerEnv.current.guiUrl, },
      grep: SCOPE_CONFIGS.sanity.grep,
      // testMatch: MANAGER_TEST_MATCH,
    });
  } else if (targetScope === 'regression' || targetScope === 'full') {
    // Regression/Full runs on the full browser matrix
    Object.entries(
      commonBrowsers
    ).forEach(
      ([browser, browserConfigs]) => {
        projects.push({
          name: `manager-${targetScope}-${browser}`,
          use: { ...browserConfigs, baseURL: managerEnv.current.guiUrl },
          grep: SCOPE_CONFIGS[targetScope].grep,
          // testMatch: MANAGER_TEST_MATCH,
        });
      }
    )
  }

  return projects;
}

export const kongManagerProjects = createManagerProjects();
