const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { tenorKey } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription("Get some random joke!"),

	async execute(interaction) {
		const term = await interaction.options.getString("type");
        const member = interaction.options.getMember("target");

        const url = `https://some-random-api.ml/joke`
        const res = await fetch(url);
        const result = await res.json();

        return interaction.reply(result);
	}
};