var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
//var url = "mongodb://localhost:27017/mydb";
var url = "mongodb+srv://waitlist:oQcqLQEDidz2QnYT@eve-tdf-waitlist-f8bbz.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

