let express = require("express");
let bodyParser = require("body-parser"); //To read the data from GET/POST request
let cron = require("node-cron"); //For scheduling tasks
let fs = require("fs"); //File Stream (used to read, write, delete files on server file system)

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
));

app.use(express.static("public"));

let mongoose = require("mongoose");

//Connection String
let mongoDB = "mongodb://127.0.0.1:27017/phonebook";

//Connecion Initiaized
mongoose.connect(mongoDB, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on("error", console.error.bind(console, 'MongoDB Connection Error: '));

//Create Schema

let Schema = mongoose.Schema;
let ContactSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    address: String,
    city: String,
    phone: String
});

//Create Model

let ContactModel = mongoose.model('ContactModel', ContactSchema);

app.get("/", (req, res) => {
    res.redirect("/view");
});

app.get("/view", (req, res) => {
    ContactModel.find({}, (err, Contacts) => {
        console.log(Contacts);
        res.json(Contacts);
        res.end();
    });
    //res.sendFile(__dirname + "/public/view.html");
});

app.get("/create", (req, res) => {
    res.sendFile(__dirname + "/public/create.html");
});

app.post("/create", (req, res) => {
    let ContactInstance = new ContactModel({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone
    });

    ContactInstance.save((err) => {
        if(err) {
            throw err;
        }
        res.redirect("/view");
    });
});

app.get("/delete/:id", (req, res) => {

});

app.listen(8080, () => {
    console.log("Server started at http://localhost:8080/create");
});