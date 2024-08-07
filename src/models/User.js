const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: (userData, callback) => {
    const { username, password, email, phone, rol, gender } = userData;
    console.log(userData);
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return callback(err);
      }
      const query = 'INSERT INTO users (username, password, email, phone, rol, gender) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [username, hash, email, phone, rol, gender], callback);
    });
  },
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0]);
    });
  }
};

module.exports = User;
