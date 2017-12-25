let express = require("express");
let app = express();



app.get("/", (req, res) => {
    //res.write("<h1>Hello world</h1>", "text/html");
    res.json({'msg': 'Hello world'});
    res.end();
});
app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(8080, () => {
    console.log("Server started at http://localhost:8080");
});