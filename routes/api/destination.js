const express = require('express');
const router = express.Router();

const {Destinations, destinationById, fiterDestinations} = require('../../controllers/destination.controller')



// Lister tous les destinations (pareil comme page d'accueil)
router.get('/', Destinations)

// page d'une destination
router.get('/:id', destinationById)

// page recherche
router.get('/filter/search', fiterDestinations)

module.exports = router