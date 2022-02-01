const Command = require("../src/base/Command.js");
const Discord = require("discord.js")
const isimler = require("../src/models/isimler.js")

class İsim extends Command {
    constructor(client) {
        super(client, {
            name: "isim",
            description: "Latency and API response times.",
            usage: "erkek",
            aliases: ["nick"]
        });
    }

    async run(message, args, level) {
        if(!message.member.roles.cache.has("727881541073502270") && !message.member.hasPermission("VIEW_AUDIT_LOG")) return
        let member = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!member) return this.client.yolla("İsmini değiştirmek istediğin kullanıcıyı belirtmelisin", message.author, message.channel)
        if (!args[1]) return this.client.yolla("Değiştirmek istediğin isim ve yaşı belirtmelisin.", message.author, message.channel)
        if (!args[2]) return this.client.yolla("Değiştirmek istediğin isim ve yaşı belirtmelisin.", message.author, message.channel)
        let isim = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase()
        let yaş = args[2];
        isimler.findOne({ user: member.id }, async (err, res) => {
            if (!res) {
                member.user.username.includes("☨") ? await member.setNickname(`☨ ${isim} | ${yaş}`) : await member.setNickname(`✦ ${isim} | ${yaş}`)
                this.client.yolla("<@" + member + "> kişisinin ismi " + isim + " | " + yaş + " olarak değiştirildi.", message.author, message.channel).catch(esrr => this.client.yolla("" + esrr + " hatası yüzünden bu kişinin ismini değiştiremiyorum.", message.author, message.channel))
                if (message.channel.id === "767227443072991262") {
                    if (this.client.kayıtlar.has(message.author.id)) {
                        this.client.kayıtlar.delete(message.author.id)
                    }
                    if (!this.client.kayıtlar.has(message.author.id)) {
                        this.client.kayıtlar.set(message.author.id, member.id)
                    }
                }
            } else {
                member.user.username.includes("☨") ? await member.setNickname(`☨ ${isim} | ${yaş}`) : await member.setNickname(`✦ ${isim} | ${yaş}`)
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("RANDOM")
                    .setDescription(`${member} kişisinin ismi başarıyla "${isim} | ${yaş}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.\n\n${this.client.no} Kişinin toplamda ${res.isimler.length} isim kayıtı bulundu\n${res.isimler.map(x => `\`• ${x.isim}\` (${x.state})`).join("\n").slice(0, 10)}\n\nKişinin önceki isimlerine \`d!isimler @üye\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir. `)
                message.channel.send(embed)
                if (message.channel.id === "767227443072991262") {
                    if (this.client.kayıtlar.has(message.author.id)) {
                        this.client.kayıtlar.delete(message.author.id)
                    }
                    if (!this.client.kayıtlar.has(message.author.id)) {
                        this.client.kayıtlar.set(message.author.id, member.id)
                    }
                }
            }
        })


    }
}

module.exports = İsim;
