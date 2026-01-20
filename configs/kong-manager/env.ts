/**
 * Interface defining authentication credentials for the Manager.
 */
interface AuthConfig {
  username: string;
  password?: string; // Optional if some environments use token-based auth later
}

interface DBConfig {
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
}

/**
 * Interface defining the complete structure for each environment.
 */
interface EnvironmentConfig {
  guiUrl: string;
  adminUrl: string;
  proxyUrl: string;
  auth: AuthConfig;
  db: DBConfig;
}

/**
 * Valid environment names for Kong Manager.
 */
type EnvName = 'dev' | 'staging' | 'prod';

/**
 * Detailed environment mappings including environment-specific authentication.
 */
const environments: Record<EnvName, EnvironmentConfig> = {
  dev: {
    guiUrl: 'http://localhost:8002',
    adminUrl: 'http://localhost:8001',
    proxyUrl: 'http://localhost:8000',
    auth: {
      username: process.env.KONG_USERNAME || 'admin',
      password: process.env.KONG_PASSWORD || 'handyshake',
    },
    db: {
      host: process.env.KONG_DB_HOST || 'localhost',
      port: parseInt(process.env.KONG_PG_PORT || '5432'),
      user: process.env.KONG_PG_USER || 'kong',
      password: process.env.KONG_PG_PASSWORD || 'kong',
      database: process.env.KONG_PG_NAME || 'kong',
    },
  },
  staging: {
    guiUrl: 'https://gui.staging.kmanager.konghq.com',
    adminUrl: 'https://admin.staging.kmanager.konghq.com',
    proxyUrl: 'https://proxy.staging.kmanager.konghq.com',
    auth: {
      username: process.env.KONG_USERNAME || 'staging_admin',
      password: process.env.KONG_PASSWORD || 'staging_password',
    },
    db: {
      host: 'localhost',
      port: 5432,
      user: 'kong',
      password: 'kong_password',
      database: 'kong',
    },
  },
  prod: {
    guiUrl: 'https://gui.kmanager.konghq.com',
    adminUrl: 'https://admin.kmanager.konghq.com',
    proxyUrl: 'https://proxy.kmanager.konghq.com',
    auth: {
      username: process.env.KONG_USERNAME || 'prod_root',
      password: process.env.KONG_PASSWORD || 'prod_secure_pass',
    },
    db: {
      host: 'localhost',
      port: 5432,
      user: 'kong',
      password: 'kong_password',
      database: 'kong',
    },
  },
};

/**
 * Determine the current environment from TA_ENV variable, defaulting to 'dev'.
 */
const currentEnvName = (process.env.TA_ENV as EnvName) || 'dev';

/**
 * Final Manager Environment configuration exported for project-wide use.
 */
export const managerEnv = {
  // Directly access the active environment's config
  current: environments[currentEnvName],
  name: currentEnvName,

  // Shared API Endpoint constants
  api: {
    endpoints: {
      services: '/services',
      routes: '/routes',
      plugins: '/plugins',
      consumers: '/consumers',
    },
  },
};
