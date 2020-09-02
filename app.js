const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true });
const port = 80;



// define mongose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    age: String,
    profession: String,
    address: String
});

var contact = mongoose.model('contact', contactSchema);


// EXPRESS SPECiFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF______--   THIS IS ALSO DESIGN TEMPLATE
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))



app.get('/', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"
    const params = { 'title': 'kunal sharma', "content": con }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"
    const params = { 'title': 'kunal sharma', "content": con }
    res.status(200).render('contact.pug');
})


app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("this data has been saved to database")
    }).catch(() => {
        res.status(400).send("item not saved")
    });
    // res.status(200).render('contact.pug');
})



app.listen(port, () => {
    console.log(`the application started on the port ${port}`)

})