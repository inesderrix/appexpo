const User = require('../models/User');
const router = require('express').Router();

router.post('/signup', async (req, res) => {
    try {
        console.log("BODY SIGNUP 👉", req.body);
        const { email, first_name, last_name, password } = req.body;
        const existingUser = await User.findOne({ email });  
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const newUser = new User({ email, firstName: first_name, lastName: last_name, password });
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password }).select(
            "_id email firstName lastName"
        );

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        await User.findByIdAndUpdate(user._id, {
            last_login: new Date(),
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/all", async (req, res) => {
    try {
        const users = await User.find(); 
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;