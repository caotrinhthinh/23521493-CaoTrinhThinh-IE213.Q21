// server.js
import express from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

const app = express();

app.use(cors()); // Cho phép cross-origin request
app.use(express.json()); // Parse body dạng JSON

// Định tuyến chính
app.use('/api/v1/movies', movies);

// Xử lý route không tồn tại (404)
app.use((req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;
