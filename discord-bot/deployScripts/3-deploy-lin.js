const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("../config.json");

const commands = [];
const commandFolders = fs.readdirSync("../commands");

for (const dir of commandFolders) {
	if ((dir.startsWith("glob") == true) || (dir.startsWith("lin") == true)) {
		const commandFiles = fs.readdirSync(`../commands/${dir}`).filter(file => file.endsWith(".js"));

		for (const file of commandFiles) {
			const command = require(`../commands/${dir}/${file}`);
		commands.push(command.data.toJSON());
		};
	};
};

const rest = new REST({ version: "9" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, "916032338633297950"), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);