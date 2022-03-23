function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

function execute(message, client){
    if(message.author.id !== client.config.ownerID) return; // Only I can use this command!
    try {
      const code = message.content.split(" ").slice(1).join(" ");
      var before = performance.now()
      let evaled = eval(code);
      var after = performance.now()
      var exectime = (after-before).toFixed(2);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(`Took ${exectime}ms to execute. \n\`\`\`\n${clean(evaled)}\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
module.exports = {
  name:"eval",
  aliases: [],  
  execute:execute
}