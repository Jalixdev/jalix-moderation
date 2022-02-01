const Command = require("../src/base/Command.js");
const Discord = require("discord.js");
const roller = require("../src/models/rollog.js")
const role_log_chat = '773336300458737684'
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

class Rolyonet extends Command {
    constructor(client) {
        super(client, {
            name: "r",
            aliases: ["r"]
        });
    }
    // d!r args[0](al-ver) args[1](Kullanıcı) args[2](Rol)
    async run(message, args, level) {
        let yetkiRolu = [
            "736891557680119849",
            "729415958262710373",
            "727881517715423304",
        ]
        if (!message.member.roles.cache.some(r => ["736891557680119849", "727881272893898773"].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) return
        if (!args[0]) return this.client.yolla("Kullanımı: d!r al/ver Kullanıcı Rol", message.author, message.channel)
        if (args[0] != "al") {
            if (args[0] != "ver") {
                return this.client.yolla("Kullanımı: d!r al/ver Kullanıcı Rol", message.author, message.channel)
            }
        }
        if (!args[1]) return this.client.yolla("Kullanıcıyı belirtmelisin.", message.author, message.channel)
        let user = message.mentions.members.first() || await this.client.üye(args[1], message.guild)
        if (!user) return this.client.yolla("Kullanıcıyı düzgünce belirt ve tekrar dene !", message.author, message.channel)

        if (!args[2]) return this.client.yolla("Rolü belirtmelisin.", message.author, message.channel)
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
        if (!role) return this.client.yolla("Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene.", message.author, message.channel)
        if (message.member.roles.highest.rawPosition <= role.rawPosition) return this.client.yolla("Kendi rolünden yüksek veya eşit bir rolle işlem yapamazsın.", message.author, message.channel)
        if (!role.editable) return
        if (yetkiRolu.includes(role.id)) return this.client.yolla("Yetki rolleri ile işlem yapamazsın.", message.author, message.channel)
        let banNum = this.client.roleLimit.get(message.author.id) || 0
        this.client.roleLimit.set(message.author.id, banNum + 1)
        if (banNum == 5) return this.client.yolla("Gün içerisinde çok fazla rol işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.", message.author, message.channel)
        if (args[0] == "al") {
            const embedu = new Discord.MessageEmbed()
            embedu.setAuthor(message.guild.name, this.client.user.displayAvatarURL({
                dynamic: true
            }))
            embedu.setColor("RANDOM")
            if (user.roles.cache.has(role.id)) {
                user.roles.remove(role.id)
                embedu.setDescription(`${user} Kişisinden ${role} rolünü aldım.`)
                const emeed = new Discord.MessageEmbed()
                    .setAuthor(message.guild.name, this.client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setColor("RANDOM")
                    .setDescription(`${this.client.no} ${user} - (\`${user.id}\`) kişisinden rol alındı!`)
                    .addField("Alan Kişi", `<@${message.author.id}> - (\`${message.author.id}\`)`, false)
                    .addField("Alınan Rol", `${role}`, false)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                this.client.channels.cache.get(role_log_chat).send(emeed)
                roller.findOne({
                    user: user.id
                }, async (err, res) => {
                    if (!res) {
                        let arr = []
                        arr.push({
                            rol: role.id,
                            mod: message.author.id,
                            tarih: Date.parse(new Date().toLocaleString("tr-TR", {
                                timeZone: "Asia/Istanbul"
                            })),
                            state: "Kaldırma"
                        })
                        let newData = new roller({
                            user: user.id,
                            roller: arr
                        })
                        newData.save().catch(e => console.log(e))
                    } else {
                        res.roller.push({
                            rol: role.id,
                            mod: message.author.id,
                            tarih: Date.parse(new Date().toLocaleString("tr-TR", {
                                timeZone: "Asia/Istanbul"
                            })),
                            state: "Kaldırma"
                        })
                        res.save().catch(e => console.log(e))
                    }
                })
            } else {
                embedu.setDescription(`${user} Kişisinde ${role} rolü mevcut değil.`)
            }
            message.channel.send(embedu)
        }
        if (args[0] == "ver") {
            const embedu = new Discord.MessageEmbed()
            embedu.setAuthor(message.guild.name, this.client.user.displayAvatarURL({
                dynamic: true
            }))
            embedu.setColor("RANDOM")
            if (!user.roles.cache.has(role.id)) {
                user.roles.add(role.id)
                embedu.setDescription(`${user} Kişisine ${role} rolünü ekledim.`)

                roller.findOne({
                    user: user.id
                }, async (err, res) => {
                    if (!res) {
                        let arr = []
                        arr.push({
                            rol: role.id,
                            mod: message.author.id,
                            tarih: Date.parse(new Date().toLocaleString("tr-TR", {
                                timeZone: "Asia/Istanbul"
                            })),
                            state: "Ekleme"
                        })
                        let newData = new roller({
                            user: user.id,
                            roller: arr
                        })
                        newData.save().catch(e => console.log(e))
                    } else {
                        res.roller.push({
                            rol: role.id,
                            mod: message.author.id,
                            tarih: Date.parse(new Date().toLocaleString("tr-TR", {
                                timeZone: "Asia/Istanbul"
                            })),
                            state: "Ekleme"
                        })
                        res.save().catch(e => console.log(e))
                    }
                })
            } else {
                embedu.setDescription(`${user} Kişisinde ${role} rolü zaten mevcut.`)
            }
            message.channel.send(embedu)
        }
    }
}
module.exports = Rolyonet
