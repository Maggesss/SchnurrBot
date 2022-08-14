const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("path");
const fs = require("fs");
const Birthday = require("../../source/server/birthday/index");
const functions = require("../../functions")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getbirthday")
		.setDescription("Setup a birthday message for you!")
        .addStringOption(option => option
            .setName("day")
            .setDescription("Select the day of your birthday.")
            .setRequired(true))
        .addStringOption(option => option
            .setName("month")
            .setDescription("Select the month of your birthday.")
            .setRequired(true)),

    async execute(interaction) {
        try {
            const day = interaction.options.getString("day");
            const month = interaction.options.getString("month");

            if (fs.existsSync(path.resolve(`./data/server/${interaction.guild.id}/birthdays/`))) {
                if (!fs.existsSync(path.resolve(`./data/server/${interaction.guild.id}/birthdays/${interaction.user.id}`))) {
                    if (!(Number.isInteger(day) && Number.isInteger(month))) { return interaction.reply({ content: `Your input isn't right!.`, ephemeral: true }) }
                    if (!(day > 0) && (month > 0)) { return interaction.reply({ content: `Your input isn't right!.`, ephemeral: true }) }
                    if (!(day <= 31) && (month <= 12 )) { return interaction.reply({ content: `Your input isn't right!.`, ephemeral: true }) }
                    if ((month == 2) && (day > 28)) { return interaction.reply({ content: `February doesn't have more than 28 Days.`, ephemeral: true }) }
                    if (((month % 2) === 0 ) && (day > 30)) { return interaction.reply({ content: `Whoops, this Month has only 30 days!`, ephemeral: true }) }

                    fs.writeFileSync(path.resolve(`./data/server/${interaction.guild.id}/regData.json`), new Birthday({ userid: interaction.user.id, name: interaction.user.username, day: day, month: month }).toString());
                    
                        return interaction.reply({ content: `Birthday created.`, ephemeral: true });

                } else { return interaction.reply({ content: `There is already a birthday for you! Delete it first!`, ephemeral: true })};
            };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};