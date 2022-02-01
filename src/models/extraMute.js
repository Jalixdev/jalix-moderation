const mongoose = require("mongoose");

module.exports = mongoose.model("dark_extraMute", new mongoose.Schema({
    user: String, 
    array: Array
}));