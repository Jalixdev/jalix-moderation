const Command = require("../src/base/Command.js");
class PublicSorumlusu extends Command {
    constructor(client) {
        super(client, {
            name: "pubsorumlusu",
            aliases: ["pub", "public-sorumlu", "ps"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("767154626683863081") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has("767392433696669705")) {
            await this.client.yolla(`${user} kişisine <@&767392433696669705> rolü verildi.`, message.author, message.channel)
            user.roles.add("767392433696669705")
        } else{
            await this.client.yolla(`${user} kişisine <@&767392433696669705> rolü alındı.`, message.author, message.channel)
            user.roles.remove("767392433696669705")
        }
    }
}

module.exports = PublicSorumlusu;
