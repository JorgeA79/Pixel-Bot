
//FIRST TEST HANDLER IS WORKING OR NOT
const Discord = require("discord.js");

const filterLevels = {
 DISABLED: 'Off',
 MEMBERS_WITHOUT_ROLES: 'No Role',
 ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
 NONE: 'None',
 LOW: 'Low',
 MEDIUM: 'Medium',
 HIGH: '(╯°□°）╯︵ ┻━┻',
 VERY_HIGH: '┻━┻ ︵ヽ(`□´)ﾉ︵ ┻━┻'
};

const regions = {
brazil: "Brazil",
europe: "Europe",
hongkong: "Hong Kong",
india: "India",
japan: "Japan",
russia: "Russia",
singapore: "Singapore",
southafrica: "South Africa",
sydeny: "Sydeny",
'us-central': "US Central",
'us-east': "US East",
'us-west': "US West",
'us-south': "US South"
};


module.exports = {
  name: "serverinfo",
  description: "Pinging the bot",
  execute(client, message, args) {
  
  const roles = message.guild.roles.cache.sort((a,b) => b.position - a.position).map(role=> role.toString());
  const members = message.guild.members.cache;
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;
  
  
    const embed = new Discord.MessageEmbed()
    .setDescription(`**Guild information for _${message.guild.name}_**`)
    .setColor(0xC76CF5);
    .setThumbnail(message.guild.iconURL({ dynamic: true}))
    .addField('General'. [
       `**> Name:** ${message.guild.name}`,
       `**> ID:** ${message.guild.id}`,
       `**> Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
       `**> Region:** ${regions[message.guild.region]}`,
       `**> Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
       `**> Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
       `**> Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
       `**> Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('Ll')} ${moment(message.guild.createdTimestamp).fromNow()}`,
       '\u200b'
    ])
    .addField('Statistics', [
       `**> Roles:** ${roles.length}`,
       `**> Emojis:** ${emojis.size}`,
       `**> Regular Emojis:** ${emojis.filter(emoji => !emoji.animated).size}`,
       `**> Animated Emojis:** ${emojis.filter(emoji => emoji.animated).size}`,
       `**> Members Count:** ${message.guild.memberCount}`,
       `**> Human:** ${members.filter(member => !members.user.bot).size}`,
       `**> Bots:** ${members.filter(member => members.user.bot).size}`,
       `**> Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
       `**> Voice Channel:** ${channels.filter(channel => channel.type === 'voice').size}`,
       `**> Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
       
     ], true)
     .addField('Presence',[
     `**> Online:** ${members.filter(member => members.presence.status === 'online').size}`,
     `**> Idle:** ${members.filter(member => members.presence.status === 'idle').size}`,
     `**> Do not Disturb:** ${members.filter(member => members.presence.status === 'dnd').size}`,
     `**> Offline:** ${members.filter(member => members.presence.status === 'offline').size}`,
     ], true)  
    
    .addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
    .setTimestamp();
    message.channel.send(embed);
    
}
}