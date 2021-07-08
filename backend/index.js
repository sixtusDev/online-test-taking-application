require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const home = require("./routes/home");
const courses = require("./routes/courses");
const exam = require("./routes/exam");
const error = require("./middleware/error");
const app = express();

// mongodb://localhost:27017/cbt
mongoose
  .connect(
    "mongodb+srv://sixtus:hariet@cluster0.b1aop.mongodb.net/CBT?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Could not connect to mongodb... ", err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use("/api/start", home);
app.use("/api/exam", exam);
app.use("/api/courses", courses);

app.use(error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CBT Backend listening at port ${PORT}`);
});
