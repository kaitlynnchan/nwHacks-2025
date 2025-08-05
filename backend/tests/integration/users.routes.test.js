const request = require('supertest');
const { app } = require('../../src/main');
const { Challenge } = require('../../src/models/challenges.model');
const { User } = require('../../src/models/users.model');

const { connect, closeDatabase, clearDatabase } = require('../db-handler');
const { generateSupabaseToken } = require('../supabase');

process.env.NODE_ENV = 'test';

afterAll(async () => await closeDatabase());

afterEach(async () => await clearDatabase());

describe('User Routes', () => {
    let token;
    
    const user1 = {
        userId: 'adfgiowerlnsvspokgdfdf',
        email: 'test@example.com'
    }

    const challenge1 = {
        title: 'Test Challenge',
        description: 'Do something hard',
        points: 10,
        difficulty: 'Hard',
        category: 'challenge',
        estimatedTime: 60,
        requirements: ['complete something hard']
    };

    const userChallenge1 = {
        completed: true, 
        notes: 'completed challenge yay'
    }

    beforeAll(async () => {
        await connect();
        token = generateSupabaseToken(user1);
    });

    it('create a user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send(user1);

        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe(user1.email);
    });

    it('get user details with valid token', async () => {
        const user = await User.create({
            _id: user1.userId,
            email: user1.email
        });

        const res = await request(app)
            .get(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe(user.email);
    });

    it('return 401 for user fetch with missing token', async () => {
        const res = await request(app)
            .get(`/api/users/sdkfsleweflksmldkf`);

        expect(res.statusCode).toBe(401);
    });

    it('link a challenge to user', async () => {
        const challenge = await Challenge.create(challenge1);
        const user = await User.create({
            _id: user1.userId,
            email: user1.email
        });

        const res = await request(app)
            .post(`/api/users/${user._id}/challenge/${challenge._id}`)
            .send(userChallenge1)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(201);
        expect(res.body.userChallenge.challengeId).toBe(challenge._id.toString());
    });

    it('get all user challenges', async () => {
        const challenge = await Challenge.create(challenge1);
        const user = await User.create({
            _id: user1.userId,
            email: user1.email,
            challenges: [
                {
                    challengeId: challenge._id,
                    completed: userChallenge1.completed, 
                    notes: userChallenge1.notes
                }
            ]
        });

        const res = await request(app)
            .get(`/api/users/${user._id}/challenges`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].challengeId).toBe(challenge._id.toString());
    });

    it('get a specific user challenge', async () => {
        const challenge = await Challenge.create(challenge1);
        const user = await User.create({
            _id: user1.userId,
            email: user1.email,
            challenges: [
                {
                    challengeId: challenge._id,
                    completed: userChallenge1.completed, 
                    notes: userChallenge1.notes
                }
            ]
        });

        const res = await request(app)
            .get(`/api/users/${user._id}/challenge/${challenge._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.challengeId).toBe(challenge._id.toString());
    });

});
