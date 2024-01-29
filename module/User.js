const moment = require("moment/moment")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    profilePicture: {
        type: String,
    },

    email: {
        type: String,
        require: true

    },
    password: {
        type: String,
        require: true
    },

    ConfirmPassword: {
        type: String,
        require: true
    },
    createdOn: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    }
})
const User = mongoose.model('users', userSchema)

module.exports = User