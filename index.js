const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null); // Checks to see if 'err' is strictly equal to 'null'

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => { //'drop' is the same as delete, just fancy
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"}, //just inserting our object in
            'campsites', result => {
            console.log('Insert Document:', result.ops); //ops is short for operations, it can return a bunhc of stuff, but here it is the array of what we put in

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close(); //kills client connection to MongoDB Server
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});
