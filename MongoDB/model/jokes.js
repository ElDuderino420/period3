var path = require('path');
var connection = require("../db/db");
var ObjectId = require('mongodb').ObjectId;


module.exports.allJokes = function(callback){
    var db = connection.get();
    var data = db.collection("jokes").find().toArray(function (err,data) {
        if(err) callback(err,null);
        callback(null, data);
    });
};
module.exports.findJoke = function(id,callback){
    var db = connection.get();
    var data = db.collection("jokes").find({_id: ObjectId(id)}).toArray(function (err,data) {
        if(err) callback(err,null);
        callback(null, data);
    });
};
module.exports.addJoke = function(jokeToAdd,callback) {
    var db = connection.get();
    var data = db.collection("jokes").insertOne(jokeToAdd, function(err, data){
        if(err) callback(err,null);
        callback(null, data);
    });
};
module.exports.editJoke = function(jokeToEdit,callback) {
    var db = connection.get();
    var data = db.collection("jokes").replaceOne({_id: ObjectId(jokeToEdit._id)},jokeToEdit, function (err, data) {
        if(err) callback(err,null);
        callback(null, data);
    })

};
module.exports.deleteJoke = function(id,callback){
    var db = connection.get();
    var data = db.collection("jokes").deleteOne({_id: ObjectId(id)},function (err, data) {
        if(err) callback(err,null);
        callback(null, data);
    })
};
module.exports.randomJoke = function(callback){
    var db = connection.get();
    var data = db.collection("jokes").find().toArray(function (err,data) {
        if(err) callback(err,null);
        callback(null, data[Math.floor(Math.random()*data.length)]);
    });
};
