
// Function to check the onBase status periodically
function checkOnBaseStatus() {
    fetch(`/check-onbase/${elementID}`)
        .then(response => response.json())
        .then(data => {
            if (data.onBase === 1) {
                window.location.href = `/score_details_IHM.html?${urlParams.toString()}`;
            }
        })
        .catch(error => console.error('Error checking onBase status:', error));
}

// Check every 5 seconds (5000 ms)
setInterval(checkOnBaseStatus, 5000);