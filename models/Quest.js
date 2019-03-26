const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestSchema = new Schema ({
    title: {
        type: String,
        required: "Quest Title is required"
    },
    description: {
        type: String,
    },
    value: {
        type: Number,
        required: "value is required"
    },
    show: {
        type: Boolean, 
        default: true
    },
    acctId: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
})

const Quest = mongoose.model('Quest', QuestSchema)

module.exports = Quest