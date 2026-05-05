import MoviesDAO from '../dao/moviesDAO.js';

export default class MoviesController {
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.rated && req.query.rated !== "All Ratings") {
            filters.rated = req.query.rated;
        }
        if (req.query.title) {
            filters.title = req.query.title;
        }

        console.log("apiGetMovies filters:", filters);
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
            filters,
            page,
            moviesPerPage,
        });
        console.log("apiGetMovies total results:", totalNumMovies);

        res.json({
            movies: moviesList,
            page,
            filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        });
    }

    static async apiGetMovieById(req, res, next) {
        try {
            const id = req.params.id || {};
            console.log("apiGetMovieById id:", id);
            const movie = await MoviesDAO.getMovieById(id);
            console.log("apiGetMovieById found:", !!movie);

            if (!movie) {
                return res.status(404).json({ error: 'not found' });
            }

            return res.json(movie);
        } catch (e) {
            console.error(`apiGetMovieById error: ${e}`);
            return res.status(500).json({ error: e.message || e.toString() });
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            const ratings = await MoviesDAO.getRatings();
            return res.json(ratings);
        } catch (e) {
            console.error(`apiGetRatings error: ${e}`);
            return res.status(500).json({ error: e.message || e.toString() });
        }
    }
}
