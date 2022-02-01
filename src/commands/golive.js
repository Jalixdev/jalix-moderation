const Command = require("../src/base/Command.js");
class GoLive extends Command {
    constructor(client) {
        super(client, {
            name: "golive",
            aliases: ["go-live"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("727881540578574416") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has("738887561140895814")) {
            await this.client.yolla(`${user} kişisine <@&738887561140895814> rolü verildi.`, message.author, message.channel)
            user.roles.add("738887561140895814")
        } else{
            await this.client.yolla(`${user} kişisine <@&738887561140895814> rolü alındı.`, message.author, message.channel)
            user.roles.remove("738887561140895814")
        }
    }
}

module.exports = GoLive;
