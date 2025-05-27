const express = require('express');
const db = require('../database');
const router = express.Router();

// Создание плейлиста
router.post('/', (req, res) => {
    const { user_id, title } = req.body;
    db.run(
        'INSERT INTO playlists (user_id, title) VALUES (?, ?)',
        [user_id, title],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, user_id, title });
        }
    );
});


router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    db.all(`
      SELECT 
        p.id,
        p.title,
        p.user_id,
        u.name AS user_name,
        u.email AS user_email,
        COUNT(pt.track_id) AS track_count
      FROM playlists p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN playlist_tracks pt ON p.id = pt.playlist_id
      GROUP BY p.id
      LIMIT ? OFFSET ?
    `, [pageSize, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Получаем общее количество плейлистов для пагинации
        db.get('SELECT COUNT(*) AS total FROM playlists', (err, countRow) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                playlists: rows,
                pagination: {
                    page,
                    pageSize,
                    total: countRow.total,
                    totalPages: Math.ceil(countRow.total / pageSize)
                }
            });
        });
    });
});


// Получение всех плейлистов пользователя
router.get('/user/:user_id', (req, res) => {
    db.all(
        'SELECT * FROM playlists WHERE user_id = ?',
        [req.params.user_id],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

// Получение треков плейлиста
router.get('/:id/tracks', (req, res) => {
    db.all(`
    SELECT t.* 
    FROM tracks t
    JOIN playlist_tracks pt ON t.id = pt.track_id
    WHERE pt.playlist_id = ?
  `, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;