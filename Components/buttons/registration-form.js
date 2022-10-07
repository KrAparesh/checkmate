const { loadButtons } = require("../../Handlers/buttonHandler");
const { ModalBuilder, ActionRowBuilder, TextInputStyle, TextInputBuilder } = require("discord.js");


module.exports = {
    data: {
        name: `registration-form`
    },
    execute(interaction){
        const modal = new ModalBuilder()
        .setCustomId('checkmateModal')
        .setTitle('Registration Form')

    const nameInput = new TextInputBuilder()
        .setCustomId('nameInput')
        .setLabel('Full Name:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const regdInput = new TextInputBuilder()
        .setCustomId('regdInput')
        .setLabel('Registration Number:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const emailInput = new TextInputBuilder()
        .setCustomId('emailInput')
        .setLabel('Email Id:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    
    const contactInput = new TextInputBuilder()
        .setCustomId('contactInput')
        .setLabel('Contact Info:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const yearInput = new TextInputBuilder()
        .setCustomId('yearInput')
        .setLabel('Current Year:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder("1/2/3/4");


    const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(regdInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(emailInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(contactInput);
    const fifthActionRow = new ActionRowBuilder().addComponents(yearInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

    interaction.showModal(modal);
    }
}