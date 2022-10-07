const { InteractionCollector, ModalSubmitFields , EmbedBuilder} = require("discord.js");
const { Member, memberSchema } = require("../index.js");

async function getUser(mentionedUser, interaction){
    Member.findOne({userId: mentionedUser}, function(err, foundMember){
        if(!foundMember){
            interaction.reply({
                content: `The user is not registered.`,
                ephemeral: true
            });
        } else {
             const memberEmbed = new EmbedBuilder()
                .setColor("#083AA9")
                .setTitle(foundMember.name + " (" + foundMember.discordUserName + ")")
                .addFields(
                    { name: `Regd No` , value: `${foundMember.regd_no}` , inline: true},
                    { name: `Contact` , value: `${foundMember.contact}` , inline: true},
                    { name: `E-Mail` , value: `${foundMember.email}`},
                    { name: `Enrolled in year` , value: `${foundMember.year}`},
                    { name: `Registered On` , value: `${foundMember.date_registered}`},

                )
                .setThumbnail("https://imgur.com/GIMnL98.jpg")
            interaction.reply({
                embeds: [memberEmbed]
            });
        }
    })
}

module.exports = { getUser }