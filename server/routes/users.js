const router = require('express').Router();
const User = require("../models/users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

/* Create New User*/ 
router.post("/register", (req,res) => {
    const { first_name, last_name, email, password, position, phone, address} = req.body;

    if(!first_name || !last_name || !email || !password || !position || !phone || !address) {
        return res.status(400).send('Please enter required fields!');
    } 

    bcrypt
    .hash(password, 8)
    .then((hashedPassword) => {
        return new User ({
            ...req.body,
            password: hashedPassword
        }).save();
    })
    .then(() => {
        res.status(201).send("Registered Successfully!")
    })
    .catch(() => {
        res.status(402).send("Failed Registration!")
    });
});

/* Login User*/
router.post("/login",(req,res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(401).send("Please enter the required fields!")
    }

    User.where({email:email})
    .fetch()
    .then(user => {
        const isPasswordCorrect = bcrypt.compareSync(password, user.attributes.password);
        
        if(!isPasswordCorrect) return res.status(400).send("Invalid Password!");

        const token = jwt.sign(
            {id: user.id, email: user.attributes.email},
            process.env.REACT_APP_JWT_SECRET,
            {expiresIn: "24h"}
            )
        res.json({token});
    })
    .catch(() => res.status(400).send("Invalid Credentials!"))
})


/* Fetch User Info */
router.get("/current", (req,res) => {
    if (!req.headers.authorization) return res.status(401).send("Please Login!");
    
    const authToken = req.headers.authorization.split(" ")[1];

    jwt.verify(authToken, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).send("Invalid auth Token!")
        
        User.where({email: decoded.email})
        .fetch()
        .then(user => {
            res.json({...user.attributes, password: null});
        })
        .catch(() => res.status(400).send("Invalid Token!"))
    });
});

module.exports = router;