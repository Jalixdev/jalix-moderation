const Command = require("../src/base/Command.js");
const data = require("../src/models/cezalar.js")
const config = require("../src/Settings/settings.json")
const ms = require("ms")
const Discord = require("discord.js")
const mutes = require("../src/models/voicemute.js")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
class Çek extends Command {
    constructor(client) {
        super(client, {
            name: "çek",
            aliases: ["çek"]
        });
    }

    async run(message, args, perm) {
        if(!message.member.roles.cache.has(config.ytrole.transporthammer) && !message.member.hasPermission("VIEW_AUDIT_LOG")) return
        let member = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!member) return this.client.yolla("Kanala çekmek istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", message.author, message.channel)
        if (!message.member.voice.channel) return this.client.yolla("Bir kişiyi sesli kanala çekme işlemi uygulamadan önce bir ses kanalına bağlı olmalısın !", message.author, message.channel)
        if (!member.voice.channel) return this.client.yolla("Sesli kanala çekmek istediğin kişi bir ses kanalına bağlı değil.", message.author, message.channel)
        if (message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return this.client.yolla("Rolleri senden yüksek birine ses çekme işlemi uygulayamazsın.", message.author, message.channel)
        member.voice.setChannel(message.member.voice.channel);
        await this.client.yolla(" <@" + member.id + "> başarıyla " + message.member.voice.channel.name + " kanalına çekildi.", message.author, message.channel)
    }
}

module.exports = Çek;
