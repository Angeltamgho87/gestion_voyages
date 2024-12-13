// Importation du module Mongoose
const mongoose = require('../index');


// Schéma pour gérer le compteur des IDs
const CounterSchema = mongoose.Schema({
    _id: { type: String, required: true }, // Nom du compteur
    seqValue: { type: Number, default: 0 } // Valeur actuelle
});

// Modèle pour la collection des compteurs id
const Counter = mongoose.model('counter', CounterSchema);

// Définition du schéma voyage
const voyageSchema = mongoose.Schema({ // ID personnalisé incrémental
    _id: Number,
    destinationId: {type: mongoose.Schema.Types.ObjectId, ref: 'destination'},
    startDate: {type: Date, required: [true, 'Entrer une date de début']},
    endDate: {type: Date, required: [true, 'Entrer une date de fin']},
    budget: Number
});

// Middleware "pre" pour générer un ID personnalisé avant l'insertion
voyageSchema.pre('save', function (next) {
    // Vérifie si le document est nouveau
    if (this.isNew) {
        // Cherche et met à jour le compteur
        Counter.findOneAndUpdate(
            { _id: 'voyageId' },       // Cherche le compteur nommé "voyageId"
            { $inc: { seqValue: 1 } },  // Incrémente la valeur du compteur
            { new: true, upsert: true } // Retourne le document mis à jour ou le crée s'il n'existe pas
        )
            .then(counter => {
                // Assigne la valeur incrémentée comme `_id` du voyage
                this._id = counter.seqValue;
                next(); // Continue l'exécution
            })
            .catch(err => {
                // Gestion des erreurs
                console.error('Erreur lors de la génération de l\'ID personnalisé :', err);
                next(err); // Passe l'erreur au prochain middleware ou au gestionnaire d'erreurs
            });
    } else {
        // Si ce n'est pas un nouveau document, passe simplement au middleware suivant
        next();
    }
});




// Exportation du modèle de tweet pour une utilisation ultérieure
module.exports = mongoose.model('voyage', voyageSchema);

