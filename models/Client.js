const mongoose = require('mongoose')

const clientchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    agencyId: {
        type: String,
        required: true,
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"agencies"
    },
    mobile: {
        type: String,
        required: true
    },
    totalBill: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const client = mongoose.model("clients", clientchema)
module.exports = client;