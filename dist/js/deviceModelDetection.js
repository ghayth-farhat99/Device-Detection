window.onload = function() {
    fod.complete(function (data) {
        // Fetch the properties from the JSON response.
        const deviceInfo = {
            isMobile: data.device["ismobile"],
            hardwareVendor: data.device["hardwarevendor"],
            hardwareName: data.device["hardwarename"],
            hardwareModel: data.device["hardwaremodel"],
            fullscreen: data.device["fullscreen"],
            screenPixelsWidth: data.device["screenpixelswidth"],
            screenPixelsHeight: data.device["screenpixelsheight"],
        };

        // Set hardware name as title
        // const mobile_name = deviceInfo.hardwareName[0] || "User";
        // document.getElementById("hardwareNameTitle").innerText = `Welcome ${mobile_name}!`;


        // Send device info to server
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deviceInfo)
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url; // Redirect to the new URL
            } else {
                return response.json(); // Handle JSON response if needed
            }
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}