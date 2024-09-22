//Imports
const express = require('express');

//Config
require('dotenv').config();

const app = express()

app.use(express.json()); //Permite a interpretação de JSON pela aplicação

module.exports = app