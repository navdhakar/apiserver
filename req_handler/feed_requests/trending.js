const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require("body-parser");

router.use(cors({
    origin: '*'
}));

router.get('/trending_feed', (req, res) =>{
    res.send("contacting trending page app server");
}); 
module.exports = router;