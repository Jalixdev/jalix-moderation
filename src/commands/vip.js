const Command = require("../src/base/Command.js");
class Vip extends Command {
    constructor(client) {
        super(client, {
            name: "vip",
            aliases: ["vip"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("727881540578574416") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has("727881567690686534")) {
            await this.client.yolla(`${user} kişisine <@&727881567690686534> rolü verildi.`, message.author, message.channel)
            user.roles.add("727881567690686534")
        } else{
            await this.client.yolla(`${user} kişisine <@&727881567690686534> rolü alındı.`, message.author, message.channel)
            user.roles.remove("727881567690686534")
        }
    }
}

module.exports = Vip;
