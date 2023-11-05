require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const OpenAIApi = require('openai');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({ key: API_KEY });

app.use(cors()); // Only allow requests from your frontend domain

app.post('/get-recommendations', async (req, res) => {
  try {
    const { Weight, Height, Gender, Diet, Budget} = req.body;

    const message = `
    Given a weight of ${Weight}, a height of ${Height}, a gender of ${Gender}, a diet of ${Diet}, and a price of ${Budget}
    
    Give me 5 items that are great things to buy at a grocery store, that comply with the diet of the individual and the budget of
    how much they are willing to spend at the grocery store
    If the diet is either vegetarian or vegan, please don't give any meat products
    please don't write anything else in your response, just list them out with a number correlating each grocery item importance,
    with a line break after each activity`;


    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    const responseContent = chatCompletion.choices && chatCompletion.choices[0]?.message?.content;
    if (responseContent) {
      res.json({ recommendations: responseContent });
    } else {
      res.status(500).json({ error: 'Failed to get recommendations' });
    }
  } catch (error) {
    console.error("Error making API call:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
