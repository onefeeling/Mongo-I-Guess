const assert = require('assert').strict; //probably to use the assert.stringEqual thingy

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection); //how the function accesses the database
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result); //we will deliver the 'result' back to the function called 'callback', probably in Index.js
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => { //find documents, all sorted in array form
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => { //the $set thingy is just telling code that we intend to update
        assert.strictEqual(err, null);
        callback(result);
    });
};