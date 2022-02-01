const cezalar = require("../src/models/cezalı.js")
const mute = require("../src/models/chatmute.js")
const data = require("../src/models/yasaklıtag.js")
const config = require("../src/Settings/settings.json")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        await data.findOne({ guild: member.guild.id }, async (err, res) => {
        if(res.taglar.some(x => member.user.username.includes(x)) == true) {
            member.roles.add(this.client.config.cezarole.yasaklıtag)
            member.setNickname('Yasaklı Tag');
            setTimeout(() => {
            member.roles.remove(this.client.config.registerrole.kayıtsız)}, 2000);
            member.send("İsminde bulunan yasaklı tagdan dolayı sunucumuzda yasaklı taga atıldın. İsmindeki yasaklı tagı kaldırarak sunucumuza erişim sağlayabilirsin. Eğer her hangi bir problemin varsa üst yöneticilerimize ulaşmaktan çekinme !").catch(e => console.log('Mesaj atamıyorum.'))
            return
        }
        if (Date.now() - member.user.createdTimestamp < ms("5d")) return member.roles.set([this.client.config.cezarole.şüpheli])
        let mutedDB = await mute.findOne({ user: member.id })
        if (mutedDB && mutedDB.muted == true) member.roles.add(this.client.config.cezarole.chatmuted)
        if (member.user.username.includes(""+this.client.config.bot.tag+"")) member.roles.add(this.client.config.roles.family)
        let cezalıDB = await cezalar.findOne({ user: member.id })
        if (!cezalıDB) return member.roles.add(this.client.config.registerrole.kayıtsız)
        if (cezalıDB && cezalıDB.ceza == true) return await member.roles.set([this.client.config.cezarole.karantina])
        if (cezalıDB && cezalıDB.ceza == false) return await member.roles.set(this.client.config.registerrole.kayıtsız)
    })
    }
};