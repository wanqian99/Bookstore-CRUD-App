// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const mustacheExpress = require('mustache-express');
const path = require("path");

// Initialise objects and declare constants
// Create app
const app = express();
// Declare webport
const port = 8088;

// create connection
const db = mysql.createConnection({
	host: "localhost",
	user: "user",
	password: "password",
	database: "Books",
    multipleStatements: true
});

// run .connect() to make connection
db.connect((err) => {
	if(err) {
		throw err;
	}
	console.log("Connected to database");
});

global.db = db;

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require("./routes/main")(app);

// Static files: use express.static to allow adding styles.css and scripts.js to the web app
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, "/public/css")));
app.use('/js', express.static(path.join(__dirname, "/public/js")));

// Templating engines
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//app.engine('ejs', mustacheExpress());

// Listen at the port
app.listen(port, () => console.log(`Node server is running... on port ${port}!`));