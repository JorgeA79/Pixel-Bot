const discord = require("discord.js")
const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json")
const oakdexPokedex = require('oakdex-pokedex');




client.prefix = PREFIX
client.queue = new Map();

var Pokedex = require('pokedex'),
    pokedex = new Pokedex();

//CLIENT EVENTS
client.on("ready", () => {
  console.log('Ready TO play some soft songs')
  client.user.setActivity("Playing in Japan | p!help")
})

client.on("warn", info => console.log(info));

client.on("error", console.error)

//DEFINIING
client.commands = new discord.Collection()

//LETS LOAD ALL FILES
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} //LOADING DONE


//WHEN SOMEONE MESSAGE
client.on("message", message => {
   if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.startsWith(PREFIX)) { //IF MESSSAGE STARTS WITH MINE BOT PREFIX
    
    const args = message.content.slice(PREFIX.length).trim().split(/ +/) //removing prefix from args
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) {
      return;
    } 
    
  try  { //TRY TO GET COMMAND AND EXECUTE
      client.commands.get(command).execute(client, message, args)
    } catch (err) { //IF IT CATCH ERROR
      console.log(err)
      message.reply("I am getting error on using this command")
    }
    
  }
  
  
});


    var say = "say";
    client.on('message', message => {
	  if (message.author === client.user) return;
	  if (message.content.startsWith(PREFIX + say)) {
		const args = message.content.slice(PREFIX.length).split(` `);
		message.delete({ timeout: 1000});
		if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	   }
		  
		const embed = new discord.MessageEmbed()
   		.setColor(0xC76CF5)
   		.setDescription(args.splice(1).join(" "))
   		message.channel.send(embed);

		
	}
});

client.on('message', message => {
	  if (message.author === client.user) return;
	  if (message.content.startsWith(PREFIX + "pokedex")) {
		const args = message.content.slice(PREFIX.length).split(` `);
		const argsowo = args.splice(1).join(" ");  
			
		  	if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	   		}
		  
		    try {
        		var pokemon = pokedex.pokemon(argsowo)
			console.dir(pokemon);    
			    
			var name = pokemon.name.toString();
    			var id = pokemon.id;
    			var height = pokemon.height;
    			var weight = pokemon.weight;
    			var sprite = pokemon.sprites.animated;
			var types = pokemon.types
    			var exp = pokemon.base_experience;    
			var pokemonL = name.charAt(0).toUpperCase();
			var pokemonM = name.slice(1); 
			var pokemonX = pokemonL + pokemonM;			    
			const pokemonE = oakdexPokedex.findPokemon(pokemonX)
			var entry = pokemonE.pokedex_entries;
			var selectEntry = entry[Math.floor(Math.random() * entry.length)];
			var entryowo = entry[0];
			console.log(entryowo);
			
			    
			    
          		const embed = new discord.MessageEmbed()
          		.setTitle(`${pokemonX} #${id}`)
			.setDescription(`${selectEntry}`)
			.setThumbnail(pokemon.sprites.animated)
			.addField("Types", "\`"+ types[0] +"\`")
			.addField("Height", "\`"+ height/10 +"m\`")
			.addField("Weight", "\`"+ weight/10 +"kg\`")
			.addField("Base Experience", "\`"+ exp +"\`")
          		.setColor(0xC76CF5);
           		message.channel.send(embed);
    			} catch(e) {
        		console.log(e);
			const embed = new discord.MessageEmbed()
			.setDescription(`Thats not a pokemon, ${message.author}!`)
          		.setColor(0xC76CF5);
           		message.channel.send(embed);  
    			}
	  	

		  }
});
//DONT DO ANYTHING WITH THIS TOKEN lol
client.login(process.env.BOT_TOKEN)
