const Command = require("../src/base/Command.js");
const data = require("../src/models/cezalar.js")
const ms = require("ms")
const Discord = require("discord.js")
const mutes = require("../src/models/voicemute.js")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
class Kes extends Command {
    constructor(client) {
        super(client, {
            name: "kes",
            aliases: ["kes"]
        });
    }

    async run(message, args, perm) {
        if(!message.member.roles.some(r =>["729415958262710373", "736891557680119849", "727881272893898773"]) && !message.member.hasPermission("ADMINISTRATOR")) return
        let member = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!member) return this.client.yolla("Bağlantısını kesmek istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", message.author, message.channel)
        if (!member.voice.channel) return this.client.yolla("Bağlantısını kesmek istediğin kişi bir ses kanalına bağlı değil.", message.author, message.channel)
        if (message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return this.client.yolla("Rolleri senden yüksek birinin bağlantısını kesemezsin.", message.author, message.channel)
        await this.client.yolla(" <@" + member.id + "> başarıyla " + member.voice.channel.name + " kanalından atıldı.", message.author, message.channel)
        member.voice.kick()
    }
}

module.exports = Kes;
