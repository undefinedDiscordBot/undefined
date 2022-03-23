const discord = require("discord.js");
const fs = require("fs");
const Client = discord.Client;
const Intents = discord.Intents

class Bot extends Client {
    constructor(){
        super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        this.DiscordJS = discord;
        this.config = require("../config.json")
        this.commands = new Array();
        this.data = new Array();
        if(!fs.existsSync("./data/")) fs.mkdirSync("./data");
        var datafolder = fs.readdirSync("./data");
        for(var i in datafolder){
            if(!datafolder[i].endsWith(".json")) continue;
            this.data.push(require("../data/" + datafolder[i]));
        }
        var filter = (d) => d.endsWith(".json")
        console.log(`Loaded ${datafolder.filter(filter).length} data files.`)
        this.DiscUsers = this.data.filter(d => d.type == "user");
        this.DiscServers = this.data.filter(d => d.type == "server");
        // Auto-save data

        var that = this

        var autoSaveInterval = 300 // Autosave interval in seconds.
        setInterval(function(){
            for(var i = 0; i < that.DiscUsers.length; i++){
                var user = that.DiscUsers[i];
                fs.writeFileSync(`./data/user_${user.id}.json`, JSON.stringify(user, null, 2))
            }
            for(var i = 0; i < that.DiscServers.length; i++){
                var server = that.DiscServers[i];
                fs.writeFileSync(`./data/server_${server.id}.json`, JSON.stringify(server, null, 2))
            }
            console.debug("Autosaved!");
        }, autoSaveInterval*1000)
    }
}
module.exports = Bot;