const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("createrole")
		.setDescription("Creates an bothelper role."),

	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                interaction.guild.roles.create({
                    name: "SchnurrBot Supervisor",
                    color: "DARKER_GREY",
                    hoist: false,
                    permissions: "ADMINISTRATOR",
                    mentionable: true,
                }).then(role => interaction.reply({ content: `Successfully created role with the id: \`\`${role.id}\`\``, ephemeral: true }));
                return;
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	}
};