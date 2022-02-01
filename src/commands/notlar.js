const Command = require("../src/base/Command.js");
const Discord = require("discord.js")
const notlar = require("../src/models/notlar.js")
class Notlar extends Command {
    constructor(client) {
        super(client, {
            name: "notlar",
            aliases: ["notlar"]
        });
    }

    async run(message, args, level) {
        if (!message.member.roles.cache.some(r => ["694861871597223986", "694861871555018826", "715065544943861850", "715065544457322567", "694861871555018827", "715065544193081436", "715065543140311041", "694861871555018828"].includes(r.id)) && !message.member.hasPermission("VIEW_AUDIT_LOG")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!user) return this.client.yolla("Notlarına bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", message.author, message.channel)
        await notlar.findOne({ user: user.id }, async (err, res) => {
            if (!res) return this.client.yolla("Notlarına bakmak istediğin kullanıcıya ait sistemde not bulunmuyor.", message.author, message.channel)
            const embeds = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`- <@${user.id}> kişisinin ceza notları aşağıda belirtilmiştir.\n\n${res.notlar.map(x => `-Not Bırakan Yetkili: <@${x.yetkili}>(\`${x.yetkili}\`)\n-Not: \`${x.not}\``).slice(0, 10).join("\n\n")}
        `)
            message.channel.send(embeds)

        })
    }
}

module.exports = Notlar;
