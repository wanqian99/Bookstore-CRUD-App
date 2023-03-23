// The main.js file of my application

const { render } = require("ejs");

// In charge of processing the get and post requests of the web app
module.exports = function (app) {
    //get request that sends the render of the book.ejs page
    app.get("/", function (req, res) {
        //get request that sends the render of the index.ejs page
        let sqlquery = "SELECT id, ISBN, title, year, price, rating, length FROM book;" +
                       "SELECT author.author FROM author INNER JOIN book ON author.id = author_id ORDER BY book.id;" +
                       "SELECT publisher.publisher FROM publisher INNER JOIN book ON publisher.id = publisher_id ORDER BY book.id;" +
                       "SELECT location.city, location.country FROM location INNER JOIN book ON location.id = location_id ORDER BY book.id;" +
                       "SELECT category.category FROM category INNER JOIN book ON category.id = category_id ORDER BY book.id;" +
                       "SELECT format.format FROM format INNER JOIN book ON format.id = format_id ORDER BY book.id;" +
                       "SELECT cover.url, cover.image FROM cover INNER JOIN book ON book.id = book_id ORDER BY book.id;" +
                       "SELECT inventory.quantity FROM inventory INNER JOIN book ON book.id = book_id ORDER BY book.id;"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("index.ejs", {book: result[0], author: result[1], 
                                         publisher: result[2], location: result[3], 
                                         category: result[4], format: result[5], 
                                         cover: result[6], inventory: result[7], search: ''});
            }
        });
    });



    app.post("/", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        //get request that sends the render of the index.ejs page
        let sqlquery = "SELECT id, ISBN, title, year, price, rating, length FROM book WHERE title LIKE '%" + keyword + "%';" +
                       "SELECT author.author FROM author INNER JOIN book ON author.id = author_id WHERE title LIKE '%" + keyword + "%';" +
                       "SELECT publisher.publisher FROM publisher INNER JOIN book ON publisher.id = publisher_id WHERE title LIKE '%" + keyword + "%';" +
                       "SELECT location.city, location.country FROM location INNER JOIN book ON location.id = location_id WHERE title LIKE '%" + keyword + "%';" +
                       "SELECT category.category FROM category INNER JOIN book ON category.id = category_id WHERE title LIKE '%" + keyword + "%';" +
                       "SELECT format.format FROM format INNER JOIN book ON format.id = format_id WHERE title LIKE '%" + keyword + "%';" +
                       "SELECT cover.url, cover.image FROM cover INNER JOIN book ON book.id = book_id WHERE title LIKE '%" + keyword + "%';" +
                       "SELECT inventory.quantity FROM inventory INNER JOIN book ON book.id = book_id WHERE title LIKE '%" + keyword + "%';"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("index.ejs", {book: result[0], author: result[1], 
                                         publisher: result[2], location: result[3], 
                                         category: result[4], format: result[5], 
                                         cover: result[6], inventory: result[7], search: keyword});
            }
        });
    });



    app.post("/searchAuthor", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        //get request that sends the render of the index.ejs page
        // join each table with author, to return the correct row of based on the author field
        let sqlquery = "SELECT book.id, ISBN, title, year, price, rating, length FROM book INNER JOIN author ON author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                       "SELECT author.author FROM author INNER JOIN book ON author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                       "SELECT publisher.publisher FROM publisher INNER JOIN book INNER JOIN author ON publisher.id = publisher_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                       "SELECT location.city, location.country FROM location INNER JOIN book INNER JOIN author ON location.id = location_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                       "SELECT category.category FROM category INNER JOIN book INNER JOIN author ON category.id = category_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                       "SELECT format.format FROM format INNER JOIN book INNER JOIN author ON format.id = format_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                       "SELECT cover.url, cover.image FROM cover INNER JOIN book INNER JOIN author ON book.id = book_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                       "SELECT inventory.quantity FROM inventory INNER JOIN book INNER JOIN author ON book.id = book_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("index.ejs", {book: result[0], author: result[1], 
                                         publisher: result[2], location: result[3], 
                                         category: result[4], format: result[5], 
                                         cover: result[6], inventory: result[7], search: keyword});
            }
        });
    });



    app.post("/searchPublisher", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        //get request that sends the render of the index.ejs page
        // join each table with publisher, to return the correct row of based on the publisher field
        let sqlquery = "SELECT book.id, ISBN, title, year, price, rating, length FROM book INNER JOIN publisher ON publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                       "SELECT author.author FROM author INNER JOIN book INNER JOIN publisher ON author.id = author_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                       "SELECT publisher.publisher FROM publisher INNER JOIN book ON publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                       "SELECT location.city, location.country FROM location INNER JOIN book INNER JOIN publisher ON location.id = location_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                       "SELECT category.category FROM category INNER JOIN book INNER JOIN publisher ON category.id = category_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                       "SELECT format.format FROM format INNER JOIN book INNER JOIN publisher ON format.id = format_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                       "SELECT cover.url, cover.image FROM cover INNER JOIN book INNER JOIN publisher ON book.id = book_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                       "SELECT inventory.quantity FROM inventory INNER JOIN book INNER JOIN publisher ON book.id = book_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("index.ejs", {book: result[0], author: result[1], 
                                         publisher: result[2], location: result[3], 
                                         category: result[4], format: result[5], 
                                         cover: result[6], inventory: result[7], search: keyword});
            }
        });
    });



    app.post("/searchCategory", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        //get request that sends the render of the index.ejs page
        // join each table with category, to return the correct row of based on the category field
        let sqlquery = "SELECT book.id, ISBN, title, year, price, rating, length FROM book INNER JOIN category ON category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                       "SELECT author.author FROM author INNER JOIN book INNER JOIN category ON author.id = author_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                       "SELECT publisher.publisher FROM publisher INNER JOIN book INNER JOIN category ON publisher.id = publisher_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                       "SELECT location.city, location.country FROM location INNER JOIN book INNER JOIN category ON location.id = location_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                       "SELECT category.category FROM category INNER JOIN book ON category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                       "SELECT format.format FROM format INNER JOIN book INNER JOIN category ON format.id = format_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                       "SELECT cover.url, cover.image FROM cover INNER JOIN book INNER JOIN category ON book.id = book_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                       "SELECT inventory.quantity FROM inventory INNER JOIN book INNER JOIN category ON book.id = book_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("index.ejs", {book: result[0], author: result[1], 
                                         publisher: result[2], location: result[3], 
                                         category: result[4], format: result[5], 
                                         cover: result[6], inventory: result[7], search: keyword});
            }
        });
    });



    //get request that sends the render of the book.ejs page
    app.get("/book", function (req, res) {
        // get all book fields
        let sqlquery = "SELECT * FROM book"
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("book.ejs", {book: result, search: ''});
            }
        });
    });



    app.post("/book", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        let sqlquery = "SELECT * FROM book WHERE title LIKE '%" + keyword + "%'"
        // execute sql query
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("book.ejs", {book: result, search: keyword});
            }
        });
    });



    //get request that sends the render of the author.ejs page
    app.get("/author", function (req, res) {
        // get all author fields
        let sqlquery = "SELECT * FROM author"
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("author.ejs", {author: result});
            }
        });
    });


    app.post("/author", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        let sqlquery = "SELECT * FROM author WHERE author LIKE '%" + keyword + "%'"
        // execute sql query
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("author.ejs", {author: result, search: keyword});
            }
        });
    });



    //get request that sends the render of the publisher.ejs page
    app.get("/publisher", function (req, res) {
        // get all publisher fields
        let sqlquery = "SELECT * FROM publisher"
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("publisher.ejs", {publisher: result, search: ''});
            }
        });
    });



    app.post("/publisher", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        let sqlquery = "SELECT * FROM publisher WHERE publisher LIKE '%" + keyword + "%'"
        // execute sql query
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("publisher.ejs", {publisher: result, search: keyword});
            }
        });
    });



    //get request that sends the render of the location.ejs page
    app.get("/location", function (req, res) {
        // get all location fields
        let sqlquery = "SELECT * FROM location"
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("location.ejs", {location: result, search: ''});
            }
        });
    });



    app.post("/location", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        let sqlquery = "SELECT * FROM location WHERE city LIKE '%" + keyword + "%' OR country LIKE '%" + keyword + "%'"
        // execute sql query
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("location.ejs", {location: result, search: keyword});
            }
        });
    });



    //get request that sends the render of the category.ejs page
    app.get("/category", function (req, res) {
        // get all category fields
        let sqlquery = "SELECT * FROM category"
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("category.ejs", {category: result, search: ''});
            }
        });
    });



    app.post("/category", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        let sqlquery = "SELECT * FROM category WHERE category LIKE '%" + keyword + "%'"
        // execute sql query
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("category.ejs", {category: result, search: keyword});
            }
        });
    });



    //get request that sends the render of the format.ejs page
    app.get("/format", function (req, res) {
        // get all format fields
        let sqlquery = "SELECT * FROM format"
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("format.ejs", {format: result, search: ''});
            }
        });
    });



    app.post("/format", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        let sqlquery = "SELECT * FROM format WHERE format LIKE '%" + keyword + "%'"
        // execute sql query
        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                res.render("format.ejs", {format: result, search: keyword});
            }
        });
    });



    //get request that sends the render of the cover.ejs page
    app.get("/cover", function (req, res) {
        // get the cover table field data, as well as the book title from book table
        let sqlquery = "SELECT * FROM cover;" +
                        "SELECT book.title FROM book INNER JOIN cover ON book.id = book_id ORDER BY book.id;"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("cover.ejs", {cover: result[0], title: result[1], search: ''});
            }
        });
    });



    app.post("/cover", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        // get the cover table field datas, as well as the book title from book table
        let sqlquery = "SELECT * FROM cover INNER JOIN book ON book_id = book.id WHERE book.title LIKE '%" + keyword + "%';" +
                       "SELECT book.title FROM book INNER JOIN cover ON book.id = book_id WHERE book.title LIKE '%" + keyword + "%';"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("cover.ejs", {cover: result[0], title: result[1], search: keyword});
            }
        });
    });



    //get request that sends the render of the inventory.ejs page
    app.get("/inventory", function (req, res) {
        // get the inventory table field data, as well as the book title from book table
        let sqlquery = "SELECT * FROM inventory;" +
                       "SELECT book.title FROM book INNER JOIN cover ON book.id = book_id ORDER BY book.id;"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("inventory.ejs", {inventory: result[0], title: result[1], search: ''});
            }
        });
    });



    app.post("/inventory", function (req, res) {
        // search for the keyword in the database
        let keyword = [req.body.keyword]
        // get the inventory table field datas, as well as the book title from book table
        let sqlquery = "SELECT * FROM inventory INNER JOIN book ON book_id = book.id WHERE book.title LIKE '%" + keyword + "%';" +
                       "SELECT book.title FROM book INNER JOIN inventory ON book.id = book_id WHERE book.title LIKE '%" + keyword + "%';"

        db.query(sqlquery, function (err, result, fields) {
            if (err) throw err;
            else {
                //console.log(result[0]);
                //console.log(result[1]);
                res.render("inventory.ejs", {inventory: result[0], title: result[1], search: keyword});
            }
        });
    });
}