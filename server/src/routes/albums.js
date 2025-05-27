const express = require('express');
const db = require('../database');
const router = express.Router();

// Создание альбома
router.post('/', (req, res) => {
    const { title, artist, release_date, genre, cover_image } = req.body;
    db.run(`
    INSERT INTO albums 
    (title, artist, release_date, genre, cover_image) 
    VALUES (?, ?, ?, ?, ?)
  `, [title, artist, release_date, genre, cover_image],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});

// Получение альбома с треками
router.get('/:id', (req, res) => {
    db.get(`
    SELECT * FROM albums 
    WHERE id = ?
  `, [req.params.id], (err, album) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(`
      SELECT * FROM tracks 
      WHERE album_id = ?
    `, [req.params.id], (err, tracks) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ ...album, tracks });
        });
    });
});
router.post('/:albumId/tracks', (req, res) => {
    const { trackId } = req.body;

    // Проверяем существование альбома
    db.get('SELECT * FROM albums WHERE id = ?', [req.params.albumId], (err, album) => {
        if (err) return res.status(500).json({ error: 'Ошибка проверки альбома' });
        if (!album) return res.status(404).json({ error: 'Альбом не найден' });

        // Обновляем track.album_id
        db.run('UPDATE tracks SET album_id = ? WHERE id = ?',
            [req.params.albumId, trackId],
            function (err) {
                if (err) return res.status(400).json({ error: err.message });
                res.json({
                    success: true,
                    track_id: trackId,
                    album_id: req.params.albumId,
                    affected_rows: this.changes
                });
            }
        );
    });
});

module.exports = router;