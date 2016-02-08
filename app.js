function start() {
    // Please add your code inside this function
    // For advanced users: please make sure your code is not async
    //BEGIN_CHALLENGE
    var express = require("express");
    var app = express();
    var http = require("http").Server(app);
    var io = require("socket.io")(http);
    var id = 0;

    app.use(express.static("wwwroot"));

    io.on("connection", function (socket) {
        var cId = ++id;
        socket.emit("id", ++cId);
        socket.on("msg", function (msg) {
            io.emit("msg", {
                id: cId,
                text: msg
            });
        });
    });

    http.listen(3000);
    //END_CHALLENGE
}

// Please DO NOT remove this
// Can be run by either using 'require("app")' or 'node app'
module.exports = start();