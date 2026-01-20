import { managerEnv } from '@configs/kong-manager/env';
import { Pool } from 'pg';

let pool: Pool | null = null;

/**
 * Functional helper to execute SQL queries.
 */
export const executeQuery = async (query: string, params: any[] = []) => {
    if (!pool) {
        pool = new Pool(managerEnv.current.db);
    }
    const client = await pool.connect();
    try {
        const result = await client.query(query, params);
        return result.rows;
    } finally {
        client.release();
    }
};

/**
 * Ensure pool is closed after all tests.
 */
export const closeDbPool = async () => {
    if (pool) {
        await pool.end();
        pool = null;
    }
};
