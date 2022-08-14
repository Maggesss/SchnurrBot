const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription("Get some random joke!"),

	async execute(interaction) {
		try {
			const url = `https://some-random-api.ml/joke`
			const res = await fetch(url);
			const result = await res.json();
			return interaction.reply(result.joke);
		} catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};