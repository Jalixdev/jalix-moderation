const Command = require("../src/base/Command.js");
const moment = require("moment")
require("moment-duration-format")
const cezalar = require("../src/models/cezalar.js")
const Discord = require("discord.js")
const data = require("../src/models/cezalar.js")
const sunucu = require("../src/models/sunucu-bilgi.js")
class Yetkiver extends Command {
    constructor(client) {
        super(client, {
            name: "yetkiver",
            aliases: ["yetkiver"]
        });
    }

    async run(message, args, perm) {
        if(!message.member.roles.cache.some(r =>["736891557680119849", "727881272893898773"].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) return
        if (args.length < 1) return this.client.yolla("Bir kullanıcı etiketleyin veya kullanıcı ID giriniz.", message.author, message.channel)
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!user) return this.client.yolla("Belirttiğiniz kullanıcı geçerli değil.", message.author, message.channel)
        if(!user.user.username.includes("☨")) return this.client.yolla("Belirttiğiniz kullanıcı sunucu tagına sahip olmadığı için yetki verme işlemi uyguluyamazsın.", message.author, message.channel)
        let map = new Map([
            ["-rookies", ["727881525491925022", "727881541073502270", "773271657582166086"]],
            ["-eternal", ["727881547528798219", "727881541073502270", "727881538808709191", "773271657582166086"]],
            ["-moon", ["727881546836607106", "727881541073502270", "727881538808709191", "773271657582166086"]],
            ["-throne", ["727881549671956560", "727881541073502270", "727881538808709191", "727881537978368024", "773271657582166086"]]
        ])
        let metin = ""
        let arr = []
        for (let [k, v] of map) {
            if (args[0] == k) return
            v.map(x => {
                arr.push(x)
            })
        }
        for (let [k, v] of map) {
            metin = metin + `\`${k}\` - ${v.filter(x => x !== "773271657582166086").map(x => `<@&${x}>`)}\n`
        }
        let values = args[1]
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(`Belirttiğiniz rol geçerli değil lütfen aşağıdaki verilere göre komutu uygulayınız.\n\n${metin}\n\n\`Örnek kullanım:\nd!yetkiver 310779453464772608 -moon\nd!yetkiver @jalix#007 -rookies\`\n`)
        if (!values) return message.channel.send(embed)
        if (!map.has(values.toLowerCase())) return message.channel.send(embed)
        const roller = map.get(values)
        await user.roles.add(roller)
        let arrx = arr.filter(function (item, pos) {
            return arr.indexOf(item) == pos;
        })
        arrx.map(async (x) => {
            if (user.roles.cache.has(x)) {
                if (roller.includes(x)) return
                await user.roles.remove(x)
            }
        })
        embed.setDescription(`${user} kullanıcısına <@&${roller[0]}> yetkisi verildi.`)
        message.channel.send(embed)
    }
}

module.exports = Yetkiver;
