"use strict";

var
    assert = require("chai").assert,
    spec = require("api-first-spec"),
    endpoint = require("../../endpoint.json");

var API = spec.define({
    "endpoint": "/api/accounts/register",
    "method": "POST",
    "request": {
        "contentType": spec.ContentType.JSON,
        "params": {
            "username": "string",
            "password": "string",
            "email": "string"
        },
        "rules": {
            "username": {
                "required": true
            },
            "password": {
                "required": true
            },
            "email": {
                "required": true
            }
        }
    },
    "response": {
        "contentType": spec.ContentType.JSON,
        "data": {
            "username": "string",
            "result": "boolean",
            "reason": "string"
        },
        "rules": {
            "username": {
                "required": true
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

describe("Register", function () {
    var host = spec.host(endpoint.url);

    it("invalid email", function (done) {
        host.api(API).params({
            "username": "Test",
            "password": "123abc!",
            "email": "invalid"
        }).success(function (data, res) {
            assert.equal(data.result, false);
            assert.equal(data.username, "Test");
            done();
        });
    });

    it("weak password", function (done) {
        host.api(API).params({
            "username": "root",
            "password": "root",
            "email": "test@test.com"
        }).success(function (data, res) {
            assert.equal(data.result, false);
            assert.equal(data.username, "root");
            done();
        });
    });

    it("success", function (done) {
        host.api(API).params({
            "username": "Test",
            "password": "123abc!",
            "email": "test@test.com"
        }).success(function (data, res) {
            assert.equal(data.result, true);
            assert.equal(data.username, "Test");
            done();
        });
    });

    it("already exists", function (done) {
        host.api(API).params({
            "username": "Test",
            "password": "123abc!",
            "email": "test@test.com"
        }).success(function (data, res) {
            assert.equal(data.result, false);
            assert.equal(data.username, "Test");
            done();
        });
    });
});

module.exports = API;