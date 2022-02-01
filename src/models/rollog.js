const mongoose = require("mongoose");

module.exports = mongoose.model("dark_roller", new mongoose.Schema({
    user: String, 
    roller: Array
}));
