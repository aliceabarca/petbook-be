# PetBook API

This app is the back-end server for the PetBook FE.

## Getting started

### Installation

1. Clone down this repository.
    - `git clone git@github.com:aliceabarca/petbook-be.git`
2. Change into the new directory.
    - `petbook-be`
3. Install the dependencies.
    - `npm install`
4. Start the server.
    - `npm start`

### Endpoints

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `http://localhost:3001/api/v1/poems` | GET | not needed | Object of 'pets' with an Array of all existing pets: `{pets: [{ { "name": "Oreo", "nickname": "Oreo",  "age": 2.5,  "funFact": "He's had..", "type": "Cat" }, {...}, ... ]` |
| `http://localhost:3001/api/v1/poems` | POST | `{title: <String>, author: <String>, poem: <String>}` | Add new pet: `{ { "name": "Oreo", "nickname": "Oreo",  "age": 2.5,  "funFact": "hes had..", "type": "Cat" }` |
| `http://localhost:3001/api/v1/pets/:id` | GET | not needed | Object of single pet details: `{ id: 3, name: "Oreo", nickname: "Oreo", age: 2.5, funFact: "He's had..", type: "Cat" }` |
| `http://localhost:3001/api/v1/pets/:id` | DELETE | not needed | Delete pet |

