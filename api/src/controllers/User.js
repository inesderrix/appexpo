const User = require('../models/User');
const router = require('express').Router();

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { email, firstName, lastName, password } = req.body;
        const existingUser = await User.find({ email });
        console.log(existingUser);  
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const newUser = new User({ email, firstName, lastName, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        user.last_login = Date.now();
        await user.save();
        res.status(200).json({ message: 'Login successful' });
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


module.exports = router;