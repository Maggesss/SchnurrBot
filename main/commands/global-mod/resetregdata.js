const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resetregdata")
		.setDescription("Resets regdata file to standart statements."),
            
	async execute(interaction) {
        try {
            if ((functions.isHelper(interaction.user.id) == true) || (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))) {
                console.log(`Reset regdata: ${interaction.guild.name}`)
                fs.writeFileSync(path.resolve(`../data/server/${interaction.guild.id}/regData.json`), new Server({ id: interaction.guild.id, name: interaction.guild.name }).toString());
                return interaction.reply({ content: `Reset regdata: ${interaction.guild.name}`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};