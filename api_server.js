const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const auth_route = require('../auth_library/index');
const home_feed = require('./req_handler/feed_requests/home_feed');
const trending_feed = require('./req_handler/feed_requests/trending')
const register = require('./req_handler/add_portfolio_req/register_api')

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*const fs = require("fs");
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
  });;*/
  
ack_msg = {
  user:"on registration server",
}
app.use('/auth', auth_route)
app.use('/register', register)
app.use('/home', home_feed)
app.use('/trending', trending_feed)
app.post('/', (req, res) =>{
  res.send(ack_msg);
  console.log(req.body);
});
app.listen(8002);
