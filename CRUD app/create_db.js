const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // delete the database to ensure there are no residual data
    // db.query("DROP DATABASE Books", function (err, result) {
    //     if (err) throw err;
    //     console.log("Books database deleted");
    // });

    // create the database
    db.query("CREATE DATABASE IF NOT EXISTS Books", function (err, result) {
      if (err) throw err;
      console.log("Books database created");
    });
  });