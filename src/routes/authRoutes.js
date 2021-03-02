const express = require("express");

const router = express.Router();

const userController = require('../controllers/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/register', userController.create);


router.post('/login', (req, res, next) => {
  userController
    .fetchOne(req, res, next, { email: req.body.email })
    .then((data) => {
      if (data.length === 0) {
        res.json({ msg: 'No such user' });
      }
      if (data.length > 0) {
        if(bcrypt.compareSync(req.body.password, data[0].password))    {
          const token = generateAccessToken({ userId: data[0].id, email: data[0].email });
          res.json({token});
        }else{          
          res.json({msg:'Password mismatch'})
        }        
      }
    })
    .catch((err) => {
      next(err);
    });
});

function generateAccessToken(email) {
  return jwt.sign(email, 'secretkey');
}

module.exports = router;