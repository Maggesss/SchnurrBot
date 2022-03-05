const fs = require("fs");
const { token } = require("./config.json");
const { Client, Collection, MessageEmbed} = require("discord.js");
const path = require("path");
const User = require("./source/user/index");
const Server = require("./source/server/index");
const functions = require("./functions.js");

//Random responses
const respWordlist= ["Hi :D",
					"Huh?",
					"What's up, man?",
					":3",
					"Who dares to ping me!? :rage:"]


//Setup & load commands
const client = new Client({ intents: ["GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["CHANNEL"]});

client.commands = new Collection();

const commandFolders = fs.readdirSync("./commands");

for (const dir of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.data.name, command);
	};
};

//list guilds
client.once("ready", () => {
	let counter = 0;
	console.log("Ready!");
    const guilds = client.guilds.cache.map(guild => `${guild.id}: ${guild.name}`);
    console.log(guilds);
	for (x in guilds) {
		counter = counter + 1;
	};
	console.log(`\nBot is currently in ${counter} guilds.\n`);
});

// /command listener
client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;
	//create userfile if not already exists
	if(!fs.existsSync(path.resolve(`./data/user/${interaction.user.id}.json`))) {
		fs.writeFileSync(path.resolve(`./data/user/${interaction.user.id}.json`), new User({ id: interaction.user.id, name: interaction.user.tag }).toString());
	};
	//create server folder if not already there
	if (!fs.existsSync(`./data/server/${interaction.guild.id}`)) {
		fs.mkdir(`./data/server/${interaction.guild.id}`, (err) => {
			if (err) throw err;
			console.log("ServerDir created.")});
		fs.writeFileSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`), new Server({ id: interaction.guild.id, name: interaction.guild.name }).toString());
	};

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	};
});

//message listener
client.on('messageCreate', (message) => {

    if (message.author.bot) {return};

    const attachment = message.attachments.first();

	//dm?
    if (message.channel.type === 'DM') {
        const dmLogEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.tag} dmed the bot and said: `)
            .setDescription(message.content)
            .setFooter({ text: `User's id: ${message.author.id}` });

        if (message.attachments.size !== 0) {
            dmLogEmbed.setImage(attachment.url);
        };
        client.channels.fetch("949777558860349481").then((channel) => {
            return channel.send({ embeds: [dmLogEmbed] });
        });
	//message mention?
    } else if (message.mentions.members.first()) {
		//bot mentioned?
		if (message.mentions.has(client.user)) {
			return message.reply({ content: respWordlist[functions.getRandomIntInclusive(0, 4)], ephemeral: false })
		//mentioned user afk? ye => check reason & respond
		} else { fs.writeFileSync(path.resolve(`./data/user/${message.author.id}.json`), new User({ id: message.author.id, name: message.author.tag }).toString());
			if(fs.existsSync(path.resolve(`./data/user/${message.mentions.members.first().id}.json`))) { const user = new User(JSON.parse(fs.readFileSync(path.resolve(`./data/user/${message.mentions.members.first().id}.json`)))); 
				if (user.afk == true) {
					return message.channel.send(`This user is currently AFK because of: ${user.reason} There is no point in mentioning them...`)
				};
			};
		};
	} else if (!fs.existsSync(`./data/server/${message.guild.id}`)) {
		//create server folder if not already exists
		fs.mkdir(`./data/server/${message.guild.id}`, (err) => {
			if (err) throw err;
			console.log("ServerDir created.")});
		fs.writeFileSync(path.resolve(`./data/server/${message.guild.id}/regData.json`), new Server({ id: message.guild.id, name: message.guild.name }).toString());
	};
	//create userfile => no more afk
	fs.writeFileSync(path.resolve(`./data/user/${message.author.id}.json`), new User({ id: message.author.id, name: message.author.tag }).toString());
});

client.login(token);