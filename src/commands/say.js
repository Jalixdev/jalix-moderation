const Command = require("../src/base/Command.js");
const config = require("../src/Settings/settings.json")
const Discord = require("discord.js")
class Say extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            aliases: []
        });
    }

    async run(message, args, data) {
        if (!message.member.roles.cache.has("773271657582166086") && !message.member.hasPermission("VIEW_AUDIT_LOG")) return
        if(!message.member.hasPermission("ADMINISTRATOR") && message.channel.id == "759566000378871828") return
        let tag = this.client.users.cache.filter(x => x.username.includes(config.bot.token)).size 
        let ses = message.guild.members.cache.filter(x => x.voice.channel).size
        let members = message.guild.members.cache.size
        let online = message.guild.members.cache.filter(m => m.presence.status !== "offline").size
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("`•` Seste toplam **" + ses + "** kullanıcı var.\n`•` Sunucumuzda toplam **" + members + "** üye var.\n`•` Sunucumuzda toplam **" + online + "** çevrim içi üye var.\n`•` Toplam **" + tag + "** kişi tagımıza sahip.")
        message.channel.send(embed);

    }

};

module.exports = Say;
