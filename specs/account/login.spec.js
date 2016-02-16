"use strict";

var
    assert = require("chai").assert,
    spec = require("api-first-spec"),
    endpoint = require("../../endpoint.json"),
    registerAPI = require("./register.spec.js");

var API = spec.define({
    "endpoint": "/api/accounts/login",
    "method": "POST",
    "request": {
        "contentType": spec.ContentType.JSON,
        "params": {
            "username": "string",
            "password": "string"
        },
        "rules": {
            "username": {
                "required": true
            },
            "password": {
                "required": true
            }
        }
    },
    "response": {
        "contentType": spec.ContentType.JSON,
        "data": {
            "token": "string",
            "result": "boolean",
            "reason": "string"
        },
        "rules": {
            "token": {
                "required": function (data) {
                    return data.result;
                }
            },
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

describe("Login", function () {
    var host = spec.host(endpoint.url);

    before(function (done) {
        host.api(registerAPI).params({
            "username": "TestLogin",
            "password": "123abc!",
            "email": "test@test.com"
        }).success(function (data, res) {
            done();
        });
    });

    it("unregistered account", function (done) {
        host.api(API).params({
            "username": "invalid",
            "password": "invalid"
        }).success(function (data, res) {
            assert.equal(data.result, false);
            done();
        });
    });

    it("invalid password", function (done) {
        host.api(API).params({
            "username": "TestLogin",
            "password": "invalid"
        }).success(function (data, res) {
            assert.equal(data.result, false);
            done();
        });
    });

    it("success", function (done) {
        host.api(API).params({
            "username": "TestLogin",
            "password": "123abc!"
        }).success(function (data, res) {
            assert.equal(data.result, true);
            done();
        });
    });
});

module.exports = API;

