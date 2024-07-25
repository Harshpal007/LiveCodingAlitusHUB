const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/uploadRoutes')
const dbConfig = require('./config/db');


const PORT = 8000;
const app = express();


mongoose.connect(dbConfig.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log("connected")

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/auth',authRoutes);
app.use('/image',imageRoutes);

app.listen(PORT,()=> {
    console.log(`Server is Running on port ${PORT}`);
})


