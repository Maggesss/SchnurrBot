const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("../config.json");
const { Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const commands = [];
const commandFolders = fs.readdirSync("./commands");

for (const dir of commandFolders) {
	if (dir.startsWith("global") == true) {
		const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));

		for (const file of commandFiles) {
			const command = require(`./commands/${dir}/${file}`);
		commands.push(command.data.toJSON());
		};
	};
};

client.login(token);
const rest = new REST({ version: "9" }).setToken(token);

client.once("ready", () => {
	const guilds = client.guilds.cache.map(guild => `${guild.id}`);

	for (const x of guilds) {
		rest.put(Routes.applicationGuildCommands(clientId, x), { body: commands })
			.then(() => console.log(`Successfully registered application commands for guildID: ${x}`))
			.catch(console.error);
	}
	client.destroy();
});