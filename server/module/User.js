const moment = require("moment/moment")
const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true

    },
    Password: {
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
const User = mongoose.model('users', useSchema)
module.exports = User