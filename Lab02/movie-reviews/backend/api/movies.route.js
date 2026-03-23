// api/movies.route.js (cập nhật)
import express from 'express';
import MoviesController from './movies.controller.js';

const router = express.Router();

// Gắn controller vào route
router.route('/').get(MoviesController.apiGetMovies);

export default router;
