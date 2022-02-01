let database = require("../src/models/voicemute.js")
const mutes = require("../src/models/waitMute.js")
const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
const ms = require("ms");
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member, channel) {
        if (member.user.bot) return;
        if(this.client.channelTime.has(member.id)) {
        this.client.channelTime.delete(member.id)
        }
    }
};
