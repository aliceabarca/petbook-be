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
    id: '1', 
    petName: 'Oreo', 
    petNickname: 'Oreo', 
    petAge: '2.5', 
    petFunFact: 'hes had 2 types of tape worms', 
    petOwnersName: 'Judy',
    type: 'Cat'
  },
  {
    id: '2', 
    petName: 'Duke', 
    petNickname: 'Doodle-bee', 
    petAge: '19', 
    petFunFact: 'He likes to go for car rides', 
    petOwnersName: 'Alex',
    type: 'Dog'
  },
  {
    id: '3',
    petName: 'Pluto', 
    petNickname: 'Pluto', 
    petAge: '1', 
    petFunFact: 'hes really fun', 
    petOwnersName: 'Paulina',
    type: 'Cat'
  },
  {
    id: '4', 
    petName: 'Rocco', 
    petNickname: 'Rocco', 
    petAge: '1', 
    petFunFact: 'hes really really fun', 
    petOwnersName: 'Alice',
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

  for (let requiredParameter of ['petName', 'petNickname']) {
    if (!pet[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.` });
      return
    }
  }

  const { petName, petNickname, petAge, petFunFact, petOwnersName, type } = pet;
  app.locals.pets.push({ id, petName, petNickname, petAge, petFunFact, petOwnersName, type});
  response.status(201).json({ id, petName, petNickname, petAge, petFunFact, petOwnersName, type});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

