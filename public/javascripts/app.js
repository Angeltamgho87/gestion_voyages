document.addEventListener("DOMContentLoaded", ()=>{

    // Fonction pour supprimer un voyage
    window.deleteTrip = (id) => {
        // Demande de confirmation à l'utilisateur
        const confirmDelete = confirm("Voulez-vous vraiment supprimer ce voyage ?");

        if (confirmDelete) {
            // Envoi de la requête DELETE au serveur
            axios.delete(`/api/trips/${id}`)
                .then(res => {
                    // Vérifie si la suppression a bien eu lieu
                    if (res.status === 200 || res.status === 204) {
                        // Affiche une popup confirmant la suppression
                        alert("Le voyage a été supprimé avec succès !", "success");
                        // Recharge la page pour mettre à jour la liste
                        location.reload();
                    } else {
                        // Si le statut est inattendu, afficher un message
                        alert("Une réponse inattendue a été reçue.", "error");
                        console.error("Statut inattendu :", res.status);
                    }
                })
                .catch(error => {
                    // Gestion des erreurs
                    console.error("Erreur :", error.message);
                    alert("Une erreur s'est produite lors de la suppression du voyage.");
                });
        }
    };


})