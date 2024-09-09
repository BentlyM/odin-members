import pool from './pool';

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

export default { insertUser, selectUser, selectId };
