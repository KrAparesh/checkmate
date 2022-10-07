const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, User, Role, Guild } = require('discord.js');
const { Client } = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("allot")
        .setDescription("Allot a role to a member")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption(option => option.setName('role').setDescription('The role'))
        .addUserOption(option => option.setName('target').setDescription('The user')),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client 
     */

    execute(interaction){
        const mentionedUser = interaction.options.getMember('target');
        const mentionedRole = interaction.options.getRole('role');

        mentionedUser.roles.add(mentionedRole);
        var isUnalloted = interaction.options.getMember('target')._roles.find((role) => {
            if(role === process.env.UNALLOTED){
                mentionedUser.roles.remove(role)
            }
        });
        interaction.reply({
            content: `Successfully allotted the role to ${mentionedUser}`
        });
    }
}
