// server/routes/users.js
const router = require('express').Router();
let User = require('../models/user.model');

// Handle GET requests to /users/
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Handle POST requests to /users/add
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
