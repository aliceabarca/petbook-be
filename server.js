const express = require('express');
const app = express();
app.locals.pets = [];
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Pet Book';

app.locals.pets = [
  {
    id: 1, 
    name: 'Oreo', 
    nickname: 'Oreo', 
    age: '2.5', 
    funFact: 'hes had 2 types of tape worms', 
    ownersName: 'Judy',
    type: 'Cat'
  },
  {
    id: 2, 
    name: 'Duke', 
    nickname: 'Doodle-bee', 
    age: '19', 
    funFact: 'He likes to go for car rides', 
    ownersName: 'Alex',
    type: 'Dog'
  },
  {
    id: 3,
    name: 'Pluto', 
    nickname: 'Pluto', 
    age: '1', 
    funFact: 'hes really fun', 
    ownersName: 'Paulina',
    type: 'Cat'
  },
  {
    id: 4, 
    name: 'Rocco', 
    nickname: 'Rocco', 
    age: '1', 
    funFact: 'hes really really fun', 
    ownersName: 'Alice',
    type: 'Dog'
  }
];


app.get('/', (request, response) => {
  response.send('Oh hey Pet Book');
});

app.get('/api/v1/pets', (request, response) => {
  const pets = app.locals.pets;

  response.json({ pets });
});

app.get('/api/v1/pets/:id', (request, response) => {
  const { id } = request.params;
  const pet = app.locals.pets.find(pet => pet.id === id);
  if (!pet) {
    return response.sendStatus(404);
  }

  response.status(200).json(pet);
});

app.post('/api/v1/pets', (request, response) => {
  const id = Date.now();
  const pet = request.body;

  for (let requiredParameter of ['name', 'nickname']) {
    if (!pet[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.` });
      return
    }
  }

  const { name, nickname, age, funFact, ownersName, type } = pet;
  app.locals.pets.push({ id, name, nickname, age, funFact, ownersName, type});
  response.status(201).json({ id, name, nickname, age, funFact, ownersName, type});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

