require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage, limits: { fields: 0 } });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/tracks', require('./routes/tracks')(upload));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Что-то пошло не так!' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту http://localhost:${PORT}`);
});