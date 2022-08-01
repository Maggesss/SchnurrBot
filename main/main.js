const fs = require("fs");
const { token, clientId } = require("./config.json");
const { Client, Collection, MessageEmbed, Permissions } = require("discord.js");
const path = require("path");
const User = require("./source/user/index");
const Server = require("./source/server/index");
const customVC = require("./source/server/rentavc/index");
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
const client = new Client({ intents: ["GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"], partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

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

//list guilds, set status
client.once("ready", () => {
	let counter = 0;
    const guilds = client.guilds.cache.map(guild => `\n${guild.id}: ${guild.name}`);
	for (x in guilds) {
		counter += 1;
	};
	client.channels.fetch("957431154158489670").then((channel) => {
		channel.send(`Ready!\n${guilds}\n\nBot is currently in ${counter} guilds.\n`)
	});
	client.user.setPresence({ activities: [{ name: ` on ${counter} guilds. ` }], status: `online` });
});

//command listener
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

	if (!fs.existsSync(`./data/server/${interaction.guild.id}/birthdays`)) {
		fs.mkdir(`./data/server/${interaction.guild.id}/birthdays`, (err) => {
			if (err) throw err;
		});
	};

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	
	try {
		await command.execute(interaction);
	} catch (error) {
		client.channels.fetch("986281919429902408").then((channel) => {
			channel.send(error)
		});
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
			.then(() => 
			client.channels.fetch("950064195464986725").then((channel) => {
				channel.send(`Successfully registered standart application commands for guild: \`\`${guild.name}\`\``)
			.catch(console.error)}))

	//create server folder if not already exists
	if (!fs.existsSync(`./data/server/${guild.id}`)) {
		fs.mkdir(`./data/server/${guild.id}`, (err) => {
			if (err) throw err;
		});
		fs.writeFileSync(path.resolve(`./data/server/${guild.id}/regData.json`), new Server({ id: guild.id, name: guild.name }).toString());
	};
	//update status
	let counter = 0;
    const guilds = client.guilds.cache.map(guild => `\n${guild.id}: ${guild.name}`);
	for (x in guilds) {
		counter += 1;
	};
	client.user.setPresence({ activities: [{ name: ` on ${counter} guilds. ` }], status: `online` });
});

//listen to channel deletions
client.on("channelDelete", async function (action) {
	if (fs.existsSync(path.resolve(`./data/server/${action.guild.id}/regData.json`))) {
		const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${action.guild.id}/regData.json`))));
		//Check rent-a-vc channel
		if (server.rentavcChannelID == action.id) {
			fs.writeFileSync(path.resolve(`./data/server/${action.guild.id}/regData.json`), new Server({ id: action.guild.id, name: action.guild.name, suggestionChannelID: server.suggestionChannelID, ticketchannel: server.ticketchannel, ticketmessage: server.ticketmessage}).toString());
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
			});
		};
		const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${newState.guild.id}/regData.json`))));
		// create new custom channel if rent-a-vc channel is used
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

//check reaction updates
client.on("messageReactionAdd", async function (reaction, user) {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		};
	};
	if (!fs.existsSync(path.resolve(`./data/server/${reaction.message.guildId}/regData.json`))) { return; };

	const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`./data/server/${reaction.message.guildId}/regData.json`))));
	if ((reaction.message.channelId == server.ticketchannel) && (reaction.message.id == server.ticketmessage) && (!(user.id == client.user.id))) {
		const ticketChannelCat = reaction.message.guild.channels.cache.find(channel => channel.id == server.ticketchannel).parentId;

		const newTicket = await reaction.message.guild.channels.create(`${user.username}'s ticket`, {
			type: 'GUILD_TEXT',
			permissionOverwrites: [
				{
					id: reaction.message.guildId,
					deny: [Permissions.FLAGS.VIEW_CHANNEL],
				},
				{
					id: user.id,
					allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ATTACH_FILES, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY],
				},
			],
			parent: ticketChannelCat,
		});

		await reaction.message.guild.members.fetch().then((members) =>
			members.forEach((member) => { if ((!(member.user.bot)) && member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && (!(member.user.id == user.id))) {
				newTicket.permissionOverwrites.create(member.user.id, { VIEW_CHANNEL: true, MANAGE_CHANNELS: true});
			}}),
		);
		reaction.users.remove(user.id);

		client.channels.fetch("950064195464986725").then((channel) => {
			channel.send(`\`\`${user.username}\`\` created a ticket on server: \`\`${reaction.message.guild.name}\`\``);
			return;
		});
	};
});

client.login(token);