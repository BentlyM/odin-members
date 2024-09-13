import pool, { messagePool } from './pool';

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

const createMessage = async (
  username: string | undefined,
  title: string,
  msg: string
) => {
  await messagePool.query(
    'INSERT INTO messages (username,title,message) VALUES ($1 , $2, $3)',
    [username, title, msg]
  );
};

const deleteMessage = async (id: number) => {
  try {
    await messagePool.query('DELETE FROM messages WHERE message_id = $1', [id]);
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

export default {
  insertUser,
  selectUser,
  selectId,
  messages,
  createMessage,
  deleteMessage,
};
