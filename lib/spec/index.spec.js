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
                body: 'foo bar',
                created: new Date(),
                isFav : false
            };
            return notesController.addNote(noteObj)
                .should.be.fulfilled();
        });

        it('Add a note fails - invalid validation', function() {
            var noteObj = {
                title: 'flyingSaucers',
                created: new Date(),
                isFav : false
            };
            return notesController.addNote(noteObj)
                .should.be.rejected();
        });

        it('Add a note fails - Object is null or undefined', function() {
            return notesController.addNote()
            .should.be.rejected();
        });

        it('Add a note fails - DB related error', function() {
            saveStub
            .returns(Promise.reject('Unexpected db error'));
            return notesController.addNote()
            .should.be.rejected();
        });
    });

	describe('GET /notes - notesController.getNotes(...)', function(){
		var findStub;
        before(function(done){
            findStub = sinon.stub(mongoose.Model, 'find');
            done();
        });

        it('Get all notes', function() {
			findStub
            .returns(Promise.resolve({}));
            return notesController.getNotes({})
                .should.be.fulfilled();
		});

		it('Get note by id', function() {
			findStub
			.withArgs({_id:1})
            .returns(Promise.resolve({}));
            return notesController.getNotes({id:1})
                .should.be.fulfilled();
		});

		it('Get favourite notes', function() {
			findStub
            .returns(Promise.resolve({}));
            return notesController.getNotes({isFavouriteNotes:true})
                .should.be.fulfilled();
		});

        it('Get notes fails', function() {
			findStub
            .returns(Promise.reject('Unexpected db error'));
            return notesController.getNotes({})
            .should.be.rejected();
        });
	});

	describe('POST /note/:id/fav - notesController.setFavouriteNote(...)', function(){
		var findOneAndUpdateStub;
        before(function(done){
            findOneAndUpdateStub = sinon.stub(mongoose.Model, 'findOneAndUpdate');
            done();
        });

		it('Update favourite note successfully', function() {
			findOneAndUpdateStub
			.withArgs({_id:1}, {isFav: true})
            .returns(Promise.resolve({}));
            return notesController.setFav({id:1})
            .should.be.fulfilled();
        });

        it('Update favourite note fails - Invalid options', function() {
			return notesController.setFav()
            .should.be.rejected();
        });

		it('Update favourite note fails - DB related error', function() {
			findOneAndUpdateStub
			.withArgs({_id:1}, {isFav: true})
            .returns(Promise.reject('Unexpected db error'));
			return notesController.setFav({id:1})
            .should.be.rejected();
        });
	});

});
