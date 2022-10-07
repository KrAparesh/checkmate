const { ChatInputCommandInteraction, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Creates the registration form."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {ButtonInteraction} test
     */
    execute(interaction){
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`registration-form`)
                    .setLabel(`Register`)
                    .setStyle(ButtonStyle.Primary)
            );
        interaction.reply({
            content: "Please click on the register button below to register yourself.",
            components: [row]
        });
    }
}