import { Pool } from "pg";


const pool = new Pool({
    host: '127.0.0.1',
    user: 'bently',
    database: 'auth_users',
    password: 'drpenguindev',
    port: 5432,
  });

export default pool;
  