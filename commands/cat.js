//FIRST TEST HANDLER IS WORKING OR NOT
const Discord = require("discord.js");
const superagent = require("superagent")
const fetch = require('node-fetch');

module.exports = {
  name: "cat",
  description: "Pinging the bot",
  execute(client, message) {
   
    fetch("http://aws.random.cat/meow")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(" whoops. I broke, try again!")

              const embed = new Discord.MessageEmbed()
              .setDescription(`:cat: | Here is your image!`)
              .setColor(0xC76CF5)
              .setImage(body.file)
              .setFooter('Have a nice day!', process.env.BOT_AVATAR)
              message.channel.send(embed);
        })  
    
}
}
