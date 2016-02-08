var assert = require("chai").assert;

describe("Client", function () {
    function rand64() {
        // 64 bit random int, to prevent users from fixing values in the html
        var result = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
        result += Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
        return result;
    }

    it("must have working receive", function () {
        var rand = rand64();
        var client = global.window2.client;
        client.receive({
            id: 0,
            text: rand
        });
        var text = client.$msgField.text();
        assert.include(text, rand, "client.receive did not insert text");
    });

    it("must receive message", function (done) {
        var message = rand64();
        var client1 = global.window1.client;
        var client2 = global.window2.client;
        
        client1._receive = client1.receive;
        client1.receive = function (data) {
            client1._receive(data);
            var text = client1.$msgField.text();
            assert.include(text, message, "Message send by Client2 not received by Client1");
            done();
        };
        client2.send(message);
    });
});