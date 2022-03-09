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
  const user = await userModel.findOne({ token: req.body.token })
  if (user == null) {
    res.json({ user, result: false })
  } else {
    user.score = user.score + parseInt(req.body.score)

    //Actualisation des badges suite à une visite
    const trophy = await badgeModel.find()
    const trophyUser = trophy.filter((trophy) => trophy.condition <= user.score)
    
    if(user.badges.length == 0) {
      for (let oneTrophy of trophyUser) {
        user.badges.push(oneTrophy._id)  
      } 
    }
    
    if (user.badges.length != trophyUser.length) {
      var diff = trophyUser.length - user.badges.length
      if(diff > 0) {
        var newTrophy = trophyUser.slice(trophyUser.length - diff, trophyUser.length)
        for (let oneTrophy of newTrophy) {
          user.badges.push(oneTrophy._id)  
        }
      }
    }

    let userSaved = await user.save()
    res.json({ userSaved, result: true })
  }
})

//Route pour Alimenter la base de données de badges
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

router.get('/my-badges', async function (req, res) {
  var user = await userModel.findOne({token: req.query.token})
  var result = false
  if(user) {
    const myBadge = await userModel.findOne({token: req.query.token}).populate('badges')
      result = true
      res.json({myBadge: myBadge.badges, result})
  } else{
    res.json({result})
  }
})

module.exports = router;
