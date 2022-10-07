const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, User, Role } = require('discord.js');
const { Client } = require('discord.js');
const { getUser } = require("../../Database/getUser");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("View information about a member")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option.setName('target').setDescription('The user')),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client 
     */

    execute(interaction){
        const mentionedUser = interaction.options.getUser('target').id;
        //console.log(mentionedUser);
        getUser(mentionedUser, interaction)
    }
}

