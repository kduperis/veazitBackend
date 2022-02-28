var mongoose = require('mongoose')

POISchema = mongoose.Schema({
    longitude: Number,
    latitude: Number,
    title: String,
    description: String,
    image: String,
    category: String,
})

var POIModel = mongoose.model('POIS', POISchema)

module.exports = POIModel;

