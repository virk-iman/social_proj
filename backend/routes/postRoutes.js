import express from 'express';
import { createPost, getPosts, likePost, commentPost } from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
    .post(protect, upload.single('image'), createPost)
    .get(getPosts);

router.route('/:id/like')
    .put(protect, likePost);

router.route('/:id/comment')
    .post(protect, commentPost);

export default router;
