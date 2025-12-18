const passport = require("passport");
const router = require('express').Router();

const ItemsObject = require('../models/Item');

router.post('/',  passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}),async (req, res) => {
    try {
        const { title, userId } = req.body;
        const newItem = new ItemsObject({ title, user: userId });
        const savedItem = await newItem.save();
        res.status(201).send(savedItem);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/', passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}), async (req, res) => {
    try {
        const { userId } = req.query;
        const items = await ItemsObject.find({ user: userId });
        res.status(200).send(items);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/active', passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}), async (req, res) => {
    try {
        const { userId } = req.query;
        const items = await ItemsObject.find({ checked: false, user: userId });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/history',  passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}),async (req, res) => {
    try {
        const { userId } = req.query;
        const items = await ItemsObject.find({ checked: true, user: userId });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id/check', passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}), async (req, res) => {
    try {
        const item = await ItemsObject.findByIdAndUpdate(
            req.params.id,
            { checked: true },
            { new: true }
        );
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
router.delete('/:id',  passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}),async (req, res) => {
    try {
        await ItemsObject.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item supprimé" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/clear/:userId', passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
}), async (req, res) => {
    try {
        const { userId } = req.params;
        const { type } = req.query; 

        let filter = { user: userId };

        if (type === 'active') filter.checked = false;
        else if (type === 'history') filter.checked = true;

        const result = await ItemsObject.deleteMany(filter);
        res.status(200).json({ message: `Items supprimés (${type || 'all'})`, deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;