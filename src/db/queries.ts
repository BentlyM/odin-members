import pool, {messagePool} from './pool';

const insertUser = async (username: string, password: string) => {
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    username,
    password,
  ]);
};

const selectUser = async (user: string | number) => {
  return await pool.query('SELECT * FROM users WHERE username = $1', [user]);
};

const selectId = async (id: number) => {
  return await pool.query('SELECT * FROM users WHERE id = $1', [id]);
};

const messages = async () => {
  return await messagePool.query('SELECT * FROM Messages');
};

export default { insertUser, selectUser, selectId, messages};
