window.addEventListener('load', function() {
    // Wait for the other scripts to complete before running the third script
    fod.complete(function (data) {
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
                window.location.href = response.url;
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});       