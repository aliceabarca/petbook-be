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
    age: 2.5, 
    funFact: 'hes had 2 types of tape worms', 
    ownersName: 'Judy',
    type: 'Cat'
  },
  {
    id: 2, 
    name: 'Duke', 
    nickname: 'Doodle-bee', 
    age: 19, 
    funFact: 'He likes to go for car rides', 
    ownersName: 'Alex',
    type: 'Dog'
  },
  {
    id: 3,
    name: 'Pluto', 
    nickname: 'Pluto', 
    age: 1, 
    funFact: 'hes really fun', 
    ownersName: 'Paulina',
    type: 'Cat'
  },
  {
    id: 4, 
    name: 'Rocco', 
    nickname: 'Rocco', 
    age: 1, 
    funFact: 'hes really really fun', 
    ownersName: 'Alice',
    type: 'Dog'
  },
  {
    id: 5, 
    name: 'Dusty', 
    nickname: 'Dustin Dustwald Dusty Weasel Wensloff', 
    age: 5, 
    funFact: 'He loves to sploot in a creek', 
    ownersName: 'Jocelyn Wensloff',
    type: 'Dog'
  },
  {
    id: 6, 
    name: 'Ivan', 
    nickname: 'Bubba/Baby', 
    age: 10, 
    funFact: 'He loves toilet paper!', 
    ownersName: 'Banjamin Hatch',
    type: 'Dog'
  },
  {
    id: 7, 
    name: 'Sentinel', 
    nickname: 'Sen', 
    age: 5, 
    funFact: 'Her preferred toy is mesh potato bags', 
    ownersName: 'Renee Pinna',
    type: 'Cat'
  },
  {
    id: 8, 
    name: 'Khaleesi', 
    nickname: 'Leesi/Khalees', 
    age: 7, 
    funFact: 'She doesn\'t like citrus fruit but will eat anything else', 
    ownersName: 'Josh Bennett',
    type: 'Dog'
  },
  {
    id: 9, 
    name: 'Clyde', 
    nickname: 'Clyborg, the glide, Clyderman, Clydawg, etc.', 
    age: 1.5, 
    funFact: 'He\'s the runt of his litter!', 
    ownersName: 'Avery Berryman',
    type: 'Dog'
  },
  {
    id: 10, 
    name: 'Tir', 
    nickname: '', 
    age: null, 
    funFact: '', 
    ownersName: 'Parvin Sattorova',
    type: 'Dog'
  },
  {
    id: 11, 
    name: 'Echo', 
    nickname: 'echo whecko', 
    age: 3, 
    funFact: 'Echo loves to play outside with the chickens', 
    ownersName: 'Scotty Brown',
    type: 'Dog'
  },
  {
    id: 12, 
    name: 'Rocky', 
    nickname: 'Rockaroo', 
    age: 13, 
    funFact: 'he loves to sleep under the deck during the day', 
    ownersName: 'Jen Ziel',
    type: 'Dog'
  },
  {
    id: 13, 
    name: 'Bailey', 
    nickname: 'bear boyyyy/sweet man/honey boy', 
    age: 10, 
    funFact: 'bailey has two metal knees', 
    ownersName: 'Lauren DeLaRosa',
    type: 'Dog'
  },
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

  for (let requiredParameter of ['name', 'ownersName']) {
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

