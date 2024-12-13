// import
const {getNewTripSchema, setDeleteTrip, getTrips, setUpdate} = require("../queries/voyage.queries");
const {getDestinationById} = require("../queries/destination.queries");

// Exporter fonction promise..


// ajouter un trip

exports.addTrip = (req, res, next) => {
    // Récupère les données envoyées dans le corps de la requête
    const {body} = req;

    getDestinationById(body.destinationId)
        .then(destination => {
            // Crée une nouvelle instance de voyage schema à partir des données reçues

            const newTrip = getNewTripSchema({destinationId: destination, ...body})

            // Sauvegarde du voyage dans la base de données
            newTrip.save()
                .then(() => {
                    // Si tout se passe bien, redirige vers la page principale
                    res.redirect('/api/trips')
                })
                .catch(err => {
                    next(error)
                    let errors = [];
                    if (err.errors) {
                        errors = Object.keys(err.errors).map(key => err.errors[key].message);
                    } else {
                        console.error('Erreur inattendue:', err);
                        errors = ['Une erreur s\'est produite. Veuillez réessayer.'];
                    }
                    res.status(400).render('pages/trip-form', {errors});
                });
        })
        .catch(err => {
            next(err)
            console.error("destination introuvable")
        })


}


// supprimer un voyage de la database

exports.deleteTrip = (req, res, next) => {
    // Tente de supprimer un voyage correspondant à l'ID fourni
    setDeleteTrip(req.params.id)
        .then(trip => {

                if (!trip) {
                    // Si aucun voyage n'est trouvé avec cet ID
                    return res.status(404).send({error: 'Voyage introuvable.'});
                }
                // Retourne un succès si le voyage a été supprimé
                res.status(200).send({success: 'Le voyage a bien été supprimé !'});
            }
        )
        .catch(err => {
            next(err)
            // En cas d'erreur, log l'erreur et retourne une réponse 500.
            console.error(err);
            res.status(500).send({error: 'Erreur lors de la suppression du voyage.'});
        });
}

// afficher la liste des voyages

exports.Trips = (req, res, next) => { // Cette route équivaut à /api/product/ (verifier la route dans product form.pug)
    // Récupérer tous les produits de la base de données.
    getTrips()
        .then(trips => {
            // Si la récupération est réussie, rend la page de liste des produits avec les produits récupérés
            res.render('pages/voyage-list', {trips});
        })
        .catch(err => {
            next(err)
            // Si une erreur se produit pendant la récupération des produits, log l'erreur et envoie un message d'erreur 500 au client.
            console.error(err);
            res.status(500).send('Erreur interne du serveur.');
        });
}

// formulaire d'ajout voyage

exports.form = (req, res, next) => {
    getDestinationById(req.params.id)
        .then(destination => {
                res.render('pages/trip-form', {destination})
            }
        ).catch(err => {
            next(err)
        console.error(err)
        res.status(500).send('Erreur interne du serveur.')
    })
}

//form de mise à jour
exports.formUpdate = (req, res, next) => {
    getTrips({ _id: req.params.id })
        .then(trips => {
            let trip = trips[0]
            // Convertir les dates ISO en YYYY-MM-DD

            console.log(trip)
            res.render('pages/trip-form', { trip });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur interne du serveur.');
        });
};


// Mettre à jour un voyage
exports.updateTrip = (req, res, next)=>{
    const {startDate, endDate, budget} = req.body
   const {id} = req.params
    setUpdate(id, {startDate, endDate,budget}, {
        new:true, runValidators:true
    })
        .then(
        Trip =>{

            res.redirect('/api/trips')
        })
        .catch(err=>{
            next(err)
            console.error(err)
            res.status(500).send("Erreur interne du serveur")
        })

}
