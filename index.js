//Imports
const express = require('express');
const cors = require('cors')

//Config
require('dotenv').config();

const app = express()

app.use(express.json()); //Permite a interpretação de JSON pela aplicação
app.use(cors()); //Permite que o angular acesse a API

module.exports = app