const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello, I work!');
});

app.post('/processImage', upload.single('file'), (req, res) => {
  res.json({ size: req.file.size });
});

app.listen(PORT, () => console.log('Server is running on port 5000'));
