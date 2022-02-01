const Command = require("../src/base/Command.js");
const Discord = require("discord.js")
const roller = require("../src/models/rollog.js")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

class Rollog extends Command {
    constructor(client) {
        super(client, {
            name: "rol-log",
            usage: "erkek",
            aliases: ["rollog"]
        });
    }

    async run(message, args, level) {
        if (!message.member.roles.cache.has("736891557680119849") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!user) return this.client.yolla("Rol bilgilerine bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", message.author, message.channel)

        roller.findOne({ user: user.id }, async (err, res) => {
            if (!res) return this.client.yolla("<@" + user.id + "> kişisinin rol bilgisi veritabanında bulunmadı.", message.author, message.channel)
            let rol = res.roller.sort((a, b) => b.tarih - a.tarih)
            rol.length > 10 ? rol.length = 10 : rol.length = rol.length
            let filterRole = rol.map(x => `${x.state == "Ekleme" ? this.client.ok : this.client.no} Rol: <@&${x.rol}> Yetkili: <@${x.mod}>\nTarih: ${moment(x.tarih).format("LLL")}`)
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .setDescription(`${user} kişisinin toplamda ${res.roller.length} rol bilgisi bulunmakta son 10 rolün bilgileri aşağıda belirtilmiştir.\n\n${filterRole.join("\n─────────────────\n")}`)
            message.channel.send(embed)
        })
    }
}

module.exports = Rollog;
