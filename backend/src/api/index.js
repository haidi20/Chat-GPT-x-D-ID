const express = require('express');

const chatGpt = require('./chatGpt');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/chat-gpt', chatGpt);

module.exports = router;
