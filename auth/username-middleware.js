const Users = require('./auth-model');

module.exports = (req, res, next) => {
  const { username } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.json({ message: 'Please choose another username' });
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
};