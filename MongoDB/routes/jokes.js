var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes');

router.get('/joke/random', function(req,res,next){
    jokes.randomJoke(function(err,data){
        if(err) res.send(err);
        res.json(data);
    });
});

router.get('/jokes', function(req,res,next){
    jokes.allJokes(function(err,data){
        if(err) res.send(err);
        res.json(data);
    });
});

router.get('/joke/:_id', function(req,res,next){
    console.log(req.params._id);
    jokes.findJoke(req.params._id,function(err,data){
        if(err) res.send(err);
        res.json(data);
    });
});

router.post('/joke', function(req,res,next){
    var newjoke = {};
    newjoke.joke = req.body.joke;
    newjoke.type = req.body.type;
    newjoke.reference = req.body.reference;
    newjoke.lastEdited = new Date();

    jokes.addJoke(newjoke, function(err,data){
        if(err) res.send(err);
        res.json(newjoke);
    });
});

router.put('/joke', function(req,res,next){
    var editedjoke = {};
    editedjoke.joke = req.body.joke;
    editedjoke.type = req.body.type;
    editedjoke.reference = req.body.reference;
    editedjoke.lastEdited = new Date();

    jokes.editJoke(editedjoke, function(err,data){
        if(err) res.send(err);
        res.json(editedjoke);
    });
});

router.delete('/joke/:_id', function(req,res,next){
    jokes.deleteJoke(req.params._id, function(err,data){
        if(err) res.send(err);
        res.json(data);
    });
});



module.exports = router;
