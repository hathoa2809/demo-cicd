const request = require('supertest');
const app = require('../../src/app');
const pool = require('../../src/db');

describe('Integration Test: Students API', () => {
    it('Should return correct status for existing students', async () => {
        const res = await request(app).get('/api/v1/students');
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        
        const students = res.body.data;

        const john = students.find(s => s.name === 'John Smith');
        expect(john).toBeDefined();
        expect(john.status).toBe('PASSED');

        const david = students.find(s => s.name === 'David Johnson');
        expect(david).toBeDefined();
        expect(david.status).toBe('FAILED');

        const michael = students.find(s => s.name === 'Michael Brown');
        expect(michael).toBeDefined();
        expect(michael.status).toBe('PASSED');
    });
});
