const express = require('express');
const app = express();
app.locals.pets = [];
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Book';

app.locals.pets = [
  { id: '1', ownerName: 'Judy', petName: 'Oreo', type: 'cat', breed: 'domesticShorthair'},
  { id: '2', ownerName: 'Alex', petName: 'Duke', type: 'dog', breed: 'schnoodle'},
  { id: '3', ownerName: 'Paulina', petName: 'Pluto', type: 'cat', breed: 'Bombay'},
  { id: '4', ownerName: 'Alice', petName: 'Rocco', type: 'dog', breed:'pitbull'},
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

  for (let requiredParameter of ['name', 'type']) {
    if (!pet[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.` });
      return
    }
  }

  const { name, type } = pet;
  app.locals.pets.push({ name, type, id });
  response.status(201).json({ name, type, id });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

