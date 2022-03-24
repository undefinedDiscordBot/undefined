/*

- Utility functions

These functions make some things less tedious and help with writing shorter and more readable code.

*/
const {GuildMember, User, Guild, Message} = require("discord.js");
const discordJS = require("discord.js")

const clientJS = require("../modules/Client.js")

/** Add util functions
 * @constructor
 * @param {clientJS}  client  - 
 */
function addUtil(client){
    
    User.prototype.getUserData = 
    /**
     * 
     * @returns {{id: String, type: String, isBot: Boolean}}
     */
    function(){
            var possibleData = client.DiscUsers.filter( userObject => userObject.id == this.id)[0];
            // If user data exists, then just return that
            if(possibleData != null) return possibleData;
            // Create new user data and return that instead
            var newData = {
                "type":"user",
                "id": this.id.toString(),
                "isBot": this.bot
            }
            client.DiscUsers.push(newData);
            return client.DiscUsers.filter( userObject => userObject.id == this.id )[0];
        }
        
        Guild.prototype.getServerData = 
        /**
         * 
         * @returns {{type: String, id: String}}
         */
        function(){
            var possibleData = client.DiscServers.filter( serverObject => serverObject.id == this.id)[0];
            // If data exists, return that.
            if(possibleData != undefined) return possibleData;
            var newData = {
                type:"server",
                id:this.id
            }
            client.DiscServers.push(newData);
            return client.DiscServers.filter( serverObject => serverObject.id == this.id)[0];
        }
    GuildMember.prototype.getUserData = function(){
            var possibleData = client.DiscUsers.filter( userObject => userObject.id == this.id)[0];
            // If user data exists, then just return that
            if(possibleData != null) return possibleData;
            // Create new user data and return that instead
            var newData = {
                "type":"user",
                "id": this.id.toString(),
                "isBot": this.bot
            }
            client.DiscUsers.push(newData);
            return client.DiscUsers.filter( userObject => userObject.id == this.id )[0];
        }
        /**
         * 
         * @param {String} message 
         * @returns {Message} The error message sent to the user.
         * @throws {Error} If the message is not a string.
         */
    Message.prototype.error = function(message){
        // Send an error message to the user.
        if(typeof message != "string") throw new Error("Message must be a string.");
        let embed = new discordJS.MessageEmbed();
        embed.setTitle("Error");
        embed.setDescription(message);
        embed.setColor("#ff0000");
        return this.reply({embeds: [embed], allowedMentions: {repliedUser: false}});
    }
}

module.exports = addUtil;