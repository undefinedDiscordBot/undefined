// Use this file for easy creation of a new command.

import {Message} from "discord.js";

// import modules
import * as Util from "../modules/UtilFunctions";
import * as Types from "../modules/Types";
import Client from "../modules/Client";

/**
 * Execute the command.
 */
function execute(message: Message, client: Client){
    // Your code here.
    message.reply("This command is not yet implemented.");
}

const commandJson: Types.Command = {
    name: "command",
    aliases: ["cmd"],
    description: "This is the command template.",
    category: "example",
    execute: execute
}

export default commandJson;