const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
current_auth_uri = "http://localhost:8002/auth/api/users/current";
proctor_home_uri = "http://127.0.0.1:8000/home_page";



router.use(cors({
    origin: '*'
}));



function current_auth_check(){
    fetch(current_auth_uri).
    then(response => response.text()).
    then(data => console.log(data));
}
api_comms_data = {
    req_path:"home_feed",
}

const namespace = "[home_feed]:";
router.get('/home_feed', (req, res) =>{
    console.log(namespace + "request recieved");
    
    if(req.headers['authorization']!==undefined||null){
        current_auth_check();  
          // Example POST method implementation:
        async function getData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers:{
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          // body data type must match "Content-Type" header
        }); 
        return response.text(); // parses JSON response into native JavaScript objects
        }
      
        getData(proctor_home_uri, api_comms_data)
        .then(data => {
          res.send(data); // JSON data parsed by `data.json()` call
        });
    }
    else{
        console.log('generating random home page');
        res.send("random home page");
    }
}); 
module.exports = router;