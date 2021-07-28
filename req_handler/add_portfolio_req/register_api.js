const express = require('express');
const router = express.Router();
const cors = require('cors');
const fetch = require('node-fetch');
const email_verification = require('../../middleware/email_verification');
const { response } = require('express');
user_add_uri = "http://localhost:8002/auth/api/users";
proctor_add_portfolio_uri = "http://127.0.0.1:8000/proctor_register";

router.use(cors({
    origin: '*'
}));

var user_personel_data = {};
var user_global_data = {};
var generated_otp;

const namespace = "[register_api]:";
router.post('/add_portfolio', (req, res) =>{
    user_personel_data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,   
    }
    console.log(namespace + user_personel_data.email);
    user_global_data = {
        name:req.body.name,
        group:req.body.group,
        portfolio_url:req.body.portfolio_url,
    }
    console.log(namespace + user_global_data.portfolio_url);
    console.log(namespace + user_global_data.group);
    email_verification(req.body.email).then((value) => {
      console.log(value);
      generated_otp = value;
    })

    
    res.send({response:"verify email"});
    
});

router.post('/verify_email', (req, res) =>{
console.log(req.body.email_otp)
sent_otp = req.body.email_otp;
console.log("generated otp" + generated_otp)
console.log("sent otp" + sent_otp)
if(generated_otp==req.body.email_otp){
  //post request for api server to add personel info
  fetch(user_add_uri, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      body: JSON.stringify(user_personel_data),
      // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((data) => {
        
        res.send(data);
        console.log(data._id);
        console.log(data.name);
        console.log(data.token_data);
        return data
      })
      .then((data) => {
          console.log(namespace + 'data sended to user')
          //post request for proctor to add global info of a user.
          user_global_data.owner_id = data._id;
          console.log(user_global_data.owner_id)
          fetch(proctor_add_portfolio_uri, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors',
              body: JSON.stringify(user_global_data),
              // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              // body data type must match "Content-Type" header
            })
            .then((proct_resp) => proct_resp.text())
            .then((proct_data) => console.log(namespace + "[proctor sender]" + proct_data));
      })
      .then(() =>{
          console.log("proctor data recieved");
      });
    }
    else{
      console.log("otp didn't match")
      res.send({response_to_user:"otp didn't match"});
    }
})


//exporting module as router to use in api server routing.  
module.exports = router;