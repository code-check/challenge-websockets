function Client() {
    this.id = 0;
    this.connect = function connect() {
        // Code to connect a client here
        //BEGIN_CHALLENGE
        if (!this.socket)
            this.socket = io();
        var client = this;
        this.socket.on("id", function (msg) {
            var text = client.$title.text();
            text += " (" + msg + ')';
            client.$title.text(text);
            client.id = msg;
        });
        this.socket.on("msg", function (msg) {
            client.receive(msg);
        });
        //END_CHALLENGE
    };
    this.send = function send(data) {
        // Code to send data here
        //BEGIN_CHALLENGE
        if (data)
            this.socket.emit("msg", data);
        //END_CHALLENGE
    };
    this.receive = function receive(data) {
        // Code for receiving data can be placed here
        //BEGIN_CHALLENGE
        var $msg = $("<p>", {
            "class": "message"
        }).html("[" + moment().format("hh:mm:ss") + "]: " + data.id + " > " + data.text);
        this.$msgField.prepend($msg);
        //END_CHALLENGE
    };
}