// import queries connect

const voyage = require("../database/models/voyage.model");
const Destination= require("../database/models/destination.model")

// exportation des fonctions concernant les requêtes dans la DATA BASE

// Exportation voyage schema pour retourner :

// liste des voyages

exports.getTrips = (filter=null)=>{
    return voyage.find(filter || {}).populate('destinationId')
}


// schema voyage avec les nouveaux données  voyage

exports.getNewTripSchema = (body)=>{
    return new voyage(body);
}

// supprimer voyage dans la db

exports.setDeleteTrip = (id)=>{
    return voyage.findByIdAndDelete(id)
}

// mettre à jour le voyage
exports.setUpdate = (id, newData, options)=>{
    return voyage.findByIdAndUpdate(id, newData, options)
}