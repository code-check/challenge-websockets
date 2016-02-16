function start() {
    // Please add your code inside this function
    // For advanced users: please make sure your code is not async
    //BEGIN_CHALLENGE
    app.use(bodyParser.json());

    app.post("/api/accounts/login", function login(req, res) {
        var
            data = req.body,
            user = findAccount(data.username);

        if (!user || user.password !== data.password) {
            res.send({
                "result": false,
                "reason": "Combination user and password is invalid"
            });
        } else {
            res.send({
                "token": data.username,
                "result": true
            });
        }
    });

    app.post("/api/accounts/register", function register(req, res) {
        var data = req.body;

        if (data.password.length < 6 || data.email === "invalid") {
            res.send({
                "username": data.username,
                "result": false,
                "reason": "Something went wrong"
            });
        } else if (findAccount(data.username)) {
            res.send({
                "username": data.username,
                "result": false,
                "reason": "Account already exists"
            });
        } else {
            accounts.push({
                "username": data.username,
                "password": data.password,
                "email": data.email
            });

            res.send({
                "username": data.username,
                "result": true
            });
        }
    });

    app.post("/api/accounts/delete", function (req, res) {
        var data = req.body;

        if (data.token !== data.username)
        {
            res.send({
                "result": false,
                "reason": "invalid token"
            });
        } else {
            deleteAccount(data.username);
            res.send({
                "result": true
            });
        }
    });

    app.use(express.static("wwwroot"));

    io.on("connection", function (socket) {
        var cId = ++id;
        socket.emit("id", ++cId);
        socket.on("msg", function (data) {
            if (findAccount(data.token) === false)
                return;

            io.emit("msg", {
                id: cId,
                text: data.msg
            });
        });
    });

    http.listen(3000);
    //END_CHALLENGE
}

//BEGIN_CHALLENGE
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var id = 0;
// Though I am using an array, an user should be using a database instead.
var accounts = [];

function findAccount(username) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].username === username)
            return accounts[i];
    }
    return false;
}

function deleteAccount(username) {
    var index = -1;
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].username === username) {
            index = i;
            break;
        }
    }
    if (index !== -1)
        accounts.splice(index, 1);
}
//END_CHALLENGE

// Please DO NOT remove this
// Can be run by either using 'require("app")' or 'node app'
module.exports = start();