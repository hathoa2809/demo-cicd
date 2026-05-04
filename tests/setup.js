const pool = require('../src/db');

let isClosed = false;

afterAll(async () => {
    if (!isClosed) {
        await pool.end();
        isClosed = true;
    }
});
