const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("clear up to 99 messages.")
		.addIntegerOption(option => option.setName("amount").setDescription("Number of messages to clear")),
		
	async execute(interaction) {
		const amount = interaction.options.getInteger("amount");
		try {
            if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || (interaction.user.id == "444460699025014784")) {
				if ((amount <= 1) || (amount > 100)) {
					return interaction.reply({ content: "You need to input a number between 1 and 99.", ephemeral: true });
				};
				await interaction.channel.bulkDelete(amount, true).catch(error => {
					console.error(error);
					interaction.reply({ content: "There was an error trying to clear messages in this channel!", ephemeral: true });
				});
				console.log(`${interaction.user.username} cleared: ${amount} messages on server: ${interaction.guild.name}`);
				return interaction.reply({ content: `Successfully cleared \`${amount}\` messages.`, ephemeral: true });
			} else { return interaction.reply("You don't have permissions to do that!") };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};