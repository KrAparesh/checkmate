const { ChatInputCommandInteraction, InteractionType, ModalSubmitFields } = require("discord.js");
const { addUser } = require("../../../Database/addUser");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({
                content: "This command is no longer supported",
                ephemeral: true
            });

            // if (command.developer && interaction.member._roles !== process.env.DEVELOPER_ROLE)
            //     return interaction.reply({ content: `This command is reserved for developers only!`, ephemeral: true });

            if (command.developer){
                var isDeveloper = interaction.member._roles.find((role) => {
                    return role == process.env.DEVELOPER_ROLE
                });
                if(isDeveloper !== process.env.DEVELOPER_ROLE)
                return interaction.reply({ content: `This command is reserved for developers only!`, ephemeral: true });
            }

            command.execute(interaction, client);
        } else if(interaction.isButton()){
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if(!button) return new Error("There is no code for this button.");

            try{
                button.execute(interaction, client);
            } catch (err) {
                console.err(err);
            }
        } else if(interaction.type == InteractionType.ModalSubmit){
            const regDate = new Date().toLocaleDateString('en-US', {day: '2-digit', month:'2-digit', year:'numeric'});
            userData = {
                date_registered: regDate,
                name: interaction.fields.getTextInputValue('nameInput'),
                regd_no: interaction.fields.getTextInputValue('regdInput'),
                contact: interaction.fields.getTextInputValue('contactInput'),
                email: interaction.fields.getTextInputValue('emailInput'),
                year: interaction.fields.getTextInputValue('yearInput'),
                discordUserName: interaction.user.username + "#" + interaction.user.discriminator,
                userId: interaction.user.id
            }
            addUser(userData, interaction);
        }
    }
}
