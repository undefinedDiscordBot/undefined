const sharp = require("sharp");
const discord = require("discord.js");
const Snekfetch = require("snekfetch");

module.exports = {
    name: "downscale",
    aliases: ["down"],
    execute: function(message, client){
        var args = message.content.split(" ").slice(1);
        if(message.attachments.size == 0) return message.reply("Please attach the image you want to downscale along with the command message.");
        if(message.attachments.size > 1) return message.reply("You attached more than one image to your message. This command only works with one attachment.");
        if(!message.attachments.first().contentType.startsWith("image")) return message.reply("Please provide an image.")
        var sizes = {
            smol:25,
            piss:50,
            tiny:80,
            small:128,
            medium:200,
            large:255
        }
        var size = sizes[args[0]] || 255;
        var image = message.attachments.first()
        var resizeParams = {};
        if(image.width > image.height) resizeParams["width"] = size; else resizeParams["height"] = size;
        Snekfetch.get(image.url).then( (res) => { 
        sharp(res.body)
        .resize(resizeParams)
        .toFormat("png")
        .toBuffer()
        .then( (output) => {
            message.reply({
                files: [
                    {
                        attachment: output,
                        name: image.name.startsWith("SPOILER") ? 'SPOILER_output.png' : 'output.png'
                    }
                ]
            });
        })
    })
    }
};
