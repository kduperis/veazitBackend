var mongoose = require('mongoose')

userSchema = mongoose.Schema({
    token: String,
    username: String,
    email: String,
    password: String,
    score: Number,
    googleConnect: Boolean,
    avatar:String,
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref:'badges' }],
    POI: [{ type: mongoose.Schema.Types.ObjectId, ref:'POIS' }],
    favoritePOI: [{ type: mongoose.Schema.Types.ObjectId, ref:'POIS' }],
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;

