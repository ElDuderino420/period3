/**
 * Created by David on 25 Sep 2016.
 */
var expect = require("chai").expect;
var app = require("../app");
var http = require("http");
var testPort = 9999;
var testServer;
var connection = require("../db/db");
var request = require("request");
var apiUrl = "http://localhost:" + testPort + "/api";

describe('rest api', function () {
    //Start the Server before the TESTS
    before(function (done) {
        var db = require("../db/db");
        var connection_string = "mongodb://localhost/ProjectTestDataBase";
        db.connect(connection_string, function (err) {
            if (err) {
                console.log("Could not connect to Database");
                throw "ERROR";
            }
            else {
                testServer = app.listen(testPort, function () {
                    console.log("Server is listening on: " + testPort);
                    done();
                }).on('error', function (err) {
                    console.log(err);
                });
            }
        });
    });

    after(function () {  //Stop server after the test
        testServer.close();
    });

    beforeEach(function (done) {
        console.log("BEFORE");
        //Create known test data for each test
        var db = connection.get();
        var jokes = [
            {"joke":"suck my dick off","type":["short","joke"],"reference":{"author":"david","link":"my dick"},"lastEdited":"2016-09-20T11:27:01.218Z"},
            {"joke":"another day another play","type":["short","joke"],"reference":{"author":"martin luther king","link":"my dick"},"lastEdited":"2016-09-20T11:27:01.218Z"}
        ];

        db.collection("jokes").insertMany(jokes, function (err, r) {
            if (err) {
                throw "ERROR";
            }
            done();
        });
    });

    afterEach(function (done) {
        console.log("AFTER");
        //Delete all test data after each test
        var db = connection.get();
        db.collection("jokes").deleteMany({}, function (err, results) {
            done();
        });
    });


    describe('Verify GET (all)', function () {
        it('should return two jokes', function (done) {
            request(apiUrl+'/jokes', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var res = JSON.parse(body);
                    expect(res.length).to.be.equal(2);
                    expect(res[0].joke).to.be.equal("suck my dick off");
                    expect(res[1].joke).to.be.equal("another day another play");
                    done();
                }
            })
        })
    });

    describe('Verify POST ', function () {
        it('should add a new joke', function (done) {
            var options = {
                uri: apiUrl + '/joke',
                method: 'POST',
                json: true,
                body: {"joke":"badabing","type":["short","joke"],"reference":{"author":"david","link":"my dick"},"lastEdited":"2016-09-20T11:27:01.218Z"}
            };
            request(options, function (error, response, res) {
                if (!error && response.statusCode == 200) {
                    expect(res.joke).to.be.equal("badabing");
                    request(apiUrl + '/jokes', function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var res = JSON.parse(body);
                            expect(res.length).to.be.equal(3);
                            expect(res[2].joke).to.be.equal("badabing");
                            done();
                        }
                    });
                }
            })
        })
    });

    describe('Verify PUT', function () {
        it('should edit suck my dick off joke into theres a dog', function (done) {
            request(apiUrl + '/jokes', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var res = JSON.parse(body);
                    var joke1 = res[0];
                    joke1.joke= "theres a dog";
                    var options = {
                        uri: apiUrl + '/joke',
                        method: 'PUT',
                        json: true,
                        body: joke1
                    };
                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {

                            done();
                        }
                    });
                }
            })
        })
    });

    describe('Verify DELETE', function () {
        it('should Delete one joke', function (done) {
            request(apiUrl + '/jokes', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var res = JSON.parse(body);
                    var options = {
                        uri: apiUrl + '/joke/' + res[0]._id,
                        method: 'DELETE',
                        json: true
                    };
                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {

                            done();
                        }
                    });
                }
            })
        })
    });


});
