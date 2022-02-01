const Command = require("../src/base/Command.js");
class SorunCozme extends Command {
    constructor(client) {
        super(client, {
            name: "sorunçözücü",
            aliases: ["soruncozucu", "sorun-cozucu", "sorun-çözücü", "sç"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("733019073788641423") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has("727881534421467191")) {
            await this.client.yolla(`${user} kişisine <@&727881534421467191> rolü verildi.`, message.author, message.channel)
            user.roles.add("727881534421467191")
        } else{
            await this.client.yolla(`${user} kişisine <@&727881534421467191> rolü alındı.`, message.author, message.channel)
            user.roles.remove("727881534421467191")
        }
    }
}

module.exports = SorunCozme;
