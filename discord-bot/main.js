const fs = require("fs");
const { token } = require("./config.json");
const { Client, Collection, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.commands = new Collection();

const commandFolders = fs.readdirSync("./commands")

for (const dir of commandFolders){

	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.data.name, command);
	}
}

client.once("ready", () => {
	console.log("Ready!");
    const Guilds = client.guilds.cache.map(guild => `${guild.id}: ${guild.name}`);
    console.log(Guilds);
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});

client.login(token);