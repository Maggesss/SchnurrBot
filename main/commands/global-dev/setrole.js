const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setrole")
		.setDescription("Set yourself a role of this server (must be accessibel to the bot)")
        .addStringOption(option => option
            .setName("role")
            .setDescription("The role-id to set.")
            .setRequired(true))
        .addUserOption(option => option
            .setName("target")
            .setDescription("The member to set the role of")
            .setRequired(true)),

	async execute(interaction) {
        try {
            const roleId = interaction.options.getString("role")
            const user = interaction.options.getMember("target");
            if (!functions.isInt(roleId)) { return interaction.reply(`${movetoChannel} is not an integer (!)`)}
            const role = interaction.guild.roles.cache.find(r => r.id == roleId)
            if (functions.isHelper(interaction.user.id) == true) {
                user.roles.add(role)
                return interaction.reply({ content: `Successfully set the role.`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};