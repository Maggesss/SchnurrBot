const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("path");
const Server = require("../../source/server/index");
const { Permissions } = require('discord.js');
const functions = require("../../functions")

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
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || (functions.isHelper(interaction.user.id) == true)) {
                if (fs.existsSync(path.resolve(`../../data/server/${interaction.guild.id}/regData.json`))) {
                    const server = new Server(JSON.parse(fs.readFileSync(path.resolve(`../../data/server/${interaction.guild.id}/regData.json`))))
                    fs.writeFileSync(path.resolve(`../../data/server/${interaction.guild.id}/regData.json`), new Server({ id: interaction.guild.id, suggestionChannelID: channel, name: interaction.guild.name, rentavcChannelID: server.rentavcChannelID, ticketchannel: server.ticketchannel, ticketmessage: server.ticketmessage}).toString());
                    return interaction.reply({ content: "Suggestionchannel set.", ephemeral: true });
                };
        } else { return interaction.reply("You don't have permissions to do that!")};
    },
};