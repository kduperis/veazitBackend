var mongoose = require('mongoose')

badgeSchema = mongoose.Schema({
    title: String,
    description: String,
    img: String,
})

var badgeModel = mongoose.model('badges', badgeSchema)

module.exports = badgeModel;

