var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var storage = db.db("kennyinspire");

    // Query to return first document in the collection
    storage.collection("myMovies").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result);

    // Query to return document(s) with rating of 7
        var query = {rating: 7};
    storage.collection("myMovies").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);  
        
    // Query to return only movie titles and nothing else    
    storage.collection("myMovies").find({}, {projection: { _id: 0, movie: 1,}}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();

    });
    });

    });
});