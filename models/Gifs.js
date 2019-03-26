const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const GifsTbl = new Schema ({
    gifName:{
        type: String,
        required: "gifName is required"
    },
    embedURL:{
        type: String,
        required: "embedURL is required"
    }
});

const Gifs = mongoose.model("Gifs", GifsTbl);

module.exports = Gifs;
