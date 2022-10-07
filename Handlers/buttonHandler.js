
async function loadButtons(client){
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Buttons", "Status");

    let buttonsArray = [];

    const Files = await loadFiles("Components");

    const{ buttons } = client;

    Files.forEach((file) => {
        const button = require(file);
        buttons.set(button.data.name, button);
    });
    
    return console.log("\nButtons Loaded.");

}

module.exports = {loadButtons};