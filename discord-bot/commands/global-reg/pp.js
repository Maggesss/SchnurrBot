const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions.js");

function randomPP() {
    let x = functions.getRandomIntInclusive(1, 10);
    let pp = "=".repeat(x);
    return(`8${pp}D`)};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pp")
		.setDescription("Replies your pp lengh!"),
		
	async execute(interaction) {
		await interaction.reply(randomPP());
	},
};