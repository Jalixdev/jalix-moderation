const mongoose = require("mongoose");

module.exports = mongoose.model("dark_uyarılar", new mongoose.Schema({
   user: String,
   uyarılar: Array,
}));