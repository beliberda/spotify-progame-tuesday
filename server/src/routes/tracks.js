const express = require('express');

module.exports = (upload) => {
    const router = express.Router();

    // Загрузка трека
    router.post('/upload', upload.none(), (req, res) => {
        try {
            const {
                title,
                artist,
                duration,
                album_id,
                release_year,
                genre
            } = req.body;

            // Обработка файлов
            const trackFile = req.files?.find(f => f.fieldname === 'track');
            const previewFile = req.files?.find(f => f.fieldname === 'preview');
            // Валидация обязательных полей
            if (!trackFile) {
                return res.status(400).json({ error: 'Трек не загружен' });
            }

            // Подготовка данных
            const trackData = [
                title,
                artist,
                duration,
                album_id || null,
                release_year,
                genre,
                trackFile.path,
                previewFile?.path || null
            ];

            // SQL-запрос с новыми полями
            db.run(`
            INSERT INTO tracks (
              title, 
              artist, 
              duration, 
              album_id, 
              release_year, 
              genre, 
              file_path, 
              preview_path
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, trackData, function (err) {
                if (err) return res.status(400).json({ error: err.message });

                res.status(201).json({
                    id: this.lastID,
                    title,
                    artist,
                    duration,
                    album_id,
                    release_year,
                    genre,
                    file_path: trackFile.path,
                    preview_path: previewFile?.path || null
                });
            });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при загрузке трека' });
        }
    });

    // Добавление трека в плейлист
    router.post('/addToPlaylist', (req, res) => {
        const { playlist_id, track_id } = req.body;
        db.run(
            'INSERT INTO playlist_tracks (playlist_id, track_id) VALUES (?, ?)',
            [playlist_id, track_id],
            (err) => {
                if (err) return res.status(400).json({ error: err.message });
                res.json({ success: true });
            }
        );
    });

    // Удаление трека из плейлиста
    router.delete('/removeFromPlaylist', (req, res) => {
        const { playlist_id, track_id } = req.body;
        db.run(
            'DELETE FROM playlist_tracks WHERE playlist_id = ? AND track_id = ?',
            [playlist_id, track_id],
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true });
            }
        );
    });

    return router;
};