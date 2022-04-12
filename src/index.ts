// es6 imports
import {Guild, User} from "discord.js";
import * as fs from "fs";
import * as Types from "./modules/Types"
import extendedClient from "./modules/Client";
import * as utils from "./modules/UtilFunctions";
const client = new extendedClient();

var commandsDir = fs.readdirSync("./commands");
var commandsFilter = (c:string) => c.endsWith(".js");
var validCommands = commandsDir.filter(commandsFilter);

for(var command of validCommands){
    client.commands.push(require(`./commands/${command}`));
}
console.log(`Loaded ${validCommands.length} commands!`);

if(client.config.token) client.login(client.config.token); else console.log("No token provided. Please put a bot token in config.json and restart the bot.")

client.on("ready", () => {
    if(client.user === null) return;
    client.user.setPresence({ activities: [{ name: 'for '+client.config.prefix+'help', type:'WATCHING' }]})
    console.log(`Logged in as ${client.user.tag}!`);
})
client.on("messageCreate", (msg) => {
    if(typeof msg.guild !== typeof Guild) return;
    var thisServer = client.Servers.filter(s => msg.guild !== null && msg.guild.id === s.id);
    var prefixToUse;
    if(thisServer.length > 0 && thisServer[0].prefix && thisServer[0].prefix !== client.config.prefix) prefixToUse=thisServer[0].prefix; else prefixToUse=client.config.prefix;
    // if the server has a custom prefix, use it
    if(msg.content.startsWith(prefixToUse)){ // check if command starts with prefix
    var command = msg.content.slice(prefixToUse.length).split(/ +/)[0]; // get the command
    var filter = (c: Types.Command) => c.name === command || c.aliases.includes(command); // filter for command to execute
    var toExec = client.commands.filter(filter);
    // if cant find command, tell user
    if(toExec.length <= 0) {utils.quickError(msg, `I couldnt find the command you were looking for, ${msg.author.username}`); return;};
    try{
        toExec[0].execute(msg, client);
    }catch(err){
        console.log("Error: " + err);
        msg.channel.send("I encountered an error while trying to execute your command. Please contact the developer of this bot for help.");
    }
    }       else if(client.user !== null && msg.content == `<@!${client.user.id}>`){
        var thisServer = client.Servers.filter(s => msg.guild !== null && msg.guild.id === s.id);
        var serverPrefix;
        if(thisServer.length !== 0 && thisServer[0].prefix && thisServer[0].prefix !== client.config.prefix) serverPrefix=thisServer[0].prefix;
        
        serverPrefix ? msg.channel.send(`My prefix in this server is ${serverPrefix}`) : msg.channel.send(`My prefix is ${client.config.prefix}`);
    }
}) 