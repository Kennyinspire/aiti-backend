var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/kennyinspire";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database Created by Kennyinspire Successfully!");
    db.close();
});