require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./dbconnect");
const StudentModel = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

//gensalt & Secret key for encrypting password
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

//db connection
connectDB(process.env.MONGO_URL);
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

//routes
//SignUp Route
app.post("/signup", (req, res) => {
  const { firstname, lastname, email, password, department } = req.body;
  // Checking if the email is already in use
  StudentModel.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json("Email is already in use");
      }
      // If email is not in use, create a new user
      StudentModel.create({
        firstname,
        lastname,
        email,
        password: bcrypt.hashSync(password, salt),
        department,
      })
        .then((newUser) => {
          // Sign or creating and sending a token upon successful signup
          jwt.sign(
            { email: newUser.email, id: newUser._id },
            secret,
            {},
            (err, token) => {
              if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
              }
              res.cookie("token", token).json({
                id: newUser._id,
                email: newUser.email,
              });
            }
          );
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

//Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email: email })
    .then((student) => {
      if (!student) {
        return res.status(404).json("User Not Found!");
      }
      const passOK = bcrypt.compareSync(password, student.password);
      if (passOK) {
        jwt.sign(
          { email: student.email, id: student._id },
          secret,
          {},
          (err, token) => {
            if (err) {
              return res.status(500).json({ error: "Internal Server Error" });
            }
            res.cookie("token", token).json({
              id: student._id,
              email: email,
            });
          }
        );
      } else {
        res.status(400).json({ error: "Wrong Credentials!" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal Server Error" }));
});

//Forgot Password Route
app.post("/forgotpassword", (req, res) => {
  return res.json("Success");
});

//Dashboard Route
app.get("/dashboard", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json("Token Not Found!");
  }

  // Verifing the JWT token and getting the user's ID from the payload
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.json("Token is Invalid!");
    }

    const userId = decoded.id;

    // Query the database to get the user's first name and last name
    StudentModel.findById(userId)
      .select("firstname lastname")
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).json("User Not Found!");
        }

        res.json({
          firstName: user.firstname,
          lastName: user.lastname,
        });
      })
      .catch((err) => {
        res.status(500).json("Internal Server Error");
      });
  });
});

//View all Student
app.get("/getstudent", (req, res) => {
  StudentModel.find()
    .then((students) => res.json(students))
    .catch((err) => res.json(err));
});

//View a single student detail
app.get("/update/:id", (req, res) => {
  const id = req.params.id;
  StudentModel.findById({ _id: id })
    .then((students) => res.json(students))
    .catch((err) => res.json(err));
});

//Updating Student Detail
app.put("/updatestudent/:id", (req, res) => {
  const id = req.params.id;
  StudentModel.findByIdAndUpdate(
    { _id: id },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      department: req.body.department,
    }
  )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

//Deleting a User
app.delete("/deletestudent/:id", (req, res) => {
  const id = req.params.id;
  StudentModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

//Logout Route
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}!`);
});
