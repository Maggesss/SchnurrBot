const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nsfwaction")
		.setDescription("Do something, but lewd!")
		.addStringOption(option => option
            .setName("type")
            .setDescription("Select the type of your suggestion.")
            .setRequired(true)
            .addChoice("anal", "anal")
            .addChoice("blowjob", "blowjob")
            .addChoice("cum", "cum")
            .addChoice("fuck", "fuck")
            .addChoice("neko", "neko")
            .addChoice("pussylick", "pussylick")
            .addChoice("solo", "solo")
            .addChoice("threesome_ffm", "threesome_ffm")
            .addChoice("threesome_fff", "threesome_fff")
            .addChoice("threesome_mmf", "threesome_mmf"))
        .addUserOption(option => option
            .setName("target")
            .setDescription("The member of your choice")
            .setRequired(true)),

	async execute(interaction) {
		const term = await interaction.options.getString("type");
        const member = interaction.options.getMember("target");

        const url = `https://purrbot.site/api/img/nsfw/${term}/gif`
        const res = await fetch(url);
        const result = await res.json();
        const readyGif = `${result.link}`

        await interaction.reply(`${term} <@${member.user.id}>`);
        return interaction.channel.send(`${readyGif}`);
	}
};