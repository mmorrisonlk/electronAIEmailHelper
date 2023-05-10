const fs = require('fs');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const makeRequest = require('./openAI');
const prompt = require("prompt-sync")({ sigint: true });

let email;

async function getEmail() {
  const data = fs.readFileSync('./email.json', 'utf8');
  email = JSON.parse(data)
}

module.exports = getEmail();