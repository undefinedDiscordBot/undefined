// First command properly using the getUserData function I created.

var discord = require("discord.js");
var ExtClient = require("../modules/Client");

/**
 * Execute the command
 * @param {discord.Message} message 
 * @param {ExtClient} client 
 */

function execute(message, client){
    var userData = message.author.getUserData();
    if(!userData.games) userData.games = {};
    if(!userData.games.clicker) userData.games.clicker = {clicks:0};
    userData.games.clicker.clicks++;
    var clicks = userData.games.clicker.clicks
    var embed = new discord.MessageEmbed()
    .setTitle("Click")
    .setFooter(message.member.displayName,message.author.avatarURL())
    .setDescription(`Your clicks are now at ${clicks}!`)
    .setColor("RANDOM")
    message.reply({allowedMentions: {repliedUser: false}, embeds: [embed]})
}

module.exports = {
    name:"click",
    aliases: ["c"],
    execute: execute
}