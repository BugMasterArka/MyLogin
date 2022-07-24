const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());
app.use(express.static("public"));

// available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/print',require('./routes/print'))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.listen(port,()=>{
    console.log("Server running on port 3000");
});