// dao/moviesDAO.js
let movies; // Biến lưu tham chiếu tới collection

export default class MoviesDAO {
    // Gọi 1 lần duy nhất khi khởi động server
    static async injectDB(conn) {
        if (movies) return; // Đã kết nối rồi thì bỏ qua
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
        } catch (e) {
            console.error(`Không thể kết nối MoviesDAO: ${e}`);
        }
    }

    // Lấy danh sách phim với phân trang và bộ lọc
    static async getMovies({ filters = null, page = 0, moviesPerPage = 20 } = {}) {
        let query;

        // Xây dựng query theo bộ lọc
        if (filters) {
            if ('title' in filters) {
                query = { $text: { $search: filters['title'] } };
            } else if ('rated' in filters) {
                query = { rated: { $eq: filters['rated'] } };
            }
        }

        let cursor;
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page);

            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);

            return { moviesList, totalNumMovies };
        } catch (e) {
            console.error(`Lỗi khi truy vấn: ${e}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }
}
