const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


mongoose.connect("mongodb://localhost:27017/loginDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to database");
});

const userSchema = new mongoose.Schema({name: String, email: String, password: String});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;

    User.findOne({
        email: email
    }, (err, foundUser) => {
        if (foundUser) {
            res.send({message: "User already registered"});
        } else {
            const newUser = new User({name: name, email: email, password: password});
            newUser.save(err => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({message: "Successfully registered, Please Login now!"});
                }
            });
        }
    });
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;

    User.findOne({
        email: email
    }, (err, foundUser) => {
        if (foundUser) {
            if (password === foundUser.password) {
                res.send({message: "Login successful", user:foundUser});
            } else {
                res.send({message: "Password did not match"});
            }
        } else {
            res.send({message: "User not registered"});
        }
    });


});

app.listen(4000, () => {
    console.log("Server is running at port 4000")
});
