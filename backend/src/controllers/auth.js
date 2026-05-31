// importing model
const { User } = require('../models/user');
// importing bcrypt for hashing password
const bcrypt = require("bcrypt");
// importing jsonwebtoken for creating token
const jwt = require("jsonwebtoken");
const SALT = Number(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;

async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body;

        if (fullName && email && password) {
            const newUser = await User.create({
                fullName,
                email,
                password: bcrypt.hashSync(password, SALT),
            });
            console.log(newUser);

            const token = jwt.sign(
                { id: newUser.dataValues.id },
                JWT_KEY,
                { expiresIn: "24h" }
            );

            res.status(201).json({
                message: "User created successfully",
                email: newUser.dataValues.email,
                token,
            });
        } else {
            throw new Error("All fields are required");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `${err}`
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const foundUser = await User.findOne({ where: { email } });

        if (!foundUser) {
            throw new Error("User not found");
        }

        const { dataValues: user } = foundUser;

        const verifyPsw = await bcrypt.compare(password, user.password);

        if (!verifyPsw) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign(
            { id: user.id },
            JWT_KEY,
            { expiresIn: "24h" }
        );
        res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `${err}`
        });
    }
}

module.exports = { registerUser, loginUser };