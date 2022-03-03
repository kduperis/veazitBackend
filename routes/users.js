var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/users')



router.get("/best-users", async function (req, res) {
  const bestUserName = await userModel.find().select("username").select("score").select("avatar")



  res.json({ bestUserName })
})

/* SIGN UP pour enregistrement New User*/

router.post('/sign-up', async function (req, res) {

  var error = []
  var result = false
  var regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (regexMail.test(req.body.emailFromFront)) {

    const data = await userModel.findOne({
      email: req.body.emailFromFront
    })

    if (data != null) {
      error.push('Joueur déjà présent en Base de Données')
    }

    if (req.body.usernameFromFront == ''
      || req.body.emailFromFront == ''
      || req.body.passwordFromFront == ''
    ) {
      error.push('Merci de remplir tous les champs')
    }

    if (error.length == 0) {
      var hashPassword = bcrypt.hashSync(req.body.passwordFromFront, 10);
      var newUser = new userModel({
        username: req.body.usernameFromFront,
        email: req.body.emailFromFront,
        password: hashPassword,
        token: uid2(32),
        score: 0,
      })

      var saveUser = await newUser.save()
      result = true;
    }

  } else {

    error.push('Veuillez indiquer un mail')

  }


  res.json({ result, saveUser, error })
});

/* SIGN IN pour connexion User*/

router.post('/sign-in', async function (req, res) {
  let result = false;
  let error = [];
  let token = ''

  var user = await userModel.findOne({ email: req.body.emailFromFront })

  console.log(req.body.passwordFromFront + 'test')
  console.log(req.body.emailFromFront + 'test')

  if (user) {
    if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
      result = true
      token = user.token
    } else {
      error.push("Tu t'es trompé de Mot de Passe !");
    }
  } else {
    if (!req.body.passwordFromFront || !req.body.emailFromFront) {
      error.push('Merci de remplir tous les champs');
    } else {
      error.push("Joueur non existant, inscris toi vite !");
    }

  }
  res.json({ result, user, error })
});

module.exports = router;
