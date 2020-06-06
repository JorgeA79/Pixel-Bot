//FIRST TEST HANDLER IS WORKING OR NOT
const Discord = require("discord.js");
const fs = require("fs");

var contents = fs.readFileSync("./commands/agents/agents.json");
var jsonContent = JSON.parse(contents);


module.exports = {
  name: "valorant",
  description: "Pinging the bot",
  execute(client, message, args) {
    
  
    if(args[0].toLowerCase() =="agent"){
    
    var agent = jsonContent.agents[0]; 
    if(!args[1]) return message.reply("Please specify one of the agents \n -Viper\n -Omen\n -Reyna\n -Jett\n -Sova\n -Phoenix")
    if(args[1].toLowerCase() == "viper") agent = jsonContent.agents[0]; 
    if(args[1].toLowerCase() == "jett") agent = jsonContent.agents[1];
    if(args[1].toLowerCase() == "omen") agent = jsonContent.agents[2];
    if(args[1].toLowerCase() == "reyna") agent = jsonContent.agents[3]; 
    if(args[1].toLowerCase() == "sova") agent = jsonContent.agents[4]; 
     if(args[1].toLowerCase() == "phoenix") agent = jsonContent.agents[5]; 
      
    const embed = new Discord.MessageEmbed()
    .setTitle("Valorant Agents")
    .setDescription(`${agent.emote} - **${agent.name}'s** agent info`)
    .addField("Name:", `${agent.name}`, true)
    .addField("Type:", `${agent.type}`, true)
    .addField("Description:", `${agent.description}`, false)
     .addField("Abilities:", `**[C]** ${agent.abilities[0]} \n **[Q]** ${agent.abilities[1] } \n **[E]** ${agent.abilities[2]}\n **[X]** ${agent.abilities[3]}`, false)
    .setThumbnail(agent.thumbnail)
    .setImage(agent.image)
    .setColor(0xC76CF5);
    message.channel.send(embed);
      
    }else{
     const embed = new Discord.MessageEmbed()
     .setTitle("Valorant Commands")
    .setDescription(`${message.author}, This are all the commmands related to valorant game!\n\u200b`)
    .addField("p!valorant agent/p!valorant agent [agent-name]:", `<:valorant:718659131917074504> Get all the agents in game/ or the info about one in specific`, false)
     .setImage('https://cdn.discordapp.com/attachments/396942894487044099/718659478500671568/unknown.png')
    .setColor(0xC76CF5);
    message.channel.send(embed);
    }  
}
}
