const data = require("../src/models/chatmute.js")
const config = require("./src/Settings/settings.json")

module.exports = client => {
setInterval(async () => {
    let muted = await data.find({
        "muted": true,
        "endDate": {
            $lte: Date.now()
        }
    })
 
    muted.forEach(async memberdata => {
        let sunucu = client.guilds.cache.get(config.bot.ServerID)
        if (!sunucu) return;
        if(!sunucu.members.cache.has(memberdata.user)) {
            data.deleteOne({user: memberdata.user}, async (err) => {
                if(err){ console.log("Silinemedi.") }
            })
        } else {
        let member = sunucu.members.cache.get(memberdata.user)
        if (!member) return;
        member.roles.remove(config.cezarole.chatmuted)
        data.deleteOne({user: member.id}, async (err) => {
            if(err){ console.log("Silinemedi.") }
        })
        }
    });
}, 5000);
}