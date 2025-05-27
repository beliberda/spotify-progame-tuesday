const express = require('express');
const db = require('../database.js');
const router = express.Router();

// Регистрация пользователя
router.post('/register', (req, res) => {
    const { name, email } = req.body;
    db.run(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, name, email });
        }
    );
});

// Получение информации о пользователе
router.get('/login', (req, res) => {

    db.get('SELECT * FROM users WHERE email = ?', [req.query.email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

module.exports = router;