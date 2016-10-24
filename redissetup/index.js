/**
 * Created by David on 08 Oct 2016.
 */
var redis = require('redis');
var client = redis.createClient(18904, 'redis-18904.c10.us-east-1-2.ec2.cloud.redislabs.com', {no_ready_check: true});
client.auth('password', function (err) {
    if (err){
        console.log(err);
    }
});
client.set("key1", "This is cool", redis.print);
client.get("key1", function (err, reply) {
    if (err) throw err;
    console.log(reply.toString());
});