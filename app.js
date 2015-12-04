var express = require('express'),
    compression = require('compression'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    location = require('./routes/locations')
    users = require("./routes/users"),
    signup = require("./routes/signup");
    login = require("./routes/login")
    app = express();

app.set('strict routing', true);
app.set('x-powered-by', false);
app.set('Admin', false);
app.use(compression());
//Gives access to our database tables
var dbOptions = {
     host : "localhost",
     user : "root",
     password : "spot",
     port : 3306,
     database : "EnviroWise"
 };

//Allows us to use mysql from the http request
app.use(myConnection(mysql, dbOptions, "single"));
  app.use(bodyParser.urlencoded({extended: false}))
 app.use(bodyParser.json());
 app.engine('handlebars', exphbs({
     defaultLayout: 'main'
 }));
app.set('view engine', 'handlebars');
app.use(express.static('views'));
app.use(express.static('public'));

app.post("/signup",signup.get);
app.post("/signup/update/:id",signup.update);
app.get("/signup/edit/:id",signup.get);
app.get("/signup/delete:id",signup.delete);

app.get("/users", users.checkUser,users.showUsers);
app.get("/users/edit/:id",users.checkUser,users.get);
app.post("/users/update/:id",users.checkUser,users.update);

//Here we rendering the login template to the browser
app.get("/login", function(req, res){
 res.render("login");
})
app.get("/signup", function(req, res){
 res.render("sinup");
})


app.get("/login",login.get);
app.post("/login", login.update);

//api key AIzaSyCLSiuuq-hfTNv9g27d3NFtnmNJiBv0Hm0 
//Here we rendering the about template to the browser
app.get('/about', function(req, res){
  res.render('about');
})

//Here we rendering the collector's template to the browser
app.get('/collector', function(req, res){
  res.render('collector');
})

//Here we rendering the contacts template to the browser
app.get('/contact', function(req, res){
  res.render('contact');
})
//Here we posting to our database
app.post('/contact', function(req, res){
  res.render('contact');
})

app.get('/feedback', function(req, res){
  res.render('feedback');
})

app.post('/locations/add',location.add);
app.get('/',location.show);
app.get('/locations/delete/:id',location.delete);

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
    console.log('EnviroWise running at http://localhost:3000/');
});
