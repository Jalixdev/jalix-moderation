const mongoose = require("mongoose");

module.exports = mongoose.model("dark_yasaklıtag", new mongoose.Schema({
    guild: String,
  taglar: Array
}));