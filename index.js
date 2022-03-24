const fs = require("fs");
const utilFunctions = require("./modules/UtilFunctions.js")
const extendedClient = require("./modules/Client.js");
const client = new extendedClient();
utilFunctions(client)

console.originalDebug = console.debug
console.debug = function(whatToLog){if(client.config.debug){console.originalDebug(whatToLog)}}

var commandsDir = fs.readdirSync("./commands");
var commandsFilter = c => c.endsWith(".js");
var validCommands = commandsDir.filter(commandsFilter);

for(var command of validCommands){
    client.commands.push(require(`./commands/${command}`));
}
console.log(`Loaded ${validCommands.length} commands!`);

if(client.config.token) client.login(client.config.token); else console.log("No token provided. Please put a bot token in config.json and restart the bot.")


client.on("ready", () => {
    client.user.setPresence({ activities: [{ name: 'for '+client.config.prefix+'help', type:'WATCHING' }]})
    console.log(`Logged in as ${client.user.tag}!`);
})
client.on("messageCreate", (msg) => {
    if(!msg.guild || msg.author.bot) return;
    var thisServer = client.DiscServers.filter(s => msg.guild.id == s.id);
    var prefixToUse;
    if(thisServer.length > 0 && thisServer[0].prefix && thisServer[0].prefix !== client.config.prefix) prefixToUse=thisServer[0].prefix; else prefixToUse=client.config.prefix;
    // if the server has a custom prefix, use it
    if(msg.content.startsWith(prefixToUse)){ // check if command starts with prefix
    var command = msg.content.slice(prefixToUse.length).split(/ +/)[0]; // get the command
    msg.prefix = prefixToUse;
    var filter = c => c.name === command || c.aliases.includes(command); // filter for command to execute
    var toExec = client.commands.filter(filter);
    if(toExec.length <= 0) return msg.error(`I couldnt find the command you were looking for, ${msg.author.username}`);
    // if cant find command, tell user
    try{
        toExec[0].execute(msg, client);
    }catch(err){
        console.log("Error: " + err);
        msg.channel.send("I encountered an error while trying to execute your command. Please contact the developer of this bot for help.");
    }
    }       else if(msg.content == `<@!${client.user.id}>`){
        var thisServer = client.DiscServers.filter(s => msg.guild.id == s.id);
        var serverPrefix;
        if(thisServer.length !== 0 && thisServer[0].prefix && thisServer[0] !== client.config.prefix) serverPrefix=thisServer[0].prefix;
        
        serverPrefix ? msg.channel.send(`My prefix in this server is ${serverPrefix}`) : msg.channel.send(`My prefix is ${client.config.prefix}`);
    }
}) 