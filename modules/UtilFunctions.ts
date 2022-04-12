import {Guild, User, GuildMember, Message, MessageEmbed} from "discord.js";
import Client from "./Client";
import * as Types from "./Types";



export function getUserData(user: User | GuildMember, client: Client): Types.UserData {
    var possibleData = client.Users.filter(data => data.id == user.id)[0];
    // If user data exists, then just return that
    if (possibleData != null) return possibleData;
    // Create new user data and return that instead
    var newData: Types.UserData = {
        "type": "user",
        "id": this.id.toString(),
        "isBot": this.bot
    }
    var pushed = client.Users.push(newData);
    return client.Users[pushed - 1];
}

export function getServerData(server: Guild, client: Client): Types.ServerData {
    let possibleData = client.Servers.filter(data => data.id == server.id)[0];
    // If user data exists, then just return that
    if (possibleData != null) return possibleData;
    // Create new user data and return that instead
    let newData: Types.ServerData = {
        "type": "server",
        "id": this.id.toString()
    }
    let pushed = client.Servers.push(newData);
    return client.Servers[pushed - 1];
}

export function quickError(msg: Message, error: string): Promise<Message> {
    let embed = new MessageEmbed();
        embed.setTitle("Error");
        embed.setDescription(error);
        embed.setColor("#ff0000");
        return this.reply({
            embeds: [embed],
            allowedMentions: {
                repliedUser: false
            }
        });
}