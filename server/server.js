var express = require('express');
const path = require('path');
//console.log(__dirname + '/../public'); //works but not ideal way. use node library (path).
const publicPath = path.join(__dirname, '../public');
//console.log(publicPath);

var app = express();
const port = process.env.PORT || 3000;
app.use(express.static(publicPath)); //express middleware. you can now visit localhost:3000/help.html


app.listen(port, ()=>{
    console.log(`Started on Port ${port}`);
});