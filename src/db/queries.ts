import pool from "./pool";

const insertUser = async (username: string, password: string) => {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
}

const selectUser = async (username: string) => {
    return await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
}

export default {insertUser, selectUser}