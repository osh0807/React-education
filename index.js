const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("config.mongoURI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("err"));

app.get("/", (req, res) => res.send("Hello World! hihi"));
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// app.post("/login", (req, res) =>{
// User.findOne({email: req.body.email}, (err, user) => {
//  if(!user){
// return res.json({
//     loginsuccess: false,
//     message: "This email is not registered"
//   })
//  }

//  user.comparePassword(req.body.password, (err, isMatch) => {
//   if(!isMatch)
//   return res.json({loginSuccess: false, message: "wrong password"})

//   user.generateToken((err, user)) => {

//   }
//  })

// })
// })

app.listen(port, () =>
  console.log("Example app listening on port" + port + "!")
);
