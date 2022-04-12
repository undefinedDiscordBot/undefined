const {MessageEmbed} = require("discord.js");
const discord = require("discord.js");
const DiscClient = require("../modules/Client")
module.exports = {
    name:"help",
    aliases: ["h"],
    /** 
    * Execute the command
    * @param {discord.Message} message - The message that was sent to execute the command
    * @param {DiscClient} client - The discord bot client
    */
    execute(message, client){
        var embed = new MessageEmbed();
        var prefix = message.prefix
        var args = message.content.slice(prefix.length).split(" ").slice(1);
        switch(args[0]){
            default:
            embed.setTitle("Help - Categories")
            .setDescription(`Do ${message.prefix}help (category name) to see the commands under that category`)
            .addField("`fun`", "fun commands")
            .addField("`settings`", "Change this server's bot settings")
            .addField("`moderation`", "Moderation commands like kick, ban, mute, etc.");
            break;
            case "fun":
            embed.setTitle("Help - Fun")
            .addField("`click`", `A simple clicker game, everytime you do ${prefix}click your clicks counter will go up 1.\n Aliases: c`)
            .addField("`payclicks`", `Give clicks to someone else. Usage: ${prefix}payclicks @user amount \n Aliases: pc`)
            break;
            case "settings":
            embed.setTitle("Help - Settings")
            .setDescription("Note: These settings will only affect this server.")
            .addField("`prefix`", "Set the prefix for this server.");
            break;
        }
        message.reply({embeds: [embed], allowedMentions: {repliedUser : false}})
    }
}
