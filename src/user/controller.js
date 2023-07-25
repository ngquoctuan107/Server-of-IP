const pool = require ('../../db');
const queries = require('./queries');

// get all users
const getUsers = (req,res) => {
  pool.query(queries.getUsers, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

// get user by id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
};

// create user
const createUser = (req,res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if(results.rows.length){
      res.send("Email already exists.");
    }

    // add user to db
    pool.query(queries.createUser, [first_name, last_name, email, phone, password], (error,results) => {
      if(error) throw error;
      res.status(201).send("User successfully created!");
    })
  });
};

// update user
const updateUser = (req,res) => {
  const id = parseInt(req.params.id);
  const { first_name } = req.body;

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if(noUserFound){
      res.send("User not found!");
    }

  pool.query(queries.updateUser, [first_name, id], (error, results) => {
    if(error) throw error;
    res.status(200).send("User updated!");
    });
  });
};

//delete user from db
const deleteUser = (req,res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if(noUserFound){
      res.send("User not found!");
    }

    pool.query(queries.deleteUser, [id], (error, results) => {
      if(error) throw error;
      res.status(200).send("User successfully deleted!");
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
