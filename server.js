import pets from './pets';

const express = require('express');
const app = express();
app.locals.pets = [];
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Pet Book';

app.locals.pets = pets

app.get('/api/v1/pets', (request, response) => {
  const pets = app.locals.pets;

  response.json({ pets });
});

app.get('/api/v1/pets/:id', (request, response) => {
  const { id } = request.params;

  const pet = app.locals.pets.find(pet => pet.id === parseInt(id));
  if (!pet) {
    return response.sendStatus(404);
  }

  response.status(200).json(pet);
});

app.post('/api/v1/pets', (request, response) => {
  const id = Date.now();
  const pet = request.body;

  for (let requiredParameter of ['name', 'ownersName']) {
    if (!pet[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { name: <String>, ownersName: <String> }. You're missing a "${requiredParameter}" property.` });
      return
    }
  }

  const { name, nickname, age, funFact, ownersName, type } = pet;
  app.locals.pets.push({ id, name, nickname, age, funFact, ownersName, type});
  response.status(201).json({ id, name, nickname, age, funFact, ownersName, type});
});

app.delete('/api/v1/pets/:id', (request, response) => {
  const { id } = request.params;

  const petToDelete = app.locals.pets.find((pet) => {
    return pet.id === parseInt(id)
  });

  if (!petToDelete) {
    return response.sendStatus(404);
  }

  const filteredPets = app.locals.pets.filter(pet => pet.id != id);

  app.locals.pets = filteredPets

  response.sendStatus(204);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

module.exports = app