const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = new sqlite3.Database('./data.db');

// Ensure upload folder exists
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});
const upload = multer({ storage });

// POST /api/companies - create a company profile
app.post('/api/companies', upload.single('document'), (req, res) => {
  const {
    name, legal_name, email, phone, address, website, description
  } = req.body;

  const document_path = req.file ? `/uploads/${req.file.filename}` : null;

  const stmt = db.prepare(`INSERT INTO company_profile
    (name, legal_name, email, phone, address, website, description, document_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  stmt.run(name, legal_name, email, phone, address, website, description, document_path, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB insert failed' });
    }
    res.json({ id: this.lastID });
  });
});

// GET /api/companies - list all companies
app.get('/api/companies', (req, res) => {
  db.all(`SELECT * FROM company_profile ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/companies/:id
app.get('/api/companies/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM company_profile WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// PUT /api/companies/:id/verify ?status=verified|rejected
app.put('/api/companies/:id/verify', (req, res) => {
  const id = req.params.id;
  const status = req.body.status || req.query.status;
  if (!['verified', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  db.run(`UPDATE company_profile SET status = ? WHERE id = ?`, [status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ id, status });
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
