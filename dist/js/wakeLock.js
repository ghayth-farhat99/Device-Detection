// dist/js/wakeLock.js
let wakeLock = null;

// Fonction pour activer la Wake Lock
async function activateWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock activée pour empêcher le mode veille.');

        // Relancer la Wake Lock en cas d'interruption
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock relâchée.');
        });
    } catch (err) {
        console.error(`Erreur lors de l'activation de la Wake Lock: ${err.name}, ${err.message}`);
    }
}

// Appeler la fonction pour activer la Wake Lock
document.addEventListener('DOMContentLoaded', activateWakeLock);
