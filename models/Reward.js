const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewardSchema = new Schema ({
    title: {
        type: String,
        required: "Reward Title is required"
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: "price is required"
    },
    show: {
        type: Boolean,
        default: false 
    },
    acctId: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
})

const Reward = mongoose.model('Reward', RewardSchema)

module.exports = Reward