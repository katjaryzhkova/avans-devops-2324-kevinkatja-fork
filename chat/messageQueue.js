const amqplib = require('amqplib');
const crypto = require('crypto');

class Request {
    reqQueueName = null
    resQueueName = null

    reqChannel = null
    resChannel = null

    constructor(queueName) {
        this.reqQueueName = queueName
        this.resQueueName = crypto.randomUUID()
    }

    async connect() {
        const connection = await amqplib.connect('amqp://messagebus');

        const reqChannel = await connection.createChannel();
        await reqChannel.assertQueue(this.reqQueueName);

        const resChannel = await connection.createChannel();
        await resChannel.assertQueue(this.resQueueName);

        this.reqChannel = reqChannel
        this.resChannel = resChannel
    }

    request(data) {
        if (this.reqChannel == null) {
            console.log("reqChannel not initialized! call Request.connect() first")
            return
        }

        this.reqChannel.sendToQueue(this.reqQueueName, Buffer.from(JSON.stringify({
            resQueueName: this.resQueueName, data
        })));
    }

    async response() {
        if (this.resChannel == null) {
            console.log("resChannel not initialized! call Request.connect() first")
            return
        }

        let response = false
        while (!(response = await this.resChannel.get(this.resQueueName))) { /* empty */ }

        return JSON.parse(response.content.toString())
    }
}

module.exports = Request