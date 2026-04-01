import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import path from 'path';

dotenv.config();

const app = express();

// Replace app.use(cors()); with this block:
app.use(cors({
    origin: 'https://social-proj-roan.vercel.app', // ⚠️ REPLACE THIS with your exact Vercel URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = 5001;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/social-app')
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));
