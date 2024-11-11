document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

    function setProgressBar(id, value) {
        const bar = document.getElementById(id);
        bar.style.width = value + '%';
    }

    document.getElementById('ecoRating').innerText = urlParams.get('eco_rating') + "%";
    document.getElementById('durability_score').innerText = urlParams.get('durability') + "%";
    document.getElementById('repairability_score').innerText = urlParams.get('repairability') + "%";
    document.getElementById('recyclability_score').innerText = urlParams.get('recyclability') + "%";
    document.getElementById('climate_efficiency_score').innerText = urlParams.get('climate_efficiency') + "%";
    document.getElementById('resource_efficiency_score').innerText = urlParams.get('resource_efficiency') + "%";

    setProgressBar('durability-bar', urlParams.get('durability'));
    setProgressBar('repairability-bar', urlParams.get('repairability'));
    setProgressBar('recyclability-bar', urlParams.get('recyclability'));
    setProgressBar('climate-efficiency-bar', urlParams.get('climate_efficiency'));
    setProgressBar('resource-efficiency-bar', urlParams.get('resource_efficiency'));

    function toggleDropdown(button) {
        const img = button.querySelector('.drop_down_img');
        img.classList.toggle('rotate');
        const definition = button.closest('.axe_container').querySelector('.definition_p');
        const definition_box = button.closest('.axe_container').querySelector('.definition');
        if (definition) {
            definition.classList.toggle('hidden');
            definition_box.classList.toggle('hidden');
        }
    }

    window.downloadPDF = function() {
        if (window.jspdf && window.jspdf.jsPDF) {
            const doc = new window.jspdf.jsPDF();

            const ecoRating = urlParams.get('eco_rating') + "%";
            const durability = urlParams.get('durability') + "%";
            const repairability = urlParams.get('repairability') + "%";
            const recyclability = urlParams.get('recyclability') + "%";
            const climateEfficiency = urlParams.get('climate_efficiency') + "%";
            const resourceEfficiency = urlParams.get('resource_efficiency') + "%";

            doc.setFontSize(18);
            doc.text("Éco-Rating Report", 10, 10);
            doc.setFontSize(12);
            doc.text(`Global Éco-Rating Score: ${ecoRating}`, 10, 20);
            doc.text(`Durability: ${durability}`, 10, 30);
            doc.text(`Repairability: ${repairability}`, 10, 40);
            doc.text(`Recyclability: ${recyclability}`, 10, 50);
            doc.text(`Climate Efficiency: ${climateEfficiency}`, 10, 60);
            doc.text(`Resource Efficiency: ${resourceEfficiency}`, 10, 70);

            doc.save("eco_rating_report.pdf");
        } else {
            console.error("jsPDF library is not loaded.");
        }
    };
});