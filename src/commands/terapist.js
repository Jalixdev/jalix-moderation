const Command = require("../src/base/Command.js");
class Terapist extends Command {
    constructor(client) {
        super(client, {
            name: "terapist",
            aliases: ["terapist"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("731978662450298990") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has("727881556596621343")) {
            await this.client.yolla(`${user} kişisine <@&727881556596621343> rolü verildi.`, message.author, message.channel)
            user.roles.add("727881556596621343")
        } else{
            await this.client.yolla(`${user} kişisine <@&727881556596621343> rolü alındı.`, message.author, message.channel)
            user.roles.remove("727881556596621343")
        }
    }
}

module.exports = Terapist;
