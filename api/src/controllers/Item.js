const ItemsObject = require('../models/Item');
const router = require('express').Router();


router.post('/', async (req, res) => {
    try {
        const newItem = new ItemsObject(req.body);
        const savedItem = await newItem.save();
        res.status(201).send({ item: savedItem });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await ItemsObject.find();
        res.status(200).send({ items });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/active', async (req, res) => {
  try {
      const items = await ItemsObject.find({ checked: false });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history', async (req, res) => {
  try {
      const items = await ItemsObject.find({ checked: true });
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