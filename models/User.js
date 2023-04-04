const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const user = mongoose.model("user", userSchema)
module.exports = user;