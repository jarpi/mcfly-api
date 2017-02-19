"use strict";
/* jshint node: true */
/* global require, Promise, console, process */

var mongoose = require('mongoose');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = require('should');
var sinon = require('sinon');
var notesModel = require('../models/notesModel.js');
var notesController =  require('../controllers/notesController.js');

describe('Controllers', function() {

	describe('POST /notes - notesController.addNote(...)', function(){
        var saveStub;
        before(function(done){
            saveStub = sinon.stub(notesModel.prototype, 'save');
            done();
        });

        it('Add a note successfully', function() {
            saveStub
            .returns(Promise.resolve({}));
            var noteObj = {
                title: 'flyingSaucers',
                text: 'foo bar',
                created: new Date(),
                isFav : false
            };
            return notesController.addNote(noteObj)
                .should.be.fulfilled();
       });

        it('Add a note fails', function() {
            saveStub
            .returns(Promise.reject('Unexpected db error'));
            return notesController.addNote()
            .should.be.rejected();
        });
   });

});
