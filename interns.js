var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var storage = db.db("kennyinspire");

    // Create a collection in the DB
    storage.createCollection("myMovies", function(err, res) {
        if (err) throw err;
        console.log("interns collection created successfully!");

    // Declare variable for documents to be inserted
    var myObj = [
        {movie: "The Banker", year: "2020", rating: 8}, 
        {movie: "Bad Boys", year: "2020", rating: 7}, 
        {movie: "The Hunt", year: "2020", rating: 7}, 
        {movie: "Bloodshot", year: "2020", rating: 7.5}, 
        {movie: "First Cow", year: "2020", rating: 6.5}
    ];

    // Insert document in your collection
    storage.collection("myMovies").insertMany(myObj, function(err, res) {
        if (err) throw err;
        console.log("Data inserted successfully!");
        console.log(res);
        db.close();
    });

    });
});