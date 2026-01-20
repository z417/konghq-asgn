import { type Project } from '@playwright/test';
import { commonBrowsers } from '../common/browsers';
import { managerEnv } from './env';
import { testType } from './index';

/**
 * Generate projects dynamically. 
 * Senior approach: Only generate specific projects based on the current testing goal 
 * to avoid redundant execution during 'npx playwright test'.
 */
function createManagerProjects(): Project[] {
  const projects: Project[] = [];

  Object.entries(
    commonBrowsers
  ).forEach(
    ([browser, browserConfigs]) => {
      projects.push({
        name: `kmanager-${browser}`,
        use: {
          ...browserConfigs,
          baseURL: testType === 'api'
            ? managerEnv.current.adminUrl
            : managerEnv.current.guiUrl
        },
        testMatch: '**/*.spec.ts',
      });
    }
  )
  return projects;
}

export const kongManagerProjects = createManagerProjects();
