require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { keepAlive } = require('./server');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://"+process.env.DATABASE_USERNAME+":"+process.env.DATABASE_PASSWORD+"@checkmate.jxez3gq.mongodb.net/"+process.env.DATABASE_NAME);

const memberSchema = {
    date_registered: String,
    name: String,
    regd_no: String,
    contact: String,
    email: String,
    year: String,
    discordUserName: String,
    userId: String
}

const Member = mongoose.model("Member", memberSchema);

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages], 
    partials: [User, Message, GuildMember, ThreadMember]
});

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

const { loadEvents } = require("./Handlers/eventHandlers");
loadEvents(client);

const { loadButtons } = require("./Handlers/buttonHandler")
loadButtons(client);


client.login(process.env.BOT_TOKEN).then(() => {
    //console.log(`Bot has logged in as ${client.user.username}`);
    client.user.setPresence({
        activities: [{ name: `${client.guilds.cache.size} guilds`, type: ActivityType.Watching}]
    });
    //client.user.setActivity(`with ${client.guilds.cache.size} guilds`, {type: `Watching`});
}).catch((err)=>console.log(err));

keepAlive();
module.exports = {memberSchema, Member};