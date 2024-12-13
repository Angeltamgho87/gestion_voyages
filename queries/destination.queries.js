// import queries connect

const destination = require("../database/models/destination.model");

// exportation des fonctions concernant les requêtes dans la DATA BASE

// Exportation product schema pour retourner :

// liste de destinations

exports.getDestinations = ()=>{
    return destination.find({}).exec()
}

// liste par id
exports.getDestinationById=(id)=>{
    return destination.findById(id)
}

// Liste des destinations filtrées insensibles à la casse
exports.getFilterDestination = (filter) => {
    const { description, activities, accommodations } = filter;

    // Construction de la requête avec $or
    const query = {

             description: { $regex: description, $options: 'i' } ,
  $or:[  {
        mainActivities: {
            $regex: activities, $options
        :
            'i'
        }
    } ,
    {
        recommendedActivities: {
            $regex: activities, $options
        :
            'i'
        }
    }] ,
             availableAccommodations: { $regex: accommodations, $options: 'i' }

    };

    // Retourne les destinations filtrées
    return destination.find(query);
};
