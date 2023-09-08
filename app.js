const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, "/public")));

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
})

const upload = multer({
    storage: storage
});

app.get('/', (req, res) => {
    res.render('upload');
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server now running at port ${port}`);
});