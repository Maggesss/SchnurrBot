const { SlashCommandBuilder } = require("@discordjs/builders");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resetregdata")
		.setDescription("Resets regdata file to standart statements.")
		.addStringOption(option => option
            .setName("target")
            .setDescription("The server to reset regdata")
            .setRequired(true)),
            
	async execute(interaction) {
        try {
            if (functions.isHelper(interaction.user.id) == true) {
                const guildId = interaction.options.getString("target");
                const guild = interaction.client.guilds.cache.get(guildId);
                console.log(`Reset regdata: ${guild.name}`)
                fs.writeFileSync(path.resolve(`../data/server/${interaction.guild.id}/regData.json`), new Server({ id: guild.id, name: guild.name }).toString());
                return interaction.reply({ content: `Reset regdata: ${guild.name}`, ephemeral: true })
            } else { return interaction.reply({ content: `You don't have permissions to do that!`, ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};