const express = require("express");
const fs = require("fs");
const axios = require("axios");

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





// ====================PRACTICE============================== 


















app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });