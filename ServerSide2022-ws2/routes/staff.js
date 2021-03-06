const express = require('express');
const router = express.Router();
const { readStaff } = require('../models/staff');
const { createStaff } = require('../models/staff');
const { deleteStaff } = require('../models/staff');
const { updateStaff } = require('../models/staff');

session = require('express-session');

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


router.post('/addnew', async (req, res) => {
    await createStaff(req.body);
    req.session.staffdata = { name: req.body.name};
    res.redirect(303, '/staff/personadded')

    // console.log("Data sent via post");
    // console.table(req.body);
    // res.redirect(303, 'personadded')
})

router.get('/addnew', (req, res) => {
    res.render('personform')
})


router.get('/personadded', (req, res) => {
    if (req.session.staffdata) {
        var newName = req.session.staffdata.name;
    }
    else {
        var newName = "";
    }
    res.render('personadded', {newName : newName })
})

router.get('/', async (req, res) => {
    const staff = await readStaff();
    res.render('listing', { personlist: staff})
})


router.get('/:name', async (req, res) => {
    var name = req.params.name;
    const person = await readStaff({ 'name': name })
    console.log(person);

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('person', { person: person });
    }
})

router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;

    await deleteStaff(name);

    res.redirect(303, '/staff');

});

router.post('/:name/edit', async (req,res) =>{

    await updateStaff(req.body);
    
    res.redirect(303, '/staff')

})

router.get('/:name/edit', async (req, res) => {

    var name = req.params.name;

    const person = await readStaff({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('personeditform', { person: person });
    }
})



module.exports = router;