// Function to detect the season based on the current date
function detecterSaison() {
    const mois = new Date().getMonth(); // Get the current month (0 = January, 11 = December)
    let saison;

    // Detect the season based on the month
    if (mois >= 2 && mois <= 4) {
        saison = "printemps";  // March to May
    } else if (mois >= 5 && mois <= 7) {
        saison = "ete";        // June to August
    } else if (mois >= 8 && mois <= 10) {
        saison = "automne";    // September to November
    } else {
        saison = "hiver";      // December to February
    }

    return saison;
}

// Mapping of page background images by season
const backgroundImages = {
    'score_OK_IHM': {
        hiver: '../images/background/background1-hiver.png',
        printemps: '../images/background/background1-printemps.png',
        ete: '../images/background/background1-ete.png',
        automne: '../images/background/background1-automne.png'
    },
    'score_ameliorable_IHM': {
        hiver: '../images/background/background2-hiver.png',
        printemps: '../images/background/background2-printemps.png',
        ete: '../images/background/background2-ete.png',
        automne: '../images/background/background2-automne.png'
    },
    'score_inconnu_IHM': {
        hiver: '../images/background/background3-hiver.png',
        printemps: '../images/background/background3-printemps.png',
        ete: '../images/background/background3-ete.png',
        automne: '../images/background/background3-automne.png'
    }
};

// Mapping of logo images by season
const logoImages = {
    hiver: '../images/ecorating-logo/ecorating-logo-hiver.png',
    printemps: '../images/ecorating-logo/ecorating-logo-printemps.png',
    ete: '../images/ecorating-logo/ecorating-logo-ete.png',
    automne: '../images/ecorating-logo/ecorating-logo-automne.png'
};

const dropDownImages = {
    hiver: '../images/buttons/bouton-bleu.png',
    printemps: '../images/buttons/bouton-vert.png',
    ete: '../images/buttons/bouton-jaune.png',
    automne: '../images/buttons/bouton-marron.png'
}

// Mapping of direction images by season
const directionImages = {
    hiver: '../images/direction/direction-bleue.png',
    printemps: '../images/direction/direction-vrete.png',
    ete: '../images/direction/direction-jaune.png',
    automne: '../images/direction/direction-marron.png'
};

// Mapping of croissance images by season
const croissanceImages = {
    hiver: '../images/croissance/croissance-bleue.png',
    printemps: '../images/croissance/croissance-verte.png',
    ete: '../images/croissance/croissance-jaune.png',
    automne: '../images/croissance/croissance-marron.png'
};

// Mapping of croissance images by season
const planeteImages = {
    hiver: '../images/planete/planete-bleue.png',
    printemps: '../images/planete/planete-verte.png',
    ete: '../images/planete/planete-jaune.png',
    automne: '../images/planete/planete-marron.png'
};

// Mapping of croissance images by season
const supportsImages = {
    hiver: '../images/supports/supports-bleus.png',
    printemps: '../images/supports/supports-verte.png',
    ete: '../images/supports/supports-jaune.png',
    automne: '../images/supports/supports-marron.png'
};


// Function to update the background image based on the page and season
function updatePageBackground(pageId) {
    const saisonActuelle = detecterSaison(); // Detect the current season

    const pageBackgrounds = backgroundImages[pageId]; // Get the background mapping for the page
    if (pageBackgrounds && pageBackgrounds[saisonActuelle]) {
        document.body.style.backgroundImage = `url(${pageBackgrounds[saisonActuelle]})`;
    } else {
        console.log(`Background image not found for page: ${pageId} and season: ${saisonActuelle}`);
    }
}

// Function to update the logo image based on the season
function updateLogo(saison) {
    const logoElement = document.querySelector('.logo'); // Select the logo element
    if (logoElement && logoImages[saison]) {
        logoElement.src = logoImages[saison]; // Set the new logo based on the season
    } else {
        console.log(`Logo not found for season: ${saison}`);
    }
}

// Function to update the direction image based on the season
function updateDirection(saison) {
    const directionElement = document.querySelector('.image_direction'); 
    if (directionElement && directionImages[saison]) {
        directionElement.src = directionImages[saison]; 
    }
}

// Function to update the croissance image based on the season
function updateCroissance(saison) {
    const croissanceElement = document.querySelector('.image_croissance'); 
    if (croissanceElement && croissanceImages[saison]) {
        croissanceElement.src = croissanceImages[saison]; 
    } 
}

// Function to update the planete image based on the season
function updatePlanete(saison) {
    const planeteElement = document.querySelector('.image_planete'); 
    if (planeteElement && planeteImages[saison]) {
        planeteElement.src = planeteImages[saison]; 
    } 
}

// Function to update the supports image based on the season
function updateSupports(saison) {
    const supportsElement = document.querySelector('.image_supports'); 
    if (supportsElement && supportsImages[saison]) {
        supportsElement.src = supportsImages[saison]; 
    }
}

// Function to update the drop-down button based on the season
function updateDropDownButton(saison) {
    const dropDownElements = document.querySelectorAll('.drop_down_img'); // Select all elements with the class 'drop_down_img'
    if (dropDownImages[saison]) {
        dropDownElements.forEach(element => {
            element.src = dropDownImages[saison]; // Update the src attribute for each element
        });
    }
}

// Function to update the CSS variables based on the season
function updateSeasonStyles(saison) {
    const root = document.documentElement;

    if (saison === "hiver") {
        root.style.setProperty('--background-color', '#B7D8E5');
        root.style.setProperty('--text-color', '#434F54');
        root.style.setProperty('--button-color', '#9FBBC7');
        root.style.setProperty('--border-button-color', '#434F54');
    } else if (saison === "printemps") {
        root.style.setProperty('--background-color', '#E6FF75');
        root.style.setProperty('--text-color', '#4C5427');
        root.style.setProperty('--button-color', '#CAE067');
        root.style.setProperty('--border-button-color', '#4C5427');
    } else if (saison === "ete") {
        root.style.setProperty('--background-color', '#FFEE8F');
        root.style.setProperty('--text-color', '#54522D');
        root.style.setProperty('--button-color', '#E0DA79');
        root.style.setProperty('--border-button-color', '#54522D');
    } else if (saison === "automne") {
        root.style.setProperty('--background-color', '#DB905E');
        root.style.setProperty('--text-color', '#4C3221');
        root.style.setProperty('--button-color', '#BD7C51');
        root.style.setProperty('--border-button-color', '#4C3221');
    }
}

// On page load, detect the season and update styles accordingly
window.onload = function() {
    const saisonActuelle = detecterSaison();
    console.log(`Saison actuelle : ${saisonActuelle}`);

    const currentPageId = document.body.getAttribute('data-page-id'); // Assuming each page has a unique id
    if (currentPageId) {
        updatePageBackground(currentPageId); // Update the background for the current page
    } else {
        console.error("No page identifier found. Please set data-page-id attribute in the <body>.");
    }

    // Update the CSS variables for the current season
    updateSeasonStyles(saisonActuelle);

    // Update the logo for the current season
    updateLogo(saisonActuelle); 

    // Update the direction for the current season
    updateDirection(saisonActuelle);

    // Update the croissance for the current season
    updateCroissance(saisonActuelle);

    // Update the planete for the current season
    updatePlanete(saisonActuelle);

    // Update the supports for the current season
    updateSupports(saisonActuelle);

    // Update the drop-down button for the current season
    updateDropDownButton(saisonActuelle);
};
