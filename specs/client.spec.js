var
    assert = require("chai").assert,
    spec = require("api-first-spec"),
    endpoint = require("../endpoint.json"),
    registerAPI = require("./account/register.spec.js"),
    loginAPI = require("./account/login.spec.js"),
    deleteAPI = require("./account/delete.spec.js");

describe("Client", function () {
    var host = spec.host(endpoint.url);
    var client1, client2;

    before(function () {
        client1 = global.window1.client;
        client2 = global.window2.client;
        client1._receive = client1.receive;
        client2._receive = client2.receive;
    });

    function rand64() {
        // 64 bit random int, to prevent users from fixing values in the html
        var result = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
        result += Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
        return result;
    }

    it("must have working receive", function () {
        var rand = rand64();
        client2.receive({
            id: 0,
            text: rand
        });
        var text = client2.$msgField.text();
        assert.include(text, rand, "client.receive did not insert text");
    });

    it("must not receive without login", function (done) {
        var message = rand64();

        var once = true;
        var check = function () {
            if (!once) return;
            once = false;

            var text = client1.$msgField.text();
            try {
                assert.notInclude(text, message, "Message send by Client2 received by Client1 (without login)");
                done();
            } catch (ex) {
                done(ex);
            }
        };

        client1.receive = function (data) {
            client1._receive(data);
            check();
        };
        client2.receive = function (data) {
            client2._receive(data);
            setTimeout(check, 100);
        };
        client2.send(message);
        setTimeout(check, 1500);
    });

    it("must receive with login", function (done) {
        var loginData = {
            "username": "TestToken",
            "password": "123abc!",
            "email": "test@test.com"
        };
        var message = rand64();

        client1.receive = function (data) {
            client1._receive(data);
            var text = client1.$msgField.text();
            assert.include(text, message, "Message send by Client2 not received by Client1 (with login)");
            host.api(deleteAPI).params({
                "token": client2.token,
                "username": loginData.username
            }).success(function (data, res) {
                try {
                    done();
                } catch (ex) {
                    done(ex);
                }
            });
        };

        host.api(registerAPI)
            .params(loginData)
            .success(function (data, res) {
                assert.equal(data.result, true);
                host.api(loginAPI)
                    .params(loginData)
                    .success(function (data, res) {
                        client2.token = data.token;
                        client2.send(message);
                    });
            });
    });
});