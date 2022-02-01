const Command = require("../src/base/Command.js");
class TeyitSorumlu extends Command {
    constructor(client) {
        super(client, {
            name: "teyitsorumlusu",
            aliases: ["teyit", "teyit-sorumlu", "ts"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("767160587045437471") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has("767390464525467711")) {
            await this.client.yolla(`${user} kişisine <@&767390464525467711> rolü verildi.`, message.author, message.channel)
            user.roles.add("767390464525467711")
        } else{
            await this.client.yolla(`${user} kişisine <@&767390464525467711> rolü alındı.`, message.author, message.channel)
            user.roles.remove("767390464525467711")
        }
    }
}

module.exports = TeyitSorumlu;
