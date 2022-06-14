const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { tenorKey } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("lin")
		.setDescription("Boobs."),

	async execute(interaction) {
        try {
            const url = `https://g.tenor.com/v1/search?q=anime%20boobs&key=${tenorKey}&limit=10`;
            const res = await fetch(url);
            const result = await res.json();
            const gif = Math.floor(Math.random() * result.results.lenth);
            const readyGif = `${result.results[gif].url}` ;
            return interaction.reply({ content: `${readyGif}`, ephemeral: false });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};