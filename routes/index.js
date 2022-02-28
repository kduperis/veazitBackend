var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/users')

/* SIGN UP pour enregistrement New User*/

router.post('/sign-up', async function(req, res) {
  var hashPassword = bcrypt.hashSync(req.body.passwordFromFront, 10);
  var token = '';

  var error = []
  var result = false
  var saveUser = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null) {
    error.push('Joueur déjà présent en Base de Données')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ) {
    error.push('Merci de remplir tous les champs')
  }

  if(error.length == 0) {
    var newUser = new userModel ({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hashPassword,
      token: uid2(32),
      score: 0,
    })

    saveUser = await newUser.save()

    if(saveUser) {
      result = true;
      token = saveUser.token
    }
  }

  res.json({ result, saveUser, error, token })
});



module.exports = router;
