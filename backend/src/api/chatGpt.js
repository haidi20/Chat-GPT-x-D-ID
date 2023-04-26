const axios = require('axios');
const moment = require('moment');
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

    // David: Can I help you with anything ? 

    prompt = `
        Imagine yourself as David, you are a doctor general practitioners giving 
        suggestion about health patient. just your response, don't use 'David :'

        Patient : ${req.body.message}
    `;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        temperature: 0,
    });

    text = response?.data?.choices[0]?.text;
    text = text.replace(/<\/?[^>]+(>|$)/g, "").trim();
    // text = "Hi, doctor. To be honest, I'm feeling quite stressed lately";

    // const linkVideo = await storeDid(text);

    res.json({
        response: text,
        // linkVideo: linkVideo,
    });
});

const storeDid = async (message) => {
    let response = "";

    const options = {
        method: 'POST',
        url: 'https://api.d-id.com/talks/tlk_5ByRLB3sSVpT4f9wCz5Ct',
        headers: {
            // accept: 'application/json',
            // authorization: 'Basic bmhhaWRpaUB5YWhvby5jb20:ehTHZ6_GoQ5ndrNhDuVTt',
            'Content-Type': 'application/json', // Set the content type to JSON
            'X-API-Key': 'Basic bmhhaWRpaUB5YWhvby5jb20:ehTHZ6_GoQ5ndrNhDuVTt',
        },
        data: {
            "script": {
                "type": "text",
                "input": "Hi, My Name is David, Can I help you with anything ?",
                "provider": {
                    "type": "microsoft",
                    "voice_id": "en-US-DavisNeural",
                    "voice_config": {
                        "style": "Chat"
                    }
                }
            },
            "config": {
                "stich": "true"
            },
            "source_url": "https://create-images-results.d-id.com/DefaultPresenters/Billy_m/image.jpeg"
        }
    };

    await axios
        .request(options)
        .then(function (responses) {
            console.log(responses.data);
            response = responses.data;
        })
        .catch(function (error) {
            console.error(error);
        });

    return response;
}

module.exports = router;