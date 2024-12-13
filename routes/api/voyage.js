const express = require('express');
const router = express.Router();
const Trip = require('../../database/models/voyage.model');
const {Trips, addTrip, deleteTrip, form, updateTrip, formUpdate} = require('../../controllers/voyage.controller')


// Lister tous les voyages
router.get('/', Trips)


// Ajouter un voyage
router.post('/', addTrip);


// Supprimer un voyage par son ID
router.delete('/:id', deleteTrip);

// Formulaire d'ajout voyage
router.get('/new/:id', form)

// update
router.put('/update/:id', updateTrip)

// formulaire mise à jour
router.get('/form/update/:id', formUpdate)

module.exports = router;