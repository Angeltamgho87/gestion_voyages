// Importation des modules nécessaires
const express = require('express'); // Express est un framework web pour Node.js
const morgan = require('morgan'); // Morgan est un middleware de logging pour Express
const path = require('path'); // Le module 'path' fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires
const errorHandler = require('errorhandler')
const methodOverride = require('method-override');

// Création de l'application Expres
const app = express();

// Définition du numéro de port sur lequel l'application va écouter
const port = process.env.PORT || 5000;


// Le code utilise la variable d'environnement 'PORT' si elle existe, sinon il utilise le port 5000 par défaut

// Importation des routes définies dans le fichier './routes.js'
const index = require('./routes');

// Configuration des paramètres de l'application
app.set('views', path.join(__dirname, 'views')); // Définit le dossier 'views' comme emplacement des fichiers de vue (pug)
app.set('view engine', 'pug'); // Définit le moteur de rendu de vue à utiliser (pug dans ce cas)

// Utilisation des middlewares

// Définir un format personnalisé
morgan.token('date', () => new Date().toLocaleString());

// Utilise le middleware de logging Morgan pour enregistrer les requêtes entrantes
app.use(morgan(':method :url :status :response-time ms - :res[content-length] date = :date'));

// Définit le dossier 'public' pour servir les fichiers statiques (css, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Lorsqu'une requête arrive avec un corps au format JSON, le middleware express.json() le parse et le transforme en objet JavaScript.
app.use(express.json());

// Middleware pour analyser les corps de requête au format x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware pour utiliser le module method-override
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    return req.body._method
  }
  return null;
}));


// Le format x-www-form-urlencoded est couramment utilisé pour envoyer des données à partir de formulaires HTML.
// Lorsque vous soumettez un formulaire HTML avec la méthode POST et l'en-tête Content-Type défini sur
// application/x-www-form-urlencoded, les données du formulaire sont encodées dans ce format.

// Utilise les routes définies dans le fichier './routes.js'
app.use(index);




// Démarre le serveur en écoutant les requêtes sur le port spécifié
app.listen(port, () => {
  console.log("Application encours ....")
});
