const getUsers = `SELECT * FROM users`;
const getUserById = `SELECT * FROM users WHERE user_id = $1`;
const checkEmailExists = `SELECT s FROM users s WHERE s.email = $1`;
const createUser = "INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5)";
const deleteUser = `DELETE FROM users WHERE user_id = $1`;
const updateUser = `UPDATE users SET first_name = $1 WHERE user_id = $2`;

module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  createUser,
  deleteUser,
  updateUser,
};
