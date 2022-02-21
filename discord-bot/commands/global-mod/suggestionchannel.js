const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("path");
const Server = require("../../source/server/index");
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("suggestionchannel")
		.setDescription("Create a suggestion.")
		.addStringOption(option => option
            .setName("channel")
            .setDescription("Select the channel to log your suggestions. (Put channel ID)")
            .setRequired(true)),
            
	async execute(interaction) {
		const channel = interaction.options.getString("channel");
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            if (fs.existsSync(path.resolve(`./data/server/${interaction.guild.id}.json`))) {
                    fs.writeFileSync(path.resolve(`./data/server/${interaction.guild.id}.json`), new Server({ id: interaction.guild.id, suggestionChannelID: channel, name: interaction.guild.name}).toString());
                    return interaction.reply({ content: "Suggestionchannel set.", ephemeral: true });
            };
        } else { return interaction.reply("You don't have permissions to do that!")};
    },
};