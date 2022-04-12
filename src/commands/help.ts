// Use this file for easy creation of a new command.

import {Message} from "discord.js";

// import modules
import * as Util from "../modules/UtilFunctions";
import * as Types from "../modules/Types";
import Client from "../modules/Client";

// import command index
import commands from "./index";

/**
 * Execute the command.
 */
function execute(message: Message, client: Client){
    const showableCommands = commands.filter( (c) => c.hidden === false);
    let categories = [];
    showableCommands.forEach( (c) => {
        if(!categories.includes(c.category)){
            categories.push(c.category);
        };
    });
    let args = message.content.slice(client.config.prefix.length).split(" ").slice(1);
    message.channel.send(JSON.stringify(categories))
}

const commandJson: Types.Command = {
    name: "help",
    aliases: ["h"],
    description: "List all commands that the bot has",
    category: "info",
    execute: execute,
    hidden: false /* hides the command from help */
}

export default commandJson;