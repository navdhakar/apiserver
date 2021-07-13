const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
let customer;
const fs = require("fs");
fs.readFile("links.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      links = JSON.parse(jsonString);
      console.log("Customer address is:", links); // => "Customer address is: Infinity Loop Drive"
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });;
  
  
app.get('/', (req, res) =>{
    res.send(links);
});
app.listen(8002);
