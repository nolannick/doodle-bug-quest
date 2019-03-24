const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema ({
    username:{
        type: String,
        required: "username is required"
    },
    familyname:{
        type: String,
        required: "familyname is required"
    },
    password: {
        type: String,
        required: "password is required"
    }
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
