const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setnickname")
		.setDescription("Select the member to rename.")
		.addUserOption(option => option
            .setName("target")
            .setDescription("The member to rename")
            .setRequired(true))
        .addStringOption(option => option
            .setName("nickname")
            .setDescription("The new nickname")
            .setRequired(true)),
            
	async execute(interaction) {
        try {
            if (interaction.member.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME) || (functions.isHelper(interaction.user.id) == true)) {
                const user = interaction.options.getMember("target");
                const nickname = interaction.options.getString("nickname");
                interaction.guild.members.get(user.id).setNickname(nickname);
                return interaction.reply({ content: "Sucessfully renamed member.", ephemeral: true });

            } else { return interaction.reply("You don't have permissions to do that!") };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};