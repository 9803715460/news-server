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

let count = 0;

//Starts the job as soon as server starts
// cron.schedule("*/10 * * * * *", () => {
//     count++;
//     console.log("Current count : " + count);
// });

//A simple job which can be started and stopped
let job = cron.schedule("*/10 * * * * *", () => {
    count++;
    console.log("Current Count is " + count);
}, false);

app.get("/", (req, res) => {
    console.log("Param func: " + req.param("name")); //Gets the data from query string parameters
    console.log("Query String: " + req.query.name); //Gets the data from query string (GET request)
    console.log("Body attribute: " + req.body.name); //Gets the data of POST request
    res.write('<a href="/name">Home</a>', "text/html");
    res.end();
});

app.get("/name", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    job.start();
});

app.post("/name", (req, res) => {
    console.log("Name : " + req.body.name);
    res.json({ 'msg': 'name is ' + req.body.myname });
    res.end();
    job.stop();
});

//A job which does not execute if one instance is already running
let uniqueCounter = 0;
let fileName = "cron.lock";
let uniqueJob = cron.schedule("*/5 * * * * *", () => {
    if(!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName);
        uniqueCounter++;
        console.log("File Created.");
        console.log("Counter is " + uniqueCounter);

        //Manually delete file to see that task continues.

        //Dummy Logic
        // sql.insert(query, () => {
        //     fs.unlinkSync("cron.lock") //Delete the file when job is completed
        // });
    }
}, false);

uniqueJob.start();

app.listen(8080, () => {
    console.log("Server started at http://localhost:8080");
});