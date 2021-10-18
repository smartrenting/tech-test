require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (user) {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN);
        res.json({ jwt: token, user });
      } else { res.status(400).send('Wrong password'); }
    } catch (error) {
      res.status(500).send('Error with JWT');
    }
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = UserModel();
      newUser.username = req.body.username;
      newUser.password = hashedPassword;

      newUser.save((err, data) => {
        if (err) {
          res.status(400).send('Error during user creation');
        } else {
          const token = jwt.sign(newUser.toJSON(), process.env.SECRET_TOKEN);
          res.status(201).json({ user: data, jwt: token });
        }
      });
    } catch {
      res.status(500).send();
    }
  }
});

module.exports = loginRouter;
