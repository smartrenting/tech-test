require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const router = require('./router');

router.post('/login', async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (user) {
    try {
      if (await bcrypt.compare(user.password, req.body.password)) {
        const token = jwt.sign(user, process.env.SECRET_TOKEN);
        res.status(200).send(token);
      } else { res.status(400).send(); }
    } catch {
      res.status(500).send();
    }
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = UserModel();
      newUser.username = req.body.username;
      newUser.password = hashedPassword;

      newUser.save((err, data) => {
        if (err) {
          res.status(400).send('Error');
        } else {
          res.status(201).send(data);
        }
      });
    } catch {
      res.status(500).send();
    }
  }
});
