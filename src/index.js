const express = require('express');
const fs = require('fs').promises;
const path = require('path');
// const myTalkers = require('./talker.json');
const crypto = require('crypto');

const talkersPath = path.resolve(__dirname, './talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const readTalkers = async () => {
  try {
    const talkersJson = await fs.readFile(talkersPath);
    const talkers = JSON.parse(talkersJson);
    console.log(talkers);
    return talkers;
  } catch (error) {
    console.error('Erro');
  }
};

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();
  const errorCase = [];
  if (!talkers) {
    return errorCase;
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkers();
  const talkersById = talkers.find((talker) => talker.id === Number(req.params.id));
  if (!talkersById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkersById);
});

app.post('/login', async (_req, res) => {
  const token = generateToken();  
  return res.status(HTTP_OK_STATUS).json({ token }); 
});

function main() {
  readTalkers();
}

main();
