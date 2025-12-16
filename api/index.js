require("dotenv").config();
const morgan = require("morgan");
const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000
const mongoose = require('mongoose');
require("./src/services/mongo");

const itemsRouter = require('./src/controllers/Item');
const userRouter = require('./src/controllers/User');

console.log("hello")

app.use(morgan("tiny"));
app.use(express.json()); 
app.use(cors({ credentials: true, origin: "*" }));

app.use('/items', itemsRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

