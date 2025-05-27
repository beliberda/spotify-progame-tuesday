const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Albums table
  db.run(`
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      release_date DATE,
      genre TEXT,
      cover_image TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Updated tracks table
  db.run(`
    CREATE TABLE IF NOT EXISTS tracks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      album_id INTEGER REFERENCES albums(id),
      duration INTEGER NOT NULL,
      release_year INTEGER,
      genre TEXT,
      file_path TEXT NOT NULL,
      preview_path TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Playlists table
  db.run(`
    CREATE TABLE IF NOT EXISTS playlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // Playlist tracks junction table
  db.run(`
    CREATE TABLE IF NOT EXISTS playlist_tracks (
      playlist_id INTEGER NOT NULL,
      track_id INTEGER NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(playlist_id, track_id),
      FOREIGN KEY(playlist_id) REFERENCES playlists(id),
      FOREIGN KEY(track_id) REFERENCES tracks(id)
    )
  `);
});

module.exports = db;