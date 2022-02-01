const Command = require("../src/base/Command.js");
class VampirKöylü extends Command {
    constructor(client) {
        super(client, {
            name: "vk",
            aliases: ["vk"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.some(r => ["731235817955262565", "727881580084854794"].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[1], message.guild)
        if (!user) return this.client.yolla("Rol verip/almak istediğin kullanıcıyı belirt ve tekrar dene!", message.author, message.channel)
        if (!args[0]) return this.client.yolla("Rol verme biçimini belirt ve tekrar dene. \`Örnek kullanım: d!vk sorumlu @jalix/ID - d!vk cezalı @jalix/ID\`", message.author, message.channel)

        if (args[0] == "sorumlu") {
            if (!message.member.roles.cache.has("731235817955262565") && !message.member.hasPermission("ADMINISTRATOR")) return
            if (!user.roles.cache.has("727881580084854794")) {
                await this.client.yolla(`${user} kişisine <@&727881580084854794> rolü verildi.`, message.author, message.channel)
                user.roles.add("727881580084854794")
            } else {
                await this.client.yolla(`${user} kişisine <@&727881580084854794> rolü alındı.`, message.author, message.channel)
                user.roles.remove("727881580084854794")
            }
        }
        if (args[0] == "cezalı") {
            if (!user.roles.cache.has("731236315923873972")) {
                await this.client.yolla(`${user} kişisine <@&731236315923873972> rolü verildi.`, message.author, message.channel)
                user.roles.add("731236315923873972")
            } else {
                await this.client.yolla(`${user} kişisine <@&731236315923873972> rolü alındı.`, message.author, message.channel)
                user.roles.remove("731236315923873972")
            }
        }
    }
}

module.exports = VampirKöylü;
