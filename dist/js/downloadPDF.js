document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

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