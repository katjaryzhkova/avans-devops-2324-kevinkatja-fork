const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);
const db = client.db(process.env.DB_NAME || "chat");

module.exports = {
    db,
    client
};
