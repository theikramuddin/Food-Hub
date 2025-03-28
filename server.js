const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 4000;

//Assests
app.use(express.static('public'));

//set template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cart', (req, res) => {
    res.render('customers/cart')
})

app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.get('/register', (req, res) => {
    res.render('auth/register')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
