const auth = require("../middleware/auth");
const login_auth = require("../middleware/login_auth");
const bcrypt = require("bcrypt");
const { Hire, validate } = require("../models/hire.model");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

console.log("route");
router.post("/work", async (req, res) => {
  console.log("blogs requested");
  console.log(req.body.id);
  if (req.body.id) {
    const hire = await Hire.findById(req.body.id);
    res.send(hire);
  } else {
    const hire = await Hire.find({});
    res.send(hire);
  }
});

router.post("/login", login_auth, async (req, res) => {
  console.log(req.auth_token);
  res.send({
    token_data: req.auth_token,
  });
});

router.post("/hire_us", async (req, res) => {
  console.log("hire_route:-request recieved");
  //validate the request body first
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // //find an existing Hire
  // let hire = await Hire.findOne({ email: req.body.service_required });
  // if (hire) return res.status(400).send("project already exist");
  hire = new Hire({
    title: req.body.title,
    image: req.body.image,
    blog_description: req.body.blog_description,
    date: req.body.date,
    // email: req.body.email,
    // project_title: req.body.project_title,
    // technology_required: req.body.technology_required,
    // budget: req.body.budget,
    // required_experience: req.body.required_experience,
    // service_required: req.body.service_required,
  });
  // hire.password = await bcrypt.hash(hire.password, 10);
  await hire.save();
  console.log(req.body.title);
  // const token = hire.generateAuthToken();
  res.send({
    response: "post submitted",
  });
});

module.exports = router;
