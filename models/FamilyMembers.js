const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FamilyMemberSchema = new Schema ({
    name:{
        type: String,
        required: "name is required"
    },
    doodlebugBucks: {
        type: Number,
        default: 0
    },
    exchangedQuests: [{
        type: Schema.Types.ObjectId,
        ref: "Quest"
    }],
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

const FamilyMember = mongoose.model("FamilyMembers", FamilyMemberSchema);

module.exports = FamilyMember;
