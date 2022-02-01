const mongoose = require("mongoose");

module.exports = mongoose.model("dark_isimler", new mongoose.Schema({
    user: String, 
    isimler: Array
}));