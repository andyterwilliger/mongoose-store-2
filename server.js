const express = require('express');

const mongoose= require('mongoose');

const app= express();

require('dotenv').config();


//Database connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//Database error/success

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//middleware
app.use(express.urlencoded({extended: true}));


//routes

app.post('/products', (req, res) => {
    res.send(req.body)
})







const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening at ${PORT}`))