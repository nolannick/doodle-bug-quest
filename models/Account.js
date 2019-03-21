const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const AccountSchema = new Schema ({
    username:{
        type: String,
        required: "username is required"
    },
    password: {
        type: String,
        required: "password is required"
    }
});

const User = mongoose.model("Account", AccountSchema);

module.exports = Account;