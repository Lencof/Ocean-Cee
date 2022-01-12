const {
    Router
} = require('express')
const router = Router()
const express = require('express');
const app = express();

// Chatcord page
app.get('/chatcord', function (req, res) {
    res.send('chatcord');
});

module.exports = router