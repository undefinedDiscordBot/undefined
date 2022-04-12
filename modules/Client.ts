import {Client, Intents} from "discord.js";
import * as Types from "./Types";
import * as fs from "fs";
class Bot extends Client {
    config: Types.Config;
    commands: Array<Types.Command>;
    Users: Array<Types.UserData>;
    Servers: Array<Types.ServerData>;
    constructor(){
        super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        this.config = require("../config.json")
        this.commands = new Array();
        this.Users = new Array();
        this.Servers = new Array();

        if(!fs.existsSync("./data/")) fs.mkdirSync("./data");
        var datafolder = fs.readdirSync("./data");
        for(var i in datafolder){
            var file = datafolder[i];
            if(!file.endsWith(".json")) continue;
            var whereToPush: "DiscUsers" | "DiscServers" = file.startsWith("user") ? "DiscUsers" : "DiscServers";
            this[whereToPush].push(require("../data/" + datafolder[i]));
        }
        var filter = (d) => d.endsWith(".json")
        console.log(`Loaded ${datafolder.filter(filter).length} data files.`)
        // Auto-save data

        var that = this

        var autoSaveInterval = 300 // Autosave interval in seconds.
        setInterval(function(){
            for(var i = 0; i < that.Users.length; i++){
                var user = that.Users[i];
                fs.writeFileSync(`./data/user_${user.id}.json`, JSON.stringify(user, null, 2))
            }
            for(var i = 0; i < that.Servers.length; i++){
                var server = that.Servers[i];
                fs.writeFileSync(`./data/server_${server.id}.json`, JSON.stringify(server, null, 2))
            }
            console.debug("Autosaved!");
        }, autoSaveInterval*1000)
    }
}
export default Bot;