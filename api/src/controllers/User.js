const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = require('express').Router();
const md5 = require("md5");

const User = require('../models/User');
const config = require("../../config");

const JWT_MAX_AGE = "6m";

router.post('/signup', async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const hashedPassword = md5(password);

        const newUser = new User({ email, firstName: first_name, lastName: last_name, password:hashedPassword });
        await newUser.save();


        const token = jwt.sign({ _id: newUser.id }, config.SECRET, {
            expiresIn: JWT_MAX_AGE,
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = md5(password);

        const user = await User.findOne({ email, hashedPassword }).select(
            "_id email firstName lastName"
        );

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        await User.findByIdAndUpdate(user._id, {
            last_login: new Date(),
        });

        const token = jwt.sign({ _id: user.id }, config.SECRET, {
            expiresIn: JWT_MAX_AGE,
        });
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            token,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/all", passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}), async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;