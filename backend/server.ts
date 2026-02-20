import cors from 'cors';
import pool from './DB/connectDB';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ success: true, time: result.rows[0] });
    } catch (error) {
        res.json({ success: false, error });
    }
});

pool.query('SELECT NOW()').then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log('Database connection failed', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});