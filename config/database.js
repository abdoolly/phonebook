const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

mongoose.Promise = Promise;
const getConnectionUri = async () => {
    if (process.env.NODE_ENV === 'test') {
        const mongo = new MongoMemoryServer({ autoStart: true });
        return await mongo.getUri(true);
    }

    return `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`;
};

const connectToDB = async (mongoUri) => {
    console.log(`DB connecting...`);
    mongoose.connection.on('error', () => {
        console.log(`Could not connect to MongoDB`);
    });

    mongoose.connection.on('connected', () => {
        console.log(`MongoDB successfully connected`);
        process.emit('DBConnected');
    });

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

getConnectionUri()
    .then(connectToDB)
    .catch(err => console.log(err));

module.exports = mongoose;