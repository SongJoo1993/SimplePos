const router = require("express").Router();
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const userFilePath = __dirname + "/../data/users.json";


function readUserFile() {
    const userFile = fs.readFileSync(userFilePath, 'utf-8')
    const userData = JSON.parse(userFile);
    return userData;
}


/* CREATE new user */
router
    .post('/register', (req,res) => {
        const { first_name, last_name, phone, address, email, password } = req.body;

        if (!first_name || !last_name || !phone || !address || !email || !password) {
            return res.status(400).send("Please enter the required fields.");
        }

    })

module.exports = router;