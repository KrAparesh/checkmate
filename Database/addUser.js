const { InteractionCollector } = require("discord.js");
const { Member, memberSchema } = require("../index.js");

async function addUser(userData, interaction) {
    const newMember = new Member({
        date_registered: userData.date_registered,
        name: userData.name,
        regd_no: userData.regd_no,
        contact: userData.contact,
        email: userData.email,
        year: userData.year,
        discordUserName: userData.discordUserName,
        userId: userData.userId
    });

    Member.findOne({userId: userData.userId}, function(err, foundMember) {
        if(!foundMember){
            newMember.save(function(err){
                if(!err){
                    interaction.reply({
                        content: `:white_check_mark: You have been successfully registered!`,
                        ephemeral: true
                    });
                    
                    const giveRole = interaction.guild.roles.cache.get(process.env.UNALLOTED);
                    const takeRole = interaction.guild.roles.cache.get(process.env.UNVERIFIED);
                    interaction.member.roles.add(giveRole);
                    interaction.member.roles.remove(takeRole);
                } else {
                    interaction.reply({
                        content: `⚠ Some error occured ${err}`,
                        ephemeral: true
                    });
                }
            });        
        } else {
            interaction.reply({
                content: "⚠ Your account is already registered.",
                ephemeral: true
            });
        }
    });
}


module.exports = { addUser };