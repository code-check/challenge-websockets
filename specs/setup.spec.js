var assert = require("chai").assert,
    jsdom = require("jsdom"),
    endpoint = require("../endpoint.json").url;

before(function (done) {
    this.timeout(1e4); // 10s
    global.app = require("../app");
    Client1(function () {
        Client2(done);
    });
});

function Client1(done) {
    jsdom.env({
        url: endpoint,
        features: {
            FetchExternalResources: ["script"],
            ProcessExternalResources: ["script"]
        },
        created: function (errors, window) {
            if (errors) return;
            // Polyfills
            window.console.log = console.log;
            window.addEventListener("error", function (event) {
                console.error("script error: %s @ %s:%s", event.message, event.filename, event.lineno);
            });
        },
        done: function (errors, window) {
            assert.isNull(errors);
            global.window1 = window;
            done();
        }
    });
}

function Client2(done) {
    jsdom.env({
        url: endpoint,
        features: {
            FetchExternalResources: ["script"],
            ProcessExternalResources: ["script"]
        },
        created: function (errors, window) {
            if (errors) return;
            // Polyfills
            window.console.log = console.log;
            window.addEventListener("error", function (event) {
                console.error("script error: %s @ %s:%s", event.message, event.filename, event.lineno);
            });
        },
        done: function (errors, window) {
            assert.isNull(errors);
            global.window2 = window;
            done();
        }
    });
}