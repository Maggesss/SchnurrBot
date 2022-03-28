const fs = require("fs");
const { token, clientId } = require("./config.json");
const { Client, Collection, MessageEmbed } = require("discord.js");
const path = require("path");
const User = require("./source/user/index");
const Server = require("./source/server/index");
const customVC = require("./source/server/rentavc/index")
const functions = require("./functions.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

//Random responses
const respWordlist= ["Hi :D",
					"Huh?",
					"What's up, man?",
					":3",
					"Who dares to ping me!? :rage:"]

//Setup & load commands
const client = new Client({ intents: ["GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"], partials: ["CHANNEL"]});

client.commands = new Collection();

const rest = new REST({ version: "9" }).setToken(token);

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
    const guilds = client.guilds.cache.map(guild => `\n${guild.id}: ${guild.name}`);
	for (x in guilds) {
		counter += 1;
	};
	client.channels.fetch("957431154158489670").then((channel) => {
		channel.send(`Ready!\n${guilds}\n\nBot is currently in ${counter} guilds.\n`)
	});
});

// /command listener
client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;
	//create userfile if not already exists
	if(!fs.existsSync(path.resolve(`./data/user/${interaction.user.id}.json`))) {
		fs.writeFileSync(path.resolve(`./data/user/${interaction.user.id}.json`), new User({ id: interaction.user.id, name: interaction.user.tag }).toString());
	};

	if (!fs.existsSync(`./data/server/${interaction.guild.id}`)) {
		fs.mkdir(`./data/server/${interaction.guild.id}`, (err) => {
			if (err) throw err;
		});
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
client.on("messageCreate", (message) => {

    if (message.author.bot) {return};

    const attachment = message.attachments.first();

	//dm?
    if (message.channel.type === 'DM') {
        const dmLogEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.tag}: `)
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
					return message.channel.send(`This user is currently AFK because of: \`\`${user.reason}\`\` There is no point in mentioning them...`)
				};
			};
		};
	}
	//create userfile => no more afk
	fs.writeFileSync(path.resolve(`./data/user/${message.author.id}.json`), new User({ id: message.author.id, name: message.author.tag }).toString());
});


//join guild listener
client.on("guildCreate", async function (guild) {
	//list basic commands
	let standartCommands = [];

	for (const dir of commandFolders) {
		if (dir.startsWith("global") == true) {
			const standartCommandFiles = fs.readdirSync(`commands/${dir}`).filter(file => file.endsWith(".js"));

			for (const file of standartCommandFiles) {
				const standartCommand = require(`./commands/${dir}/${file}`);
				standartCommands.push(standartCommand.data.toJSON());
			};
		};
	};
	//deploy basic commands
	rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: standartCommands })
			.then(() => console.log(`Successfully registered standart application commands for guild: ${guild.name}`))
			.catch(console.error);

	//create server folder if not already exists
	if (!fs.existsSync(`./data/server/${guild.id}`)) {
		fs.mkdir(`./data/server/${guild.id}`, (err) => {
			if (err) throw err;
		});
		fs.writeFileSync(path.resolve(`./data/server/${guild.id}/regData.json`), new Server({ id: guild.id, name: guild.name }).toString());
	};
});

//listen to channel deletions
client.on("channelDelete", async function (action) {
	if (fs.existsSync(path.resolve(`./data/server/${action.guild.id}/regData.json`))) {
		const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${action.guild.id}/regData.json`))));
		//Check rent-a-vc channel
		if (server.rentavcChannelID == action.id) {
			fs.writeFileSync(path.resolve(`./data/server/${action.guild.id}/regData.json`), new Server({ id: action.guild.id, name: action.guild.name, suggestionChannelID: server.suggestionChannelID}).toString());
			client.channels.fetch("950064195464986725").then((channel) => {
				channel.send(`rent-a-vc channel deleted on server: \`\`${action.guild.name}\`\``);
				return;
			});
		} else { return; };
	};
});

//check voice state updates
client.on("voiceStateUpdate", async function (oldState, newState) {
	//check if server config is found in "data"
	if (fs.existsSync(path.resolve(`./data/server/${newState.guild.id}/regData.json`))) {
		//create custom-vc folder if not there already
		if (!fs.existsSync(path.resolve(`./data/server/${newState.guild.id}/customVCs`))) {
			fs.mkdir(`./data/server/${newState.guild.id}/customVCs`, (err) => {
				if (err) throw err;
				console.log("customVC dir created.");
			});
		};
		const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${newState.guild.id}/regData.json`))));
		// create new custom channel if rent-a-vd channel is used
		if (server.rentavcChannelID == newState.channelId) {
			const vcMember = newState.guild.members.cache.find(member => member.id == newState.id);
			const vcUser = client.users.cache.find(user => user.id == newState.id);
			const customVcChannelCat = newState.guild.channels.cache.find(channel => channel.id == server.rentavcChannelID).parentId;
			const newChannel = await newState.guild.channels.create(`🔊 ${vcUser.username}'s channel`, { type: "GUILD_VOICE", });
			await newChannel.setParent(customVcChannelCat);
			await newChannel.permissionOverwrites.create(vcUser.id, { MANAGE_CHANNELS: true });
			//move to channel
			vcMember.voice.setChannel(newChannel);
			//create new channels' .json file
			fs.writeFileSync(path.resolve(`data/server/${newState.guild.id}/customVCs/${newChannel.id}.json`), new customVC({ id: newChannel.id, owner: vcUser.username }).toString());
		} else {
			//check if custom-vc is empty, if so, delete channel and file
			let dir = fs.readdirSync(`./data/server/${oldState.guild.id}/customVCs`);
			for (const file of dir) {
				if ((file == `${oldState.channelId}.json`) && (oldState.channel.members.size == 0) && (oldState.channelId != null)) {
					oldState.channel.delete();
					fs.unlinkSync(`./data/server/${oldState.guild.id}/customVCs/${oldState.channelId}.json`);
				};
			};
		};
	};
});

client.login(token);