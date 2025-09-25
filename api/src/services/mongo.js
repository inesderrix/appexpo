const mongoose = require('mongoose');
const { MONGODB_ENDPOINT } = require('../../config');

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectToMongoDB() {
    try {
        await mongoose.connect(MONGODB_ENDPOINT, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

connectToMongoDB();

