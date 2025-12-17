const ItemsObject = require('../models/Item');
const router = require('express').Router();


router.post('/', async (req, res) => {
    try {
        const { title, userId } = req.body;
        const newItem = new ItemsObject({ title, user: userId });
        const savedItem = await newItem.save();
        res.status(201).send(savedItem);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const items = await ItemsObject.find({ user: userId });
        res.status(200).send(items);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/active', async (req, res) => {
    try {
        const { userId } = req.query;
        const items = await ItemsObject.find({ checked: false, user: userId });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/history', async (req, res) => {
    try {
        const { userId } = req.query;
        const items = await ItemsObject.find({ checked: true, user: userId });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedItem = await ItemsObject.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ItemsObject.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item supprimé" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;