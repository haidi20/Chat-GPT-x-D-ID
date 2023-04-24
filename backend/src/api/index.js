const express = require('express');

const chatGpt = require('./chatGpt');
const Did = require('./Did');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/chat-gpt', chatGpt);
router.use('/D-ID', Did);

module.exports = router;
