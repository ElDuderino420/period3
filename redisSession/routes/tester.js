/**
 * Created by David on 10 Oct 2016.
 */
var path = require('path');
var client = require("../db/redisClient");

client.keys('*sess*', function (err, keys) {
    if (err) return console.log(err);
    keys.forEach(function(key){
        console.log(key + );
    })
});