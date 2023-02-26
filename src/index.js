const express = require('express');
const fs = require('fs').promises;
const path = require('path');
// const myTalkers = require('./talker.json');
const crypto = require('crypto');
const validationLogin = require('./middleware/validationLogin');
const { validateAge, validateName, validateRate,
validateTalk,
 validateToken,
  validateWatchedAt } = require('./middleware/validadeTalker');

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

async function writeTalker(newTalker) {
  try {
    const refreshedTalkers = await readTalkers();
    refreshedTalkers.push(newTalker);
    await fs.writeFile(talkersPath, JSON.stringify(refreshedTalkers));
  } catch (error) {
    console.error('error: ', error.message);
  }
} 

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

app.post('/login', validationLogin, async (req, res) => {
  const token = generateToken();  
  res.status(HTTP_OK_STATUS).json({ token }); 
});

app.post('/talker',
validateToken, 
validateName, validateAge, validateTalk, validateWatchedAt,
validateRate,
 async (req, res) => {
  const { name, age } = req.body;
  const { watchedAt, rate } = req.body.talk;
    const myTalkers = await readTalkers();
  const newTalker = {
    id: myTalkers[myTalkers.length - 1].id + 1,
    name,
    age,
    talk: {
      rate,
      watchedAt,
    },
  };
  await writeTalker(newTalker);

  return res.status(201).json(newTalker);
});

function main() {
  // readTalkers();
}

main();
