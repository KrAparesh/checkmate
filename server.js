const express = require('express');
const server = express();

server.all(`/`, (req, res) => {
    res.send(`Server is online!`);
});

function keepAlive() {
    server.listen(3000, () => {
        console.log(`Server is now ready and listening on port 3000! | ` + Date.now());
    });
}

module.exports = {keepAlive};