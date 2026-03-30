import cors from 'cors';
import cookieParser from 'cookie-parser';
import prisma from './DB/connectDB';
import dotenv from 'dotenv';
import express from 'express';
import heroRoutes from './routes/heroRoutes';
import productRoutes from './routes/productRoutes';
import categories from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/hero', heroRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categories);
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.json("Backend Running");
});

prisma.$connect()
    .then(() => console.log('Database connected successfully'))
    .catch((err: any) => console.log('Database connection failed', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;