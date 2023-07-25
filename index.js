const express = require('express');
const userRoutes= require('./src/user/routes');

const app = express();

app.use(express.json());

//test route
app.get("/", function(req,res){
  res.send("Hello World");
})

//routes
app.use('/users', userRoutes);

app.listen(3002, function(){
  console.log("Database connected");
})
