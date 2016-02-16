"use strict";

var
    assert = require("chai").assert,
    spec = require("api-first-spec"),
    loginAPI = require("./login.spec.js"),
    registerAPI = require("./register.spec.js"),
    endpoint = require("../../endpoint.json");

var API = spec.define({
    "endpoint": "/api/accounts/delete",
    "method": "POST",
    "request": {
        "contentType": spec.ContentType.JSON,
        "params": {
            "token": "string"
        },
        "rules": {
            "token": {
                "required": true
            }
        }
    },
    "response": {
        "contentType": spec.ContentType.JSON,
        "data": {
            "result": "boolean",
            "reason": "string"
        },
        "rules": {
            "result": {
                "required": true
            },
            "reason": {
                "required": function (data) {
                    return !data.result;
                }
            }
        }
    }
});

var host = spec.host(endpoint.url);
describe("Delete", function () {
    it("can delete existing account", function (done) {
        var loginData = {
            "username": "TestDelete",
            "password": "123abc!",
            "email": "test@test.com"
        };
        host.api(registerAPI)
            .params(loginData)
            .success(function (data, res) {
                assert.equal(data.result, true);
                host.api(loginAPI)
                    .params(loginData)
                    .success(function (data, res) {
                        host.api(API).params({
                            "token": data.token,
                            "username": loginData.username
                        }).success(function (data, res) {
                            done();
                        });
                    });
            });
    });
});

after(function (done) {
    host.api(loginAPI).params({
        "username": "Test",
        "password": "123abc!"
    }).success(function (data, res) {
        host.api(API).params({
            "token": data.token,
            "username": "Test"
        }).success(function (data, res) {
            done();
        });
    });
});

after(function (done) {
    host.api(loginAPI).params({
        "username": "TestLogin",
        "password": "123abc!"
    }).success(function (data, res) {
        host.api(API).params({
            "token": data.token,
            "username": "TestLogin"
        }).success(function (data, res) {
            done();
        });
    });
});

module.exports = API;