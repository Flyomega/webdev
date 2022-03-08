const express = require('express');
const router = express.Router();

var data = {
    "nounours": {
        "name": "nounours",
        "dob": "Unknown",
        "imageurl": "/images/trotro.png",
        "description": "This teddy bear is very friendly with humans. He usually lives alone for 5 or 6 years before joining a family. It is useful to help children feel better when they are alone."
    },

    "amine": {
        "name": "amine",
        "dob": "24/12/2001",
        "imageurl": "/images/aminemojito.jfif",
        "description": "This guy is very handsome as you can see on the picture below. He likes partying and going out with some friends instead of doing homework."
    },

    "baptiste": {
        "name": "baptiste",
        "dob": "06/11/2002",
        "imageurl": "/images/baptiste.jpg",
        "description": "For sure the best friend you can have. He is always here for you even it should be the other way around... 19 years of Valentine's Day spent alone."
    }
}

router.get('/addnew', (req, res) => {
    res.render('personform')
})


// router.post('/addnew', (req, res) => {
//     console.log("Data sent via post");
//     console.table(req.body);
//     res.redirect(303, 'personadded')
// })

router.get('/personadded', (req, res) => {
    res.render('personadded')
})

router.get('/', (req, res) =>
    res.render('listing', { personlist: data }))

router.get('/:name', (req, res) => {
    var name = req.params.name;
    if (name in data) {
        res.render('person', { person: data[name] })
    }
    else {
        res.status(404);
        res.send('404 - Not Found');
    }
})


module.exports = router;