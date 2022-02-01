const Command = require("../src/base/Command.js");
const Discord = require("discord.js")
const notlar = require("../src/models/notlar.js")
class Not extends Command {
    constructor(client) {
        super(client, {
            name: "not",
            aliases: ["not"]
        });
    }

    async run(message, args, level) {
        if (!message.member.roles.cache.has("736891557680119849") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!user) return this.client.yolla("Not bırakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", message.author, message.channel)
        await notlar.findOne({ user: user.id }, async (err, res) => {
            if (!args.slice(1).join(" ")) return this.client.yolla("Kişiye bırakmak istediğin notu yaz ve tekrar dene !", message.author, message.channel)
            if (!res) {
                let arr = []
                arr.push({ not: args.slice(1).join(" "), yetkili: message.author.id })
                const newData = new notlar({
                    user: user.id,
                    notlar: arr
                })
                newData.save().catch(e => console.log(e))
                this.client.yolla(`<@${user.id}> kişisine başarıyla not bırakıldı.

     :no_entry_sign: | "${args.slice(1).join(" ")}"`, message.author, message.channel)
            } else {
                res.notlar.push({ not: args.slice(1).join(" "), yetkili: message.author.id })
                res.save().catch(e => console.log(e))
                this.client.yolla(`<@${user.id}> kişisine başarıyla not bırakıldı.

        :no_entry_sign: | "${args.slice(1).join(" ")}"`, message.author, message.channel)
            }
        })
    }
}

module.exports = Not;
