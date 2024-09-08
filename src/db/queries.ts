import pool from "./pool";

const insertUser = async (username: string, password: string) => {
    await pool.query('INSERT INTO username (username, password) VALUES ($1, $2)', [username, password]);
}

export default {insertUser}