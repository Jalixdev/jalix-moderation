const Command = require("../src/base/Command.js");
const Discord = require("discord.js")
const cezalar = require("../src/models/cezalı.js")

class Yetkilisay extends Command {
    constructor(client) {
        super(client, {
            name: "yetkilisay",
            aliases: ["ysay", "yetkili-say"]
        });
    }


    async run(message, args, level) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return
            let roles = args.length > 0 ? message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) : message.guild.roles.cache.find(x => x.id == "773271657582166086")
            let üyeler = message.guild.members.cache.filter(x => {
                return x.roles.cache.has(roles.id) && !x.voice.channel && x.user.presence.status !== "offline"
            })
            message.channel.send("Online olup seste olmayan <@&"+roles.id+"> rolündeki yetkili sayısı: " + üyeler.size + "")
            if(üyeler.size == 0) return
            message.channel.send("```" + üyeler.map(x => "<@" + x.id + ">").join(",") + "```")
    }
}

module.exports = Yetkilisay
