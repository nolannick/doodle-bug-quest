const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FamilyMemberSchema = new Schema ({
    name:{
        type: String,
        required: "name is required"
    },
    doddlebugBucks: {
        type: Number,
        required: "password is required",
        default: 0
    },
    quests: [{
        type: Schema.Types.ObjectId,
        ref: "Quest"
    }],
    rewards: [{
        type: Schema.Types.ObjectId,
        ref: "Reward"
    }],
    acctId: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
});

const FamilyMembers = mongoose.model("FamilyMembers", FamilyMemberSchema);

module.exports = FamilyMembers;
