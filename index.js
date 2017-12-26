let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {extended: true}
));

app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("Param func: " +req.param("name")); //Gets the data from query string parameters
    console.log("Query String: " + req.query.name); //Gets the data from query string (GET request)
    console.log("Body attribute: " +req.body.name); //Gets the data of POST request
    res.write('<a href="/name">Home</a>', "text/html");
    res.end();
});

app.get("/name", (req,res) => {
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/name", (req,res) => {
    console.log("Name : " + req.body.name);
    res.json({'msg': 'name is ' + req.body.myname});
    res.end();
})

app.listen(8080, () => {
    console.log("Server started at http://localhost:8080");
});