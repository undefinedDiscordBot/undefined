var discord = require("discord.js")
var extendedClient = require("../modules/Client.js");

/**
 * Execute the command
 * @constructor
 * @param {discord.Message} message - The message that triggered the command 
 * @param {extendedClient} client   - The bot client, useful for managing user save data
 */

function execute(message, client){
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`Only server administrators can do that, ${message.member.displayName}`);
    var newPrefix = message.content.slice(client.config.prefix.length).split(" ").slice(1).join(" ")
    var server = message.guild.getServerData();
    if(newPrefix.length > 10) return message.channel.send("Whoa there, thats a really long prefix! Please make your prefix something 10 or less characters.")
    if(server.prefix == newPrefix) return message.channel.send("The server prefix is already that!")
    server.prefix = newPrefix;
    var embed = new discord.MessageEmbed()
    .setTitle("Prefix")
    .setFooter(message.guild.name, message.guild.iconURL())
    .setDescription(`Set server prefix to ${newPrefix}`)
    .setTimestamp()
    if(newPrefix == client.config.prefix) embed.setDescription(`Set server prefix to default (\`${newPrefix}\`)`)
    message.reply({allowedMentions : {repliedUser : false}, embeds : [embed]})
    
}

module.exports = {
    name:"prefix",
    aliases:[],
    execute:execute
}