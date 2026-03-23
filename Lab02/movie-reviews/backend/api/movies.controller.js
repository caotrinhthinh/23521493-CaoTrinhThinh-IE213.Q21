// api/movies.controller.js
import MoviesDAO from '../dao/moviesDAO.js';

export default class MoviesController {
    static async apiGetMovies(req, res, next) {
        // Lấy tham số từ query string, dùng giá trị mặc định nếu không có
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Xây dựng bộ lọc
        let filters = {};
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }

        // Gọi DAO để lấy dữ liệu
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
            filters,
            page,
            moviesPerPage,
        });

        // Đóng gói và trả về response
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };

        res.json(response);
    }
}
