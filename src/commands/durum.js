const Command = require("../src/base/Command.js");
const config = require("../src/Settings/settings.json")

class Durum extends Command {
    constructor(client) {
        super(client, {
            name: "durum",
            aliases: []
        });
    }

    async run(message, args, data) {
        if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return
        let rol = message.guild.roles.cache.find(x => x.name == "Member").members.size
        let members = message.guild.members.cache.size
        let tag = this.client.users.cache.filter(x => x.username.includes(config.bot.tag)).size + 10
        let online = message.guild.members.cache.filter(m => m.presence.status !== "offline").size
        message.channel.send(""+ config.bot.servername +" " + members + " toplam üyeye sahip. %" + parseInt(((members - rol) / members) * 100) + " kayıtlı, %" + parseInt((rol / members) * 100) + " kayıtsız, %" + parseInt((online / members) * 100) + " çevrim içi ve %" + parseInt((tag / members) * 100) + " taglı.");

    }

};

module.exports = Durum;
