const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes')
const dbConfig = require('./config/db');


const PORT = 8000;
const app = express();


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
console.log("connected")

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'XYZ!@#',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbConfig.url })
}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
});


app.use('/auth',authRoutes);
app.use('/image',imageRoutes);

app.listen(PORT,()=> {
    console.log(`Server is Running on port ${PORT}`);
})


