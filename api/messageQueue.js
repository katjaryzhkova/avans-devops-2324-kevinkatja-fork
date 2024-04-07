const amqplib = require('amqplib');
const { db } = require("./services/database");

const connectToQueue = async (queueName) => {
    const connection = await amqplib.connect('amqp://messagebus');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    return channel;
};

const worker = async () => {
    const channel = await connectToQueue("userQueue");
    await channel.consume("userQueue", async (message) => {
        const data = JSON.parse(message.content.toString());

        const user = await db.collection('users').insertOne(data.data);

        const resChannel = await connectToQueue(data.resQueueName);
        resChannel.sendToQueue(data.resQueueName, Buffer.from(JSON.stringify(user)));

        channel.ack(message);
    });
};

const do_worker = async () => {
    // Wait 15 seconds before starting worker to ensure message bus is ready
    setTimeout(worker, 15000);
}

module.exports = do_worker