const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Select a member and kick them.")
		.addUserOption(option => option
            .setName("target")
            .setDescription("The member to kick")
            .setRequired(true)),
            
	async execute(interaction) {
        try {
            if (interaction.client.permissions.has(Permissions.FLAGS.KICK_MEMBERS) || (interaction.user.id == "444460699025014784")) {
                const user = interaction.options.getMember("target");
                await user.kick()
                console.log(`${interaction.member.username} kicked: ${user.username} on server: ${interaction.guild.name}`)
		        return interaction.reply({ content: `You kicked: ${user.username}`, ephemeral: true })}
            else {
                return interaction.reply("You don't have permissions to do that!")
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
	},
};