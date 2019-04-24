const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetSchema = new Schema ({
    username:{
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    dateTime: {
        type: Date, 
        default: Date.now
    },
    guid: {
        type: String,
        required: true
    }
})

const ResetPassword = mongoose.model('ResetPassword', ResetSchema)

module.exports = ResetPassword