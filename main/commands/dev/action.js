const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { tenorKey } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("action")
		.setDescription("Do something!")
		.addStringOption(option => option
            .setName("type")
            .setDescription("Select the type of your suggestion.")
            .setRequired(true)
            .addChoice("kiss", "kiss")
            .addChoice("kick", "kick")
            .addChoice("punsh", "punsh")
            .addChoice("bite", "bite")
            .addChoice("slap", "slap")
            .addChoice("hug", "hug")
            .addChoice("cry", "cry")
            .addChoice("poke", "poke")
            .addChoice("lick", "lick")
            .addChoice("fuck", "fuck"))
        .addUserOption(option => option
            .setName("target")
            .setDescription("The member of your choice")
            .setRequired(true)),

	async execute(interaction) {
		const term = await interaction.options.getString("type");
        const member = interaction.options.getMember("target");

        const url = `https://g.tenor.com/v1/search?q=anime_${term}&key=${tenorKey}&limit=10`
        const res = await fetch(url);
        const result = await res.json();
        const gif = Math.floor(Math.random() * result.results.length);
        const readyGif = `${result.results[gif].itemurl}.gif`
        console.log(readyGif)

        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setDescription(`${term} <@${member.user.id}>`)
            .setImage(readyGif);

        return interaction.reply({ embeds: [embed] });
	}
};