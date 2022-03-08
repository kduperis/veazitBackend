var express = require('express');
var router = express.Router();

var badgeModel = require('../models/badges')
var userModel = require('../models/users')

router.get("/best-users", async function (req, res) {
  const bestUserName = await userModel.find().select("username").select("score").select("avatar")
  const user = await userModel.findOne({ token: req.query.token })

  if (user == null) {
    res.json({ bestUserName, result: false })
  } else {
    res.json({ bestUserName, user, result: true })
  }
})

//Route pour actualiser le score de l'User
router.put('/best-users', async function (req, res) {
  const user = await userModel.findOne({ token: req.body.token})
  if(user == null) {
    res.json( {user, result: false} )
  } else {
    user.score = user.score + parseInt(req.body.score)
    let userSaved = await user.save()
    console.log(req.body.score);
    res.json({userSaved, result: true})
  }
})

//Route pour Alimenter la base de données
router.post("/badges", async function (req, res) {

  var newBadge = await new badgeModel({
    title: req.body.title,
    description: req.body.description,
    img: req.body.img
  })

  var saveBadge = await newBadge.save()

  res.json(saveBadge)
})

router.get("/badgesData", async function (req, res) {
  const badgeCollection = await badgeModel.find()

  res.json({ badgeCollection })
})





module.exports = router;
