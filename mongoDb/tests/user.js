var mongoose = require('mongoose');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var User = require('../models/user');

describe('User', function() {
    before(function(done){
        _username = 'test';
        _password = 'testing';
        mongoose.connect('mongodb://localhost:27017/test', done);
    })

    it('Testing the creation of a new user', function(done) {
        User.create(_username, _password, function(err) {
            expect(err).to.not.exist;
            done()
        })
    });

    it('Testing the findOneByUsername', function(done){
        User.findOneByUsername( _username, function(err, user) {
            expect(err).to.be.null

            expect(user).to.not.be.null;
        });

        User.findOneByUsername( 'usernameDoesntExist', function(err, user) {
             //there's error only if it was internal as when occurs an error
             //to connect to database
            expect(err).to.be.null;

            expect(user).to.be.null;

            done();
        })
    });

    after(function(done) {
        var dropColectionsAndDb = new Promise(function(resolve, reject) {
            mongoose.connection.db.dropDatabase(resolve);
        });

        dropColectionsAndDb.then(function() {
            mongoose.connection.close(done);
        });
    });
});
