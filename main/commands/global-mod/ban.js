const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const functions = require("../../functions")

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
            if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || (functions.isHelper(interaction.user.id) == true)) {
                const user = interaction.options.getMember("target");
                const deleteDays = interaction.options.getNumber("days")
                const banreason = interaction.options.getString("banreason")

                interaction.client.channels.fetch("950064195464986725").then((channel) => {
                    interaction.reply({ content: `You banned: \`\`${user.username}\`\``, ephemeral: true })
                    channel.send(`\`\`${interaction.user.username}\`\` banned: \`\`${user.user.username}\`\` on server: \`\`${interaction.guild.name}\`\``)
                    return user.ban({ days: deleteDays, reason: banreason })
                });
            } else { return interaction.reply("You don't have permissions to do that!") }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};