const Command = require("../src/base/Command.js");
class Ressam extends Command {
    constructor(client) {
        super(client, {
            name: "tasarımcı",
            aliases: ["ressam", "tasarımcı"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has("727881540578574416") && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has("727881574196052039")) {
            await this.client.yolla(`${user} kişisine <@&727881574196052039> rolü verildi.`, message.author, message.channel)
            user.roles.add("727881574196052039")
        } else{
            await this.client.yolla(`${user} kişisine <@&727881574196052039> rolü alındı.`, message.author, message.channel)
            user.roles.remove("727881574196052039")
        }
    }
}

module.exports = Ressam;
