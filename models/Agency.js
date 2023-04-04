const mongoose = require('mongoose')

const agencychema = mongoose.Schema({
    agencyId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const agency = mongoose.model("agencies", agencychema)
module.exports = agency;