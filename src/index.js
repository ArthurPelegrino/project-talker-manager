const express = require('express');
const fs = require('fs').promises;
const path = require('path');
// const myTalkers = require('./talker.json');

const talkersPath = path.resolve(__dirname, './talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

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

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();
  const errorCase = [];
  if (!talkers) {
    return errorCase;
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
});

function main() {
  readTalkers();
}

main();
