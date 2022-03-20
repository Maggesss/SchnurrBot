const fs = require("fs");
const { token } = require("./config.json");
const { Client, Collection, MessageEmbed, Permissions} = require("discord.js");
const path = require("path");
const User = require("./source/user/index");
const Server = require("./source/server/index");
const customVC = require("./source/server/rentavc/index")
const functions = require("./functions.js");

//Random responses
const respWordlist= ["Hi :D",
					"Huh?",
					"What's up, man?",
					":3",
					"Who dares to ping me!? :rage:"]

//Setup & load commands
const client = new Client({ intents: ["GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"], partials: ["CHANNEL"]});

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
		counter += 1;
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
			console.log("ServerDir created.");
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
			console.log("ServerDir created.");
		});
		fs.writeFileSync(path.resolve(`./data/server/${message.guild.id}/regData.json`), new Server({ id: message.guild.id, name: message.guild.name }).toString());
	};
	//create userfile => no more afk
	fs.writeFileSync(path.resolve(`./data/user/${message.author.id}.json`), new User({ id: message.author.id, name: message.author.tag }).toString());
});

client.on("channelDelete", (action) => {
	if (fs.existsSync(path.resolve(`./data/server/${action.guild.id}/regData.json`))) {
		const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${action.guild.id}/regData.json`))));
		//Check rent-a-vc channel
		if (server.rentavcChannelID == action.id) {
			fs.writeFileSync(path.resolve(`./data/server/${action.guild.id}/regData.json`), new Server({ id: action.guild.id, name: action.guild.name, suggestionChannelID: server.suggestionChannelID}).toString());
			client.channels.fetch("950064195464986725").then((channel) => {
				channel.send(`rent-a-vc channel deleted on server: \`\`${action.guild.name}\`\``)
				return;
			});
		} else { return };
	};
});

client.on("voiceStateUpdate", async function (oldState, newState) {
	if (fs.existsSync(path.resolve(`./data/server/${newState.guild.id}/regData.json`))) {
		if (!fs.existsSync(path.resolve(`./data/server/${newState.guild.id}/customVCs`))) {
			fs.mkdir(`./data/server/${newState.guild.id}/customVCs`, (err) => {
				if (err) throw err;
				console.log("customVC dir created.");
			});
		};
		const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${newState.guild.id}/regData.json`))));
		// create new custom channel
		if (server.rentavcChannelID == newState.channelId) {
			const vcMember = newState.guild.members.cache.find(member => member.id == newState.id)
			const vcUser = client.users.cache.find(user => user.id == newState.id)
			const customVcChannelCat = newState.guild.channels.cache.find(channel => channel.id == server.rentavcChannelID).parentId;
			const newChannel = await newState.guild.channels.create(`🔊 ${vcUser.username}'s channel`, {
				type: "GUILD_VOICE",
				permissionOverwrites: [{
					id: newState.id,
					allow: [Permissions.FLAGS.MANAGE_CHANNELS],
				}],
			});
			newChannel.setParent(customVcChannelCat);
			//move to channel
			vcMember.voice.setChannel(newChannel);
			//create new channels' .json file
			fs.writeFileSync(path.resolve(`data/server/${newState.guild.id}/customVCs/${newChannel.id}.json`), new customVC({ id: newChannel.id, owner: vcUser.username }).toString());
		} else {
			let dir = fs.readdirSync(`./data/server/${oldState.guild.id}/customVCs`);
			for (const file of dir) {
				if ((file == `${oldState.channelId}.json`) && (oldState.channel.members.size == 0) && (oldState.channelId != null)) {
					oldState.channel.delete()
					fs.unlinkSync(`./data/server/${oldState.guild.id}/customVCs/${oldState.channelId}.json`)
				};
			};
		};
	};
});

client.login(token);