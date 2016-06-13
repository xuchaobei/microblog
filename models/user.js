var mongodbUrl = require('./db');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

function User(user){
	this.name = user.name;
	this.password = user.password;
};

module.exports = User;

var insertDocument = function(user, db, callback) {
	db.collection('users').insertOne( user, function(err, doc) {
		if(err){
			return callback(err, null);
		}
		console.log("Inserted a document into the users collection.");
		callback(err, doc);
	});
};

User.prototype.save = function save(callback){
	//存入mongodb的文档
	var user = {
		name:this.name,
		password:this.password
	};
	MongoClient.connect(mongodbUrl, function(err, db) {
		assert.equal(err, null);
		insertDocument(user, db, function(err, doc) {
			db.close();
			callback(err, doc);
		});
	});
};

var findDocumentByName = function(name, db, callback) {
	var cursor = db.collection('users').find({ "name": name }).
		limit(1).toArray(function(err, doc){
			if(err){
				return callback(err, null);
			}
			var user = null;
		    if(doc.length == 1){
				user = new User(doc[0]);
				console.dir(user);
			}
			callback(err, user);
	});
};

User.get = function get(username,callback){
	MongoClient.connect(mongodbUrl, function(err, db) {
		assert.equal(null, err);
		findDocumentByName(username, db, function(err, doc) {
			db.close();
			callback(err, doc);
		});
	});
};