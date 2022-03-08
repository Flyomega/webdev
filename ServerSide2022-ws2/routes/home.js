const express = require('express');
const router = express.Router();
const linksForHome = 
[ {url: 'https://www.youtube.com/watch?v=ork83__IUWs' , text : 'PopCat'},
{ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', text : 'Are u sure u wanna click ?'}];

router.get('/',  (req, res) => {

    var message = "";
     
    if (req.signedCookies.tracking){
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Last time you visited was : " + dateLastVisit;
    }
    var currentDate = new Date();
    res.cookie('tracking',currentDate.toDateString(), {signed : true});

    res.render('home', {'message': message, links : linksForHome});
});



// router.get('/about',  (req, res) => {
//     res.type('text/plain');
//     res.send('About Our Holidays');
// });

// router.get('/contact',  (req, res) => {
//     res.type('text/plain');
//     res.send('Don\'t bother we never reply');
// });

module.exports = router;