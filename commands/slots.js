const Discord = require("discord.js");
const { SlotMachine, SlotSymbol } = require('slot-machine');
const pg = require('pg')
const pool = new pg.Pool({
	connectionString : process.env.DATABASE_URL,
});
pool.connect()

module.exports = {
  name: "slots",
  description: "Pinging the bot",
  execute(client, message) {

const pokeb = new SlotSymbol('pokeb', {
    display: '<:pokeb:716936621265518613>',
    points: 10,
    weight: 100
});
const greatb = new SlotSymbol('greatb', {
    display: '<:greatb:716936621022248970>',
    points: 15,
    weight: 80
});    
const ultrab = new SlotSymbol('ultrab', {
    display: '<:ultrab:716936621529890869>',
    points: 20,
    weight: 70
});  
const premierb = new SlotSymbol('premierb', {
    display: '<:premierb:716936621592674365>',
    points: 25,
    weight: 65
});
const quickb = new SlotSymbol('quickb', {
    display: '<:quickb:716936621609582715>',
    points: 25,
    weight: 60
});
const timerb = new SlotSymbol('timerb', {
    display: '<:timerb:716936621680885760>',
    points: 25,
    weight: 60
});    
const loveb = new SlotSymbol('loveb', {
    display: '<:loveb:716936621118849034>',
    points: 30,
    weight: 55
});  
const luxuryb = new SlotSymbol('luxuryb', {
    display: '<:luxuryb:716936620753813586>',
    points: 35,
    weight: 45
});      
const masterb = new SlotSymbol('masterb', {
    display: '<:masterb:716936718825029723>',
    points: 100,
    weight: 40
});
 
const talkedRecently = new Set();
if (talkedRecently.has(message.author.id)) {	  

	message.reply("Please wait 30 seconds for using the command again!")
}	else{


pool.query(`SELECT * FROM usersxp WHERE id = '${message.author.id}'`, (err,result) =>{
   if(err) return err;	  

var amount =0;	
var total =0;	
  let money = result.rows[0].money;
   if(money === null) money=0;
   if(money <= 0){	
	const embed = new Discord.MessageEmbed()
     .setDescription(`You have no money to play`)
     .setColor(0xC76CF5)
     return message.channel.send(embed);	
     
   }
	
const machine = new SlotMachine(3, [pokeb, greatb, ultrab, quickb, luxuryb, timerb, loveb, premierb, masterb]);
const results = machine.play();
const resultspoints = machine.play().totalPoints;
let less = -1;
amount = eval(resultspoints) + eval(less);
	
var text = `You won ${amount} | :yen: `;
	
if(amount <= 0)	text = `You lost ${amount} credits | :yen: `;
	
total += eval(money) + eval(amount); 
	
pool.query(`UPDATE usersxp SET money = ${total} WHERE id = '${message.author.id}'`, console.log);	    
    
     const embed = new Discord.MessageEmbed()
     .setTitle("Pokemon Slots")
     .setDescription(`${results.visualize()} \n${text}`)
     .setColor(0xC76CF5)
     message.channel.send(embed);	
     
	
	

});
		talkedRecently.add(message.author.id);
	    
   		setTimeout(() => {
 
 		talkedRecently.delete(message.author.id);
		}, 30000);
}   
}
}
