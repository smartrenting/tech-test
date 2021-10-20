require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (token === null) res.status(401).send();

  console.log(req.headers);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).send();
    }
    req.user = user;
    return next();
  });
}

module.exports = {
  authenticateToken,
};
