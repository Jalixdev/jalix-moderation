const Command = require("../src/base/Command.js");
const moment = require("moment")
require("moment-duration-format")
const cezalar = require("../src/models/cezalar.js");
const { config } = require("process");
class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "modeval",
      description: "Evaluates arbitrary Javascript.",
      category: "System",
      usage: "eval <expression>",
      aliases: ["ev"]
    });
  }

  async run(message, args, perm) {
      if(message.author.id !== config.bot.Authors) return
    if (args.join(" ").toLowerCase().includes('token')) return message.channel.send("Wow, you're smart.")
    const clean = text => {
      if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    try {
      const code = args.join(" ");
      let evaled = await eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      await message.channel.send(clean(evaled), {
        code: "xl"
      });
    } catch (err) {
      await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}

module.exports = Eval;
