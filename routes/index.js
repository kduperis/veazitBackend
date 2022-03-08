var express = require('express');
var router = express.Router();

var badgeModel = require('../models/badges')
var userModel = require('../models/users')

router.get("/best-users", async function (req, res) {
  const bestUserName = await userModel.find().select("username").select("score").select("avatar")

  res.json({ bestUserName })
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
