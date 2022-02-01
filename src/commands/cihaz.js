const Command = require("../src/base/Command.js");
const config = require("../src/Settings/settings.json")
const Discord = require("discord.js")
class Cihaz extends Command {
    constructor(client) {
        super(client, {
            name: "cihaz",
            aliases: ["cıhaz"]
        });
    }

    async run(message, args, data) {
        if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return
        let user = message.mentions.users.first() || this.client.users.cache.get(args[0])
        if (!args[0]) return message.channel.send("Bir üye belirt ve tekrar dene !")
        if (!user) return message.channel.send("Belirttiğin üyeyi bulamıyorum.")
        if (user.presence.status == "offline") return message.channel.send(`\`${user.tag}\` kullanıcısı çevrimdışı olduğundan dolayı cihaz bilgisini tespit edemiyorum.`)
        let cihaz = ""
        let ha = Object.keys(user.presence.clientStatus)
        if (ha[0] == "mobile") cihaz = "Mobil Telefon"
        if (ha[0] == "desktop") cihaz = "Masaüstü Uygulama"
        if (ha[0] == "web") cihaz = "İnternet Tarayıcısı"
        message.channel.send(`\`${user.tag}\` kullanıcısının kullandığı cihaz: \`${cihaz}\``)

    }
}

module.exports = Cihaz;
