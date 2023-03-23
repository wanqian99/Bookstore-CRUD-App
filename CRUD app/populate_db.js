const mysql = require('mysql');
const csvtojson = require('csvtojson');

// create connection to the database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "Books"
});

// run .connect() to make connection
db.connect((err) => {
	if (err) throw err;
	console.log("Connected to Books database");
    

    // delete existing tables to ensure that there are no residual data
    // drop cover and inventory first as they have a foreign key that references book table
    var deleteExistingTables = "DROP TABLE IF EXISTS cover, inventory, author, publisher, location, category, format, book";
    db.query(deleteExistingTables, function (err, result) {
        if (err) throw err;
        console.log("All existing tables deleted");
    });


    //create the table called 'author' in the 'Books' database, if the table doesn't exist
    //this table stores the author's id, name  etc...
    var authorTable = "CREATE TABLE IF NOT EXISTS author (" +
                      "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                      "author VARCHAR(255) NOT NULL," +
                      "PRIMARY KEY(id))";
    db.query(authorTable, function (err, result) {
        if (err) throw err;
        console.log("Author Table created in database");
    });


    //create the table called 'publisher' in the 'Books' database, if the table doesn't exist
    //this table stores the publisher's id, name  etc...
    var publisherTable = "CREATE TABLE IF NOT EXISTS publisher (" +
                         "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                         "publisher VARCHAR(255) NOT NULL," +
                         "PRIMARY KEY(id))";
    db.query(publisherTable, function (err, result) {
        if (err) throw err;
        console.log("Publisher Table created in database");
    });


    //create the table called 'location' in the 'Books' database, if the table doesn't exist
    //this table stores the book's publish location  etc...
    var locationTable = "CREATE TABLE IF NOT EXISTS location (" +
                        "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                        "city VARCHAR(255) NOT NULL," +
                        "country VARCHAR(255) NOT NULL," +
                        "PRIMARY KEY(id))";
    db.query(locationTable, function (err, result) {
        if (err) throw err;
        console.log("Location Table created in database");
    });


    //create the table called 'category' in the 'Books' database, if the table doesn't exist
    //this table stores the book's category etc...
    var categoryTable = "CREATE TABLE IF NOT EXISTS category (" +
                        "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                        "category VARCHAR(255) NOT NULL," +
                        "PRIMARY KEY(id))";
    db.query(categoryTable, function (err, result) {
        if (err) throw err;
        console.log("Category Table created in database");
    });


    //create the table called 'format' in the 'Books' database, if the table doesn't exist
    //this table stores the book's format etc...
    var formatTable = "CREATE TABLE IF NOT EXISTS format (" +
                      "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                      "format VARCHAR(255) NOT NULL," +
                      "PRIMARY KEY(id))";
    db.query(formatTable, function (err, result) {
        if (err) throw err;
        console.log("Format Table created in database");
    });


    //create the table called 'book' in the 'Books' database, if the table doesn't exist
    //this table stores the book's isbn, title  etc...
    var bookTable = "CREATE TABLE IF NOT EXISTS book (" +
                    "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                    "ISBN VARCHAR(255) NOT NULL," +
                    "title VARCHAR(255) NOT NULL," +
                    "year INT UNSIGNED NOT NULL," +
                    "price DECIMAL(5, 2) UNSIGNED NOT NULL," +
                    "rating DECIMAL(4, 2) UNSIGNED NOT NULL," +
                    "length INT UNSIGNED," +
                    "author_id INT UNSIGNED NOT NULL," +
                    "publisher_id INT UNSIGNED NOT NULL," +
                    "location_id INT UNSIGNED NOT NULL," +
                    "category_id INT UNSIGNED NOT NULL," +
                    "format_id INT UNSIGNED NOT NULL," +
                    "PRIMARY KEY(id)," +
                    "FOREIGN KEY (author_id) REFERENCES author(id)," +
                    "FOREIGN KEY (publisher_id) REFERENCES publisher(id)," +
                    "FOREIGN KEY (location_id) REFERENCES location(id)," +
                    "FOREIGN KEY (category_id) REFERENCES category(id)," +
                    "FOREIGN KEY (format_id) REFERENCES format(id))";
    db.query(bookTable, function (err, result) {
        if (err) throw err;
        console.log("Book Table created in database");
    });


    //create the table called 'cover' in the 'Books' database, if the table doesn't exist
    //this table stores the book's cover image, url  etc...
    var coverTable = "CREATE TABLE IF NOT EXISTS cover (" +
                     "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                     "url VARCHAR(255) NOT NULL," +
                     "image VARCHAR(255) NOT NULL," +
                     "PRIMARY KEY(id)," +
                     "book_id INT UNSIGNED NOT NULL," +
                     "FOREIGN KEY (book_id) REFERENCES book(id))";
    db.query(coverTable, function (err, result) {
        if (err) throw err;
        console.log("Cover Table created in database");
    });


    //create the table called 'inventory' in the 'Books' database, if the table doesn't exist
    //this table stores the book's quantity etc...
    var inventoryTable = "CREATE TABLE IF NOT EXISTS inventory (" +
                         "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                         "quantity INT UNSIGNED NOT NULL," +
                         "PRIMARY KEY(id)," +
                         "book_id INT UNSIGNED NOT NULL," +
                         "FOREIGN KEY (book_id) REFERENCES book(id))";
    db.query(inventoryTable, function (err, result) {
        if (err) throw err;
        console.log("Inventory Table created in database");
    });
});

// -------------- run this only once to insert csv data into sql database --------------
// CSV file name
const csvFile = "data/book_dataset.csv";
  
csvtojson().fromFile(csvFile).then(source => {
    // initialise empty list to store unique fields
    var author_list = [];
    var author_full =[];

    var publisher_list = [];
    var publisher_full =[];

    var location_list = [];
    var location_full =[];

    var url_list = [];
    var image_list = [];

    var quantity_list = [];

    var category_list = [];
    var category_full =[];

    var format_list = [];
    var format_full =[];

    var ISBN_list = [];
    var title_list = [];
    var year_list = [];
    var price_list = [];
    var rating_list = [];
    var length_list = [];
    
    // get field data csv
    for (var i = 0; i < source.length; i++) {
        // Fetching author name data from each row
        var author = source[i]["author"];

        // Fetching publisher name data from each row
        var publisher = source[i]["publisher"];

        // Fetching location table data from each row
        var location = source[i]["city/country"];

        // Fetching cover table data from each row
        var url = source[i]["url"];
        var image = source[i]["image"];

        // Fetching cover inventory data from each row
        var quantity = source[i]["quantity"];

        // Fetching category table data from each row
        var category = source[i]["categories"];

        // Fetching cover table data from each row
        var format = source[i]["format"];

        // Fetching book table data from each row
        var bookISBN = source[i]["ISBN"];
        var bookTitle = source[i]["title"];
        var bookYear = source[i]["year"];
        var bookPrice = source[i]["price"];
        var bookRating = source[i]["rating"];
        var bookLength = source[i]["length"];


        // Push data to names list if it doesnt already exist in the list

        // author, publisher, category, format tables contains repetitive data which results in a large dataset,
        // so only push unique ones into the lists
        if (author_list.includes(author) === false) author_list.push(author);
        if (publisher_list.includes(publisher) === false) publisher_list.push(publisher);
        if (category_list.includes(category) === false) category_list.push(category);
        if (format_list.includes(format) === false) format_list.push(format);

        // this contains the city and country data,
        // which I would have to split them into single elements later
        if (location_list.includes(location) === false) location_list.push(location);

        // cover and inventory table fields are unique, therefore push all the fields into the lists
        url_list.push(url);
        image_list.push(image);
        quantity_list.push(quantity); 

        // these book table fields are unique, therefore push all the fields into the lists
        ISBN_list.push(bookISBN);
        title_list.push(bookTitle);
        year_list.push(bookYear);
        price_list.push(bookPrice);
        rating_list.push(bookRating);
        length_list.push(bookLength);

        // these lists stores the full data of the fields (repetitive data)
        author_full.push(author);
        publisher_full.push(publisher);
        location_full.push(location);
        category_full.push(category);
        format_full.push(format);
    }
    // console.log(ISBN_list);
    // console.log(ISBN_list.length);



    // get author field data (stores author's name) from csv
    for (var i = 0; i < author_list.length; i++) {
        // insert command
        var sqlinsert = `INSERT INTO author values(?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, author_list[i]];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert author item at row ", i + 1);
                return console.log(err);
            }
        });
    }



    // get publisher field data (stores publisher's name) from csv
    for (var i = 0; i < publisher_list.length; i++) {
        // insert command
        var sqlinsert = `INSERT INTO publisher values(?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, publisher_list[i]];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert publisher item at row ", i + 1);
                return console.log(err);
            }
        });
    }



    var city = [];
    var country = [];
    // get location field data (stores book's published location) from csv
    for (var i = 0; i < location_list.length; i++) {
        // initialise empty string variable for saving city data later
        var city_temp = "";

        // contains city and country data that needs to be saved into seperate lists
        var city_country_pair = location_list[i].split(", ");

        // empty string in row, push NULL into the lists
        if(city_country_pair == "") {
            city.push("NULL");
            country.push("NULL");
        }
        // only have 1 element, push NULL into city list and country data into the country list
        // for this csv data, if there is only 1 element in the city/country field, it only contains the country data
        else if(city_country_pair.length == 1) {
            city.push("NULL");
            country.push(city_country_pair[0]);
        }
        // 2 elements, push city and country into the lists
        else if(city_country_pair.length == 2) {
            city.push(city_country_pair[0]);
            country.push(city_country_pair[1]);
        }
        // have more than 2 elements, push last element into country list and the rest into city list
        else if(city_country_pair.length > 2) {
            for(var x = 0; x < city_country_pair.length - 1; x++) {
                // if there is only 1 last element to concatenate, dont add the comma
                if(x == city_country_pair.length - 2) {
                    city_temp = city_temp + city_country_pair[x];
                }
                // add comma behind each city
                else {
                    city_temp = city_temp + city_country_pair[x] + ", ";
                }
                
            }
            // push the concatenated string, city_temp, into the city list
            city.push(city_temp);
            // push last element as country
            country.push(city_country_pair[city_country_pair.length-1]);
        }

        // insert command
        var sqlinsert = `INSERT INTO location values(?, ?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, city[i], country[i]];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert location item at row ", i + 1);
                return console.log(err);
            }
        });
    }
    // console.log(city);
    // console.log(country);



    // get book category field data (stores book's category) from csv
    for (var i = 0; i < category_list.length; i++) {
        // insert command
        var sqlinsert = `INSERT INTO category values(?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, category_list[i]];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert category item at row ", i + 1);
                return console.log(err);
            }
        });
    }



    // get book format field data (stores book's category) from csv
    for (var i = 0; i < format_list.length; i++) {
        // insert command
        var sqlinsert = `INSERT INTO format values(?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, format_list[i]];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert format item at row ", i + 1);
                return console.log(err);
            }
        });
    }



    // get book cover field data (stores book's image, url) from csv
    for (var i = 0; i < ISBN_list.length; i++) {
        var author_id;
        var publisher_id;
        var location_id;
        var category_id;
        var format_id;

        // for each foreign key, loop through the field data list (that only contains unique values)
        // use an if statement to check if the data in the full -ist exists in the unique-data-only list
        // if it exists, get the index (a) and  use it as the id to be parsed into the database
        // the index (a) needs to be incremented by 1 as id in the database starts from 1 (instead of 0)
        for(var a = 0; a < author_list.length; a++) {
            if(author_full[i] == author_list[a]) {
                author_id = a+1;
            }
        }

        for(var a = 0; a < publisher_list.length; a++) {
            if(publisher_full[i] == publisher_list[a]) {
                publisher_id = a+1;
            }
        }

        for(var a = 0; a < location_list.length; a++) {
            if(location_full[i] == location_list[a]) {
                location_id = a+1;
            }
        }
    

        for(var a = 0; a < category_list.length; a++) {
            if(category_full[i] == category_list[a]) {
                category_id = a+1;
            }
        }

        for(var a = 0; a < format_list.length; a++) {
            if(format_full[i] == format_list[a]) {
                format_id = a+1;
            }
        }


        // insert command
        var sqlinsert = `INSERT INTO book values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, ISBN_list[i], title_list[i], year_list[i], price_list[i], rating_list[i], length_list[i], 
                    author_id, publisher_id, location_id, category_id, format_id];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert book item at row ", i + 1);
                return console.log(err);
            }
        });
    }
    


    // get book cover field data (stores book's image, url) from csv
    for (var i = 0; i < url_list.length; i++) {
        // insert command
        var sqlinsert = `INSERT INTO cover values(?, ?, ?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, url_list[i], image_list[i], i+1];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert cover item at row ", i + 1);
                return console.log(err);
            }
        });
    }



    // get book inventory field data (stores book's quantity) from csv
    for (var i = 0; i < quantity_list.length; i++) {
        // insert command
        var sqlinsert = `INSERT INTO inventory values(?, ?, ?)`;
        // data to be inserted. since the if starts at 1, increment i by 1
        var data = [i+1, quantity_list[i], i+1];
        //console.log(data);
  
        // Inserting data of current row into database
        db.query(sqlinsert, data, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert inventory item at row ", i + 1);
                return console.log(err);
            }
        });
    }
    
    console.log("All items stored into database successfully");
});