const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


router.post('/store', async (req, res) => {
    let text = "";
    let prompt = "";

    prompt = `
        Imagine yourself as Sarah, you are a motivator giving life advice to others.

        Sarah : Can I help you with anything ? 
        Client : ${req.body.message}
    `;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        temperature: 0,
    });

    text = response?.data?.choices[0]?.text;

    res.json({
        response: text,
    });
});

module.exports = router;