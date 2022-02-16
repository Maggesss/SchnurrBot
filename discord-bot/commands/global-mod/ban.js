const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Select a member and ban them.")
		.addUserOption(option => option
            .setName("target")
            .setDescription("The member to ban")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("days")
            .setDescription("The days where messages schould be deleted")
            .setRequired(true))
        .addStringOption(option => option
            .setName("banreason")
            .setDescription("The banreason")
            .setRequired(true)),
            
    async execute(interaction) {
        try {
            if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || (interaction.user.id == "444460699025014784")) {
                const user = interaction.options.getMember("target");
                const deleteDays = interaction.options.getNumber("days")
                const banreason = interaction.options.getString("banreason")
                await user.ban({ days: deleteDays, reason: banreason })
                console.log(`${interaction.member} banned: ${user.username} on server: ${interaction.guild.name}`)
                return interaction.reply({ content: `You banned: ${user.username}`, ephemeral: true })}
            else {
                return interaction.reply("You don't have permissions to do that!")
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
	},
};