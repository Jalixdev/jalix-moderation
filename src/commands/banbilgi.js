const Command = require("../src/base/Command.js");
const Discord = require("discord.js")
const config = require("../src/Settings/settings.json")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const db = require("../src/models/cantUnBan.js");
const { config } = require("process");
class BanBilgi extends Command {
    constructor(client) {
        super(client, {
            name: "ban-bilgi",
            aliases: ["banbilgi"]
        });
    }

    async run(message, args, client) {
        if (!message.member.roles.cache.some(r => config.ytrole.banhammers .includes(r.id))) return
      let embed = new Discord.MessageEmbed()
      embed.setColor("RANDOM")
      embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
      
      await this.client.users.fetch(args[0]).then(res => {
          if(!res){
              embed.setDescription("Geçerli bir kullanıcı ID si giriniz.")
              return message.channel.send(embed)
          }else{
              message.guild.fetchBans(true).then(async(bans) => {
                  let ban = await bans.find(a => a.user.id === res.id)
                  if(!ban){
                      embed.setDescription(`\`${res.tag}\` bu sunucuda yasaklı değil!`)
                      return message.channel.send(embed)
                  }else{
                      let text = `:no_entry_sign:  ${res.tag} (\`${res.id}\`) adlı kullanıcı sunucumuzdan şu sebepten dolayı yasaklanmış:\n\n"${ban.reason || "Sebep Belirtilmemiş."}"`
                      message.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD', limit: 100}).then(audit => {
                          let user = audit.entries.find(a => a.target.id === res.id)
                          if(user){
                              embed.setDescription(text + `\n─────────────────────────────\nKullanıcı, ${user.executor.tag} (\`${user.executor.id}\`) tarafından ${moment(user.createdAt).format("lll")} tarihinde yasaklanmış.`)
                              return message.channel.send(embed)
                          }else{
                              embed.setDescription(text + "\n\nBu yasaklama, son 100 yasaklama içinde olmadığından dolayı ban bilgisini yazamıyorum.")
                              return message.channel.send(embed)
                          }
                      })
                  }
              })
          }
      }).catch(err => {
          embed.setDescription("Geçerli bir kullanıcı ID si giriniz.")
              return message.channel.send(embed)
      })
    }
}



module.exports = BanBilgi;
