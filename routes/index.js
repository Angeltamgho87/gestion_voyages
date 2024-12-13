// Importation des modules nécessaires
const router = require('express').Router(); // Importation du routeur Express
const api = require('./api');
const {Destinations} = require("../controllers/destination.controller");               // Importation des routes d'API


// Montage des routes d'API sur le chemin '/api' (c'est-à-dire que toutes les routes définies dans 'api' commenceront par '/api')
router.use('/api', api);

// page d'accueil : liste de destinations
router.get('/', Destinations)


// Exportation du routeur pour l'utiliser dans l'application principale
module.exports = router;