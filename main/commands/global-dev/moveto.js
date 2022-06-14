const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("moveto")
		.setDescription("Move yourself to open or for you hidden channels.")
        .addStringOption(option => option
            .setName("channel")
            .setDescription("The channel-id to move to.")
            .setRequired(true)),

	async execute(interaction) {
        try {
            const movetoChannel = interaction.options.getString("channel")
            if (!functions.isInt(movetoChannel)) { return interaction.reply(`${movetoChannel} is not an integer (!)`)}
            if (functions.isHelper(interaction.user.id) == true) {
                interaction.member.voice.setChannel(movetoChannel)
                return interaction.reply({ content: `Successfully moved to channel.`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};