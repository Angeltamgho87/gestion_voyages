// Importation du module Mongoose
const mongoose = require('../index');



// Définition du schéma  destination
const destinationSchema = mongoose.Schema({
    image: String,
    description: String,
    climate: String,
    bestVisitPeriod: String,
    mainActivities: [String],
    recommendedActivities: [String],
    availableAccommodations: [String],
    transportationOptions: [String]
});





// Exportation du modèle de tweet pour une utilisation ultérieure
module.exports = mongoose.model('destination', destinationSchema);

