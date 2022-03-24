var mongoose = require('mongoose')

POISchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    title: String,
    description: String,
    image: String,
    category: String,
})

var POIModel = mongoose.model('POIS', POISchema)

module.exports = POIModel;

