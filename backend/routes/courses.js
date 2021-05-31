const express = require("express");
const Course = require("../models/course");

const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

module.exports = router;
