// import
const voyage = require("../database/models/voyage.model");
const {getDestinations, getDestinationById, getFilterDestination} = require("../queries/destination.queries");




// afficher la liste de destinations

exports.Destinations = (req, res, next) => {
    // Récupérer tous les destinations de la base de données
    getDestinations()
        .then(destinations => {

            // Si la récupération est réussie, rend la page de liste des produits avec les produits récupérés
            res.render('pages/destination-list', { destinations });
        })
        .catch(err => {
            next(err)
            // Si une erreur se produit pendant la récupération des produits, log l'erreur et envoie un message d'erreur 500 au client
            console.error(err);
            res.status(500).send('Erreur interne du serveur.');
        });
}

// afficher une destination par son id

exports.destinationById = (req, res, next) => {
    // Récupérer tous les destinations de la base de données
    getDestinationById({_id:req.params.id})

        .then(destination => {
            // Si la récupération est réussie, rend la page de liste des produits avec les produits récupérés
            res.render('pages/destination', { destination });
        })
        .catch(err => {
            next(err)
            // Si une erreur se produit pendant la récupération des produits, log l'erreur et envoie un message d'erreur 500 au client
            console.error(err);
            res.status(500).send('Erreur interne du serveur.');
        });
}

// afficher les contenu filtré
exports.fiterDestinations = (req, res, next)=>{
    const filter = req.query
    getFilterDestination(filter)
        .then(destinations =>{
            res.render('pages/destination-list', {destinations})
        })
        .catch(err=>{
            console.error(err)
            next(err)
        })
}
