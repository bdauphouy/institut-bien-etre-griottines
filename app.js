const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const axios = require('axios');
const sendEmail = require('./scripts/mail');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  fetch('http://localhost:3000/api/care.json', {
    method: 'GET',
    headers: {
      'secret-key': process.env.API_SECRET,
    },
  })
    .then(res => res.json())
    .then(data => {
      res.render('index', {
        data: data[0],
      });
    });
});

app.post('/send-message', (req, res) => {
  sendEmail(req.body);
  res.json({
    redirect: '/',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on port ' + PORT));
