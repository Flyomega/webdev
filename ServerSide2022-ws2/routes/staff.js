const express = require('express');
const router = express.Router();
const { readStaff } = require('../models/staff');
const { createStaff } = require('../models/staff');

// var data = {
//     "nounours": {
//         "name": "nounours",
//         "dob": "Unknown",
//         "imageurl": "/images/trotro.png",
//         "description": "This teddy bear is very friendly with humans. He usually lives alone for 5 or 6 years before joining a family. It is useful to help children feel better when they are alone."
//     },

//     "amine": {
//         "name": "amine",
//         "dob": "24/12/2001",
//         "imageurl": "/images/aminemojito.jfif",
//         "description": "This guy is very handsome as you can see on the picture below. He likes partying and going out with some friends instead of doing homework."
//     },

//     "baptiste": {
//         "name": "baptiste",
//         "dob": "06/11/2002",
//         "imageurl": "/images/baptiste.jpg",
//         "description": "For sure the best friend you can have. He is always here for you even it should be the other way around... 19 years of Valentine's Day spent alone."
//     }
// }


router.post('/addnew', (req, res) => {
    console.log("Data sent via post");
    console.table(req.body);
    res.redirect(303, 'personadded')
})

router.get('/addnew', (req, res) => {
    var fname = req.query.firstname;
    var sname = req.query.surname;
    console.log('Date entered ' + fname + ' ' + sname);
    res.render('personform')
})


router.get('/personadded', (req, res) => {
    res.render('personadded')
})

router.get('/', async (req, res) => {
    const staff = await readStaff();

    res.render('listing', { personlist: staff })

})

router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const person = await readStaff({ 'name': name })

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('person', { person: person });
    }
})



// router.get('/', (req, res) =>
//     res.render('listing', { personlist: data }))

// router.get('/:name', (req, res) => {
//     var name = req.params.name;
//     if (name in data) {
//         res.render('person', { person: data[name] })
//     }
//     else {
//         res.status(404);
//         res.send('404 - Not Found');
//     }
// })


module.exports = router;