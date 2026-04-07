const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Register request:', req.body);
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }
        const saltRounds = 2;
        const hash = await bcrypt.hash(password, saltRounds);
        res.send(`User ${username} registered. Password hash: ${hash}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000 at http://localhost:4000');
});