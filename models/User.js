const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const UserSchema = new Schema ({
    username:{
        type: String,
        required: "username is required"
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;