const Command = require("../src/base/Command.js");
const data = require("../src/models/cezalar.js")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
const Discord = require("discord.js")
moment.locale("tr")
const jalix = require("pretty-ms");
const mutes = require("../src/models/voicemute.js")
const sunucu = require("../src/models/sunucu-bilgi.js")
const wmute = require("../src/models/waitMute.js")
class Unmute extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            aliases: ["unmute"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("727881538808709191") && !message.member.hasPermission("VIEW_AUDIT_LOG")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(message.author.id == user.id) return
        if (!user) return message.react("772898100603387944")
        if (user.voice.serverMute == true) {
            user.voice.setMute(false)
            message.react("772898104650498068")
        } else {
            message.react("772898100603387944")
        }
        if (user.roles.cache.has("727881551827959859")) {
            user.roles.remove("727881551827959859")
            message.react("772898104650498068")
        } else {
            message.react("772898100603387944")
        }

    }
}

module.exports = Unmute;
