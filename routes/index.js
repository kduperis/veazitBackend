var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/users')

/* SIGN UP pour enregistrement New User*/

router.post('/sign-up', async function(req, res) {

  var error = []
  var result = false

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
    var hashPassword = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel ({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hashPassword,
      token: uid2(32),
      score: 0,
    })

    var saveUser = await newUser.save()
      result = true;
  }

  res.json({ result, saveUser, error })
});

/* SIGN IN pour connexion User*/

router.post('/sign-in', async function(req,res) {
  let result = false;
  let error = [];
  let token = ''

  var user = await userModel.findOne({ email: req.body.emailFromFront })
  if (user) {
    if(bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
      result = true
      token = user.token
    } else {
      error.push("Tu t'es trompé de Mot de Passe !");
    }
  } else {
    error.push("Joueur non existant, inscris toi vite !");
  }
  res.json({result, error, user, token})
});


module.exports = router;
