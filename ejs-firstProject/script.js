const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const mid1 = (req, res, next) => {
    console.log('middleware1 executed');
    next();
}
const mid2 = (req, res, next) => {
    console.log('middleware2 executed');
    // res.end();
    next();
}
app.use(mid1);
app.use(mid2);

app.get('/', (req, res) => {
    res.render('home', {
        users: [
            { name: 'mani', age: 22 },
            { name: 'ravi', age: 21 }
        ]
    });
});

const PORT =3000;
app.listen(PORT, () => {
    console.log(`server is running on port 3000, http://localhost:3000`);
});