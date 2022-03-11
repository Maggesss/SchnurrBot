const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("urban")
		.setDescription("Select a phrase to look up.")
		.addStringOption(option => option
            .setName("search")
            .setDescription("Searchphrase")),
            
	async execute(interaction) {
        try {
            const term = interaction.options.getString("search");
            const query = new URLSearchParams({ term });

            const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
                .then(response => response.json());
            
                if (!list.length) {
                    return interaction.reply(`No results found for **${term}**.`);

                };

            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            const [answer] = list;

            const embed = new MessageEmbed()
            .setColor("#EFFF00")
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: "Definition", value: trim(answer.definition, 1024) },
                { name: "Example", value: trim(answer.example, 1024) },
                { name: "Rating", value: `| **${answer.thumbs_up}** :thumbsup: | **${answer.thumbs_down}** :thumbsdown: |` });
            return interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            };
	},
};