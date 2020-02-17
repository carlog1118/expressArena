const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen (8000, () => {
    console.log('Express server is listening to port 8000!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('We dont serve the here. Never call again!');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base Url: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greeting', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        return res.status(400).send('Please provide a race');
    }

    const greeting= `Greetings ${name} the ${race}, welcome to our kingdom.`;

    res.send(greeting);
});

app.get('/sum', (req, res) => {
    const {a, b} = req.query;

    if(!a) {
        return res
            .status(400)
            .send('a is required');
    }

    if(!b) {
        return res
            .status(400)
            .send('b is required');
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if(Number.isNaN(numA)) {
        return res
            .status(400)
            .send('a must be a number');
    }
    
      if(Number.isNaN(numB)) {
        return res
            .status(400)
            .send('b must be a number');
    }
    
    const c = numA + numB;
    
    const responseString = `The sum of ${numA} and ${numB} is ${c}`;
         
    res
        .status(200)
        .send(responseString);
});