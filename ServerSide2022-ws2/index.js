const express = require('express')
const app = express()
const port = 3000

const newsMiddleware = require('./lib/middleware')
const home = require('./routes/home')
const staff = require('./routes/staff')
const cookieParser = require('cookie-parser');
app.use(express.static('public'));

const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/SS2022'

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// var data = {
//     "foil": {
//         "name": "foil",
//         "dob": "01/01/1998",
//         "imageurl": "/images/foilimage1.png",
//         "hobbies": ["Jokes", "Gags", "Stand up"]
//     },

//     "amine": {
//         "name": "amine",
//         "dob": "24/12/2001",
//         "imageurl": "/images/aminemojito.jfif"
//     },

//     "baptiste": {
//         "name": "baptiste",
//         "dob": "06/11/2002",
//         "imageurl": "/images/baptiste.jpg"
//     }
// }


mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}).
    catch(error => {
        console.log('Database connection refused' + error);
        process.exit(2);
    })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});

app.use(express.urlencoded({ extended: true }))


app.use(newsMiddleware)
app.use(cookieParser("una is great"));
app.use('/', home)
app.use('/staff', staff)

// custom 404 page
app.use((req, res) => {
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.render('500');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
