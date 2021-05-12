const express = require("express");
const fs = require("fs");
const axios = require("axios");
const morgan = require("morgan");

const app = express();
const port = 3000;

/* ================================= */

// a middleware that enables us to read the received JSON data
app.use(express.json());

/* ================================= */

//*** http://localhost:3000/
app.get('/', (req, res) => {
  console.log('GET /');
  res.status(200);
  res.json('SERVER IS WORKING');
});

// ===================PULSE CHECK============================ 
const users = [];

// 1
const logUsers = (req, res, next) => {
  console.log(users)
  next()
  };

// 2
// application level
app.use(logUsers)



// 3
const logMethod = (req, res, next) => {
  console.log(req.method)
  next()
};






// 4
//already exists as a built in middleware i didnt creat it, another example is (static)
// app.use(express.json());


// 5
/*
lets use app.use( ...) because it will be 
initiated on anything that turning on the application 
(any thing you write in postman after *http://localhost:3000/* number , letter , post , get ..) 
*/

app.use( (req, res, next) => {
  if(users.length === 0){
  /*best practice is to use !users to make it false or (for empty array)
  users.length === 0  to make it true because an empty string is false so when you put it in if 
  it will be already false (smth like this)
  */
 
  // create a new error
  const err = new Error("No users");
  err.status = 500;
  // pass it to next, we only pass values to `next` when we want to call the error handling middleware
  next(err);
}else{
  next()
}

});






// 0  && //3
app.get("/users", logMethod, (req, res, next) => {
  res.json(users);
  });
/* res.json(users); is the response of that route 
(/users) best practice is not to add any res.json untill
 you finish the code of that route otherwise it will not read 
 anything after that (unless you use next() butttt its not recommended)
 try to meke the end of the route the response


for puls check No 3
another way to write it is :
app.use("/users", logMethod);

buttt here it will be applied to all methods (get , post , delete , ... etc))
the first method will be only applied on just (get) method of that route.
*/



//5 part 2
// error handling middlewares have a different function signature, they take four parameters instead of three
app.use((err, req, res, next) => {
  // set the status code
  res.status(err.status);
  // send the response in JSON format
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});












// ====================PRACTICE============================== 


















app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });