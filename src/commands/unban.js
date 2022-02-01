const Command = require("../src/base/Command.js");
const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const db = require("../src/models/cantUnBan.js")
class Unban extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            aliases: ["unban"]
        });
    }

    async run(message, args, client) {
        if (!message.member.roles.cache.some(r =>["736891557680119849", "727881272893898773"].includes(r.id))) return
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
                  } else {
                    await db.findOne({userid: res.id}, async(err,dbres) => {
                        if(!dbres) {
                            await message.guild.members.unban(res.id)
                            embed.setDescription(`**${res.tag}** kullanıcısının yasağı kaldırıldı.`)
                            message.channel.send(embed)
                        } else {
                            embed.setDescription(`${res.tag} kullanıcısının yasağı <@${dbres.mod}> tarafından açılamaz olarak etiketlenmiştir.Yasağı sadece <@${dbres.mod}> kaldırabilir.`)
                            if(message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed)
                            await message.guild.members.unban(res.id)
                            embed.setDescription(`**${res.tag}** kullanıcısının yasağı kaldırıldı.`)
                            message.channel.send(embed)
                            res.delete().catch(e => console.log(e))
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



module.exports = Unban;
