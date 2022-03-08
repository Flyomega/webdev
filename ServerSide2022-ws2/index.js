const express = require('express')
const app = express()
const port = 3000

const newsMiddleware = require('./lib/middleware')
const home = require('./routes/home')
const staff = require('./routes/staff')
const cookieParser = require('cookie-parser');
app.use(express.static('public'));



// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var data = {"foil" : { "name": "foil",
"dob": "01/01/1998",
"imageurl": "/images/foilimage1.png",
"hobbies": ["Jokes", "Gags", "Stand up"]},

"amine" : { "name": "amine",
"dob": "24/12/2001",
"imageurl": "/images/aminemojito.jfif"},

"baptiste" : { "name": "baptiste",
"dob": "06/11/2002",
"imageurl": "/images/baptiste.jpg"}
}


app.use(express.urlencoded({ extended: true }))


app.use(newsMiddleware)
app.use(cookieParser("una is great"));
app.use('/', home)
app.use('/staff',staff)

// custom 404 page
app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
