const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

Http.listen(3000, () => {
    console.log("Listening at :3000...");
});

const markers = [];

Socketio.on("connection", socket => {
    socket.emit(markers);
    socket.on("marker", data => {
        markers.push(data);
        Socketio.emit("marker", data);
    });
});

