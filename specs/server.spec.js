var assert = require("chai").assert;

describe("Check scripts", function () {
    it("must have jQuery defined", function () {
        assert.isDefined(global.window1.$);
        assert.isDefined(global.window2.$);
    });

    it("must have the connect function defined", function () {
        assert.isFunction(global.window1.client.connect, "Please do not remove the connect function");
    });

    it("must have the send function defined", function () {
        assert.isFunction(global.window1.client.send, "Please do not remove the send function");
    });

    it("must have the receive function defined", function () {
        assert.isFunction(global.window1.client.receive, "Please do not remove the receive function");
    });

    it("must have the receive token defined", function () {
        assert.isDefined(global.window1.client.token, "Please do not remove the token variable");
    });
});