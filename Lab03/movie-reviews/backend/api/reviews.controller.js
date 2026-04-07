import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id ?? req.body.mssv,
            };
            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(movieId, userInfo, review, date);

            if (reviewResponse.error) {
                return res.status(500).json({ error: reviewResponse.error.message });
            }

            return res.json({ status: 'success' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const userId = req.body.user_id ?? req.body.mssv;
            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(reviewId, userId, review, date);

            const { error } = reviewResponse;
            if (error) {
                return res.status(500).json({ error: error.message || error.toString() });
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error('unable to update review. User may not be original poster');
            }

            return res.json({ status: 'success' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id ?? req.body.mssv;

            const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);

            if (reviewResponse.error) {
                return res.status(500).json({ error: reviewResponse.error.message });
            }

            return res.json({ status: 'success' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
}
