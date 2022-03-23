var discord = require("discord.js")

/**
 * 
 * @param {discord.Message} message 
 * @param {discord.Client} client 
 */
function execute(message, client){
    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
        );
        message.reply({allowedMentions : {repliedUser:false}, components : [row], content:"button"}).then( (msg) => {
        const filter = i => i.customId === 'primary' && i.user.id === message.author.id
        const collector = msg.createMessageComponentCollector({filter, time : 15000})
        collector.on('collect', (i) => {
            i.reply("The button was clicked!")
            collector.resetTimer({"time": 25000})
        })
    })
}

module.exports = {
    "name":"button",
    "aliases": [],
    execute:execute
}