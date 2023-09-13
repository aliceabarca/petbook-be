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
    petName: 'Oreo', 
    petNickname: 'Oreo', 
    petAge: 2.5, 
    petFunFact: 'hes had 2 types of tape worms', 
    petOwnersName: 'Judy',
    type: 'Cat'
  },
  {
    id: 2, 
    petName: 'Duke', 
    petNickname: 'Doodle-bee', 
    petAge: 19, 
    petFunFact: 'He likes to go for car rides', 
    petOwnersName: 'Alex',
    type: 'Dog'
  },
  {
    id: 3,
    petName: 'Pluto', 
    petNickname: 'Pluto', 
    petAge: 1, 
    petFunFact: 'hes really fun', 
    petOwnersName: 'Paulina',
    type: 'Cat'
  },
  {
    id: 4, 
    petName: 'Rocco', 
    petNickname: 'Rocco', 
    petAge: 1, 
    petFunFact: 'hes really really fun', 
    petOwnersName: 'Alice',
    type: 'Dog'
  },
  {
    id: 5, 
    petName: 'Dusty', 
    petNickname: 'Dustin Dustwald Dusty Weasel Wensloff', 
    petAge: 5, 
    petFunFact: 'He loves to sploot in a creek', 
    petOwnersName: 'Jocelyn Wensloff',
    type: 'Dog'
  },
  {
    id: 6, 
    petName: 'Ivan', 
    petNickname: 'Bubba/Baby', 
    petAge: 10, 
    petFunFact: 'He loves toilet paper!', 
    petOwnersName: 'Banjamin Hatch',
    type: 'Dog'
  },
  {
    id: 7, 
    petName: 'Sentinel', 
    petNickname: 'Sen', 
    petAge: 5, 
    petFunFact: 'Her preferred toy is mesh potato bags', 
    petOwnersName: 'Renee Pinna',
    type: 'Cat'
  },
  {
    id: 8, 
    petName: 'Khaleesi', 
    petNickname: 'Leesi/Khalees', 
    petAge: 7, 
    petFunFact: 'She doesn\'t like citrus fruit but will eat anything else', 
    petOwnersName: 'Josh Bennett',
    type: 'Dog'
  },
  {
    id: 9, 
    petName: 'Clyde', 
    petNickname: 'Clyborg, the glide, Clyderman, Clydawg, etc.', 
    petAge: 1.5, 
    petFunFact: 'He\'s the runt of his litter!', 
    petOwnersName: 'Avery Berryman',
    type: 'Dog'
  },
  {
    id: 10, 
    petName: 'Tir', 
    petNickname: '', 
    petAge: null, 
    petFunFact: '', 
    petOwnersName: 'Parvin Sattorova',
    type: 'Dog'
  },
  {
    id: 11, 
    petName: 'Echo', 
    petNickname: 'echo whecko', 
    petAge: 3, 
    petFunFact: 'Echo loves to play outside with the chickens', 
    petOwnersName: 'Scotty Brown',
    type: 'Dog'
  },
  {
    id: 12, 
    petName: 'Rocky', 
    petNickname: 'Rockaroo', 
    petAge: 13, 
    petFunFact: 'he loves to sleep under the deck during the day', 
    petOwnersName: 'Jen Ziel',
    type: 'Dog'
  },
  {
    id: 13, 
    petName: 'Bailey', 
    petNickname: 'bear boyyyy/sweet man/honey boy', 
    petAge: 10, 
    petFunFact: 'bailey has two metal knees', 
    petOwnersName: 'Lauren DeLaRosa',
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

