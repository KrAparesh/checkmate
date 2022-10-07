const { loadButtons } = require("../../Handlers/buttonHandler");
const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("The Client is now ready");
        loadCommands(client);
        loadButtons(client);
    }
}
