var mongoose = require('mongoose')
    // ObjectId = require('mongodb').ObjectID

var sportSchema = new mongoose.Schema({
    // _id: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Sport', sportSchema)