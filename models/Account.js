const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema ({
    username:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    familyname:{
        type: String,
        required: "familyname is required"
    },
    password: {
        type: String,
        required: "password is required"
    },
    salt: String
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
