const request = require('supertest')
const app = require('../../app')
const { db, client } = require('../../database');

describe('Get chat log', () => {
    beforeEach(async () => {
        await db.collection('chatlog').deleteMany({});
    });

    afterAll(async () => {
        client.close();
    });

    it('should get the entire chat log', async () => {
        const expected = {
            sender: "123456789abcdef",
            message: "Test message",
            timestamp: Date.now()
        };

        await db.collection('chatlog').insertOne(expected);
        delete expected._id;

        const res = await request(app).get('/logs')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toEqual(expect.objectContaining(expected));
    });
});
