var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var storage = db.db("kennyinspire");

//Update the first document in the collection 
    var myquery = {movie: "The Banker", year: "2020", rating: 8};
    var newvalues = { $set: {movie: "Abejoye - The King Maker", year: "2020", rating: 8} };
    storage.collection("myMovies").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("Document updated successfully!");     

    // Log the updated collection to the consola
    storage.collection("myMovies").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
});