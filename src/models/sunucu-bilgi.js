const mongoose = require("mongoose")

const dark_sunucu = new mongoose.Schema({
   guild: String,
   ihlal: Number
})

module.exports = mongoose.model("dark_sunucu", dark_sunucu)