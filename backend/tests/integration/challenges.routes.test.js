const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../../src/main');
const { Challenge } = require('../../src/models/challenges.model');

const { connect, closeDatabase, clearDatabase } = require('../db-handler')

process.env.NODE_ENV = 'test';

beforeAll(async () => await connect());

afterAll(async () => await closeDatabase());

afterEach(async () => await clearDatabase());

describe('Challenge Routes', () => {
    const challenge1 = {
        title: 'Test Challenge',
        description: 'Do something hard',
        points: 10,
        difficulty: 'Hard',
        category: 'challenge',
        estimatedTime: 60,
        requirements: ['complete something hard']
    };

    const challenge2 = {
        title: 'New Challenge',
        description: 'Newest',
        points: 100,
        difficulty: 'Hard',
        category: 'Coding',
        estimatedTime: 90,
        requirements: []
    }

    it('create a challenge', async () => {
        const res = await request(app)
            .post('/api/challenges')
            .send(challenge1);

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(challenge1.title);
        expect(res.body.points).toBe(challenge1.points);
    });

    it('get all challenges', async () => {
        await Challenge.create(challenge1);

        const res = await request(app)
            .get('/api/challenges');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe(challenge1.title);
    });

    it('get latest challenge', async () => {
        await Challenge.create([challenge1, challenge2]);

        const res = await request(app)
            .get('/api/challenges/latest');

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(challenge2.title);
    });

    it('get challenge by ID', async () => {
        const challenge = await Challenge.create(challenge1);

        const res = await request(app)
            .get(`/api/challenges/${challenge._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(challenge1.title);
        expect(res.body.id).toBe(challenge._id.toString());
    });

    it('return 404 for missing challenge', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .get(`/api/challenges/${nonExistentId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Challenge not found');
    });

});
