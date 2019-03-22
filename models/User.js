const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const UserSchema = new Schema ({
    username:{
        type: String,
        required: "username is required",
        unique: true
    },
    password: {
        type: String,
        required: "password is required"
    },
    salt: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;