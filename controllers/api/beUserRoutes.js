const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// router.post('/', async (req, res) => {
//   try {
//     const dbUserData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


router.post('/login', async (req, res) => { //backend login route where front end email and password are checked for
  try { //find user data in table where db email matches request email
    const userData = await User.findOne({ 
      where: { 
        email: req.body.email } 
      });

    if (!userData) { // if no user found error
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // if user data found check password using method of same name, comparing saved db password to reques password
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) { // if no password match error
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => { // if both checks work then give session logged_in and user_id value
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
