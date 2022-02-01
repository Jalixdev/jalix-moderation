const Command = require("../src/base/Command.js");
const config = require("../src/Settings/settings.json")
class ChatSorumlusu extends Command {
    constructor(client) {
        super(client, {
            name: "chatsorumlusu",
            aliases: ["chat", "chat-sorumlu", "cs"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has(config.role.yönetici + confi.role.yönetici2 + config.role.yönetici3) && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Rolü verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if(!user.roles.cache.has(config.sorumlulukrole.chatsorumlusu)) {
            await this.client.yolla(`${user} kişisine <@&`+ config.sorumlulukrole.chatsorumlusu +`> rolü verildi.`, message.author, message.channel)
            user.roles.add(config.sorumlulukrole.chatsorumlusu)
        } else{
            await this.client.yolla(`${user} kişisine <@&`+ config.sorumlulukrole.chatsorumlusu +`> rolü alındı.`, message.author, message.channel)
            user.roles.remove(config.sorumlulukrole.chatsorumlusu)
        }
    }
}

module.exports = ChatSorumlusu;
