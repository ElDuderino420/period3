/**
 * Created by David on 10 Oct 2016.
 */
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var redis = require("redis");

var client = redis.createClient(18904, "redis-18904.c10.us-east-1-2.ec2.cloud.redislabs.com", {no_ready_check: true});
client.auth('password', function (err) {
    if (err) {
        console.log(err);
    }
});

module.exports = client