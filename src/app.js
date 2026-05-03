const express = require('express');
const pool = require('./db');
const { calculateStatus } = require('./services/grade');

const app = express();
app.use(express.json());

app.get('/api/v1/students', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM students ORDER BY id ASC');
        const data = rows.map(s => ({ ...s, status: calculateStatus(Number(s.score)) }));
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

require('./health')(app); 

module.exports = app;
