const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const connectDB = require('../config/db');
const User = require('../models/User');

beforeAll(async () => {
    await connectDB();
    await User.deleteMany({}); // Clear users for clean test
});

afterAll(async () => {
    if (mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
});

describe('Auth API', () => {
    
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                role: 'user'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register duplicate user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toMatch(/User already exists/);
    });

    it('should login with valid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpass'
            });
        
        expect(res.statusCode).toEqual(401);
    });
});
