var app = require("../app")
var request = require("supertest")


//NE PAS OUBLIER DE RAJOUTER DANS LE SCRIPT DE APP.JS 'TEST':'JEST'

test("Validation de la prise en compte d'un lieu visité", async () => {
  await request(app).update('/user-update')
    .query({ token: 1234 }) // REMPLACER LE TOKEN PAR UN TOKEN PRÉSENT EN BDD
    .expect(200)
    .expect({ result: true, user });
});

test("Récupération de l'ensemble des infos", async () => {
  await request(app).get('/gaming')
    .query({ token: 1234 }) // REMPLACER LE TOKEN PAR UN TOKEN PRÉSENT EN BDD
    .expect(200)
    .expect({ result: true, user, scoreBoard });
});

test("Vérifier qu'un user non inscrit ne peux pas envoyer de formulaire de contact", async () => {
  await request(app).post('/contact')
    .send({ token: null, title: 'Erreur de géolocalisation', description: "Le lieu indiqué ne correspond pas à ce que j'ai visité" }) //TOKEN FICTIF SIMULANT UN USER NON INSCRIT
    .expect(200)
    .expect({ result: false, errorMsg: 'Merci de remplir tous les champs' });
});

test("Vérifier que la Map renvoie correctement toutes les informations des POI", async () => {
  await request(app).get('/map')
    .query({ token: 1234, longitude: 1234, latitude: 5678 }) // REMPLACER LES ÉLÉMENTS AVEC DES ÉLÉMENTS PRÉSENT EN BDD
    .expect(200)
    .expect({ result: true, POI });
});
