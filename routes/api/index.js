// router
const router = require('express').Router()
const Trips = require('./voyage')
const Destination = require('./destination')


// Route vers voyages
router.use('/trips', Trips)

// Route vers Destinations
router.use('/destinations', Destination)

module.exports = router