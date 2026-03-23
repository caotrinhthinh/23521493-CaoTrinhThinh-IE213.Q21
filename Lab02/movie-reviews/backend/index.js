// index.js
import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from './dao/moviesDAO.js';

async function main() {
    dotenv.config(); // Nạp biến từ file .env

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT || 8000;

    try {
        // 1. Kết nối tới MongoDB Atlas
        await client.connect();
        console.log('Kết nối MongoDB thành công!');

        // 2. Inject DB vào DAO (phải chạy trước khi start server)
        await MoviesDAO.injectDB(client);

        // 3. Khởi chạy server
        app.listen(port, () => {
            console.log('Server đang chạy tại port: ' + port);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);
