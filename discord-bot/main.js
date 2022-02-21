const fs = require("fs");
const { token } = require("./config.json");
const { Client, Collection, MessageEmbed} = require("discord.js");
const path = require("path");
const User = require("./source/user/index");
const Server = require("./source/server/index");

const client = new Client({ intents: ["GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["CHANNEL"]});

client.commands = new Collection();

const commandFolders = fs.readdirSync("./commands");

for (const dir of commandFolders){

	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.data.name, command);
	};
};

client.once("ready", () => {
	let counter = 0
	console.log("Ready!");
    const guilds = client.guilds.cache.map(guild => `${guild.id}: ${guild.name}`);
    console.log(guilds);
	for (x in guilds) {
		counter = counter + 1;
	};
	console.log(`\nBot is currently in ${counter} guilds.\n`);
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;

	if(!fs.existsSync(path.resolve(`./data/user/${interaction.user.id}.json`))) {
		fs.writeFileSync(path.resolve(`./data/user/${interaction.user.id}.json`), new User({ id: interaction.user.id, name: interaction.user.tag }).toString());
	}
	if(!fs.existsSync(path.resolve(`./data/server/${interaction.guild.id}.json`))) {
		fs.writeFileSync(path.resolve(`./data/server/${interaction.guild.id}.json`), new Server({ id: interaction.guild.id, name: interaction.guild.name }).toString());
	}

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	};
});

client.on('messageCreate', (message) => {

    if (message.author.bot) {return};

    const attachment = message.attachments.first();

    if (message.channel.type === 'DM') {
		fs.writeFileSync(path.resolve(`./data/user/${message.author.id}.json`), new User({ id: message.author.id, name: message.author.tag }).toString());
        const dmLogEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.tag} dmed the bot and said: `)
            .setDescription(message.content)
            .setFooter({ text: `User's id: ${message.author.id}` });

        if (message.attachments.size !== 0) {
            dmLogEmbed.setImage(attachment.url);
        }
        client.channels.fetch("936549224898764800").then((channel) => {
            return channel.send({ embeds: [dmLogEmbed] });
        });
    }
	else if (message.mentions.members.first()) {
		fs.writeFileSync(path.resolve(`./data/user/${message.author.id}.json`), new User({ id: message.author.id, name: message.author.tag }).toString());
		if(fs.existsSync(path.resolve(`./data/user/${message.mentions.members.first().id}.json`))) { const user = new User(JSON.parse(fs.readFileSync(path.resolve(`./data/user/${message.mentions.members.first().id}.json`)))); 
			if (user.afk == true) {
				return message.channel.send(`This user is currently AFK because of: ${user.reason} There is no point in mentioning them...`)
			}
		}
	}
	else if(!fs.existsSync(path.resolve(`./data/server/${message.guild.id}.json`))) {
		fs.writeFileSync(path.resolve(`./data/server/${message.guild.id}.json`), new Server({ id: message.guild.id, name: message.guild.name }).toString());
	}
	fs.writeFileSync(path.resolve(`./data/user/${message.author.id}.json`), new User({ id: message.author.id, name: message.author.tag }).toString());
});

client.login(token);