// Use this file for easy creation of a new command.

const {Message, Client} = require("discord.js")

// JSDoc for intellisense in VS Code and other IDEs
/**
 * Execute the command.
 * @param {Message} message 
 * @param {Client} client 
 */
function execute(message, client){
    // Your code here.
    message.reply("This command is not yet implemented.");
}

module.exports = {
    name: "command",
    aliases: ["cmd"],
    description: "This is the command template.",
    category: "example",
    execute: execute
}