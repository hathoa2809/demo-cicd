const pool = require('./db');

module.exports = (app) => {
  app.get('/health', async (req, res) => {
    try {
      await pool.query('SELECT 1');

      res.status(200).json({
        status: 'UP',
        database: 'CONNECTED',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('DB ERROR:', err);

      res.status(500).json({
        status: 'DOWN',
        database: 'DISCONNECTED',
        error: err.message || err,
        stack: err.stack 
      });
    }
  });
};