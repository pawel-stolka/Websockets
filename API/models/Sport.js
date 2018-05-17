var mongoose = require('mongoose')

var sportSchema = new mongoose.Schema({
    // id: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Sport', sportSchema)