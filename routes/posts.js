import express from 'express';

import { createPost, deletePost, getPost, getPosts, getPostsBySearch, likePost, updatePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likepost', auth, likePost);

export default router;
