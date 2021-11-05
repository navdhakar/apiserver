const auth = require("../middleware/auth");
const login_auth = require("../middleware/login_auth");
const bcrypt = require("bcrypt");
const { Hire, validate } = require("../models/hire.model");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

console.log("route");
router.get("/work", auth, async (req, res) => {
  const hire = await Hire.findById(req.hire._id).select("-password");
  res.send(hire);
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
    company_name: req.body.company_name,
    email: req.body.email,
    contact_no: req.body.contact_no,
    project_title: req.body.project_title,
    project_description: req.body.project_description,
    technology_required: req.body.technology_required,
    time_limit: req.body.time_limit,
    budget: req.body.budget,
    required_experience: req.body.required_experience,
    service_required: req.body.service_required,
  });
  // hire.password = await bcrypt.hash(hire.password, 10);
  await hire.save();
  console.log(req.body.company_name);
  const token = hire.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: hire._id,
    company_name: req.body.company_name,
    email: req.body.email,
    contact_no: req.body.contact_no,
    project_title: req.body.project_title,
    project_description: req.body.project_description,
    technology_required: req.body.technology_required,
    time_limit: req.body.time_limit,
    budget: req.body.budget,
    required_experience: req.body.required_experience,
    service_required: req.body.service_required,
    token_data: token,
  });
});

module.exports = router;
