async function detectDevice() {
    const deviceInfo = {};

    // Client Hints (Navigator UserAgentData) for supported browsers
    if (navigator.userAgentData) {
        try {
            const data = await navigator.userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion']);
            deviceInfo.isMobile = navigator.userAgentData.mobile;
            deviceInfo.hardwareModel = data.model || "Unknown";
            deviceInfo.platform = data.platform || "Unknown";
            deviceInfo.platformVersion = data.platformVersion || "Unknown";
        } catch (error) {
            console.error("Client Hints detection failed:", error);
        }
    } else {
        deviceInfo.isMobile = /Mobile|Android|iP(ad|hone|od)/i.test(navigator.userAgent);
    }

    // User-Agent parsing for iOS fallback
    const userAgent = navigator.userAgent;
    deviceInfo.userAgent = userAgent;

    if (/iPhone/i.test(userAgent)) {
        deviceInfo.hardwareModel = "iPhone";
        const modelMatch = userAgent.match(/iPhone OS (\d+_\d+)/);
        if (modelMatch) {
            deviceInfo.platformVersion = modelMatch[1].replace('_', '.');
        }
    } else if (/iPad/i.test(userAgent)) {
        deviceInfo.hardwareModel = "iPad";
        const modelMatch = userAgent.match(/CPU OS (\d+_\d+)/);
        if (modelMatch) {
            deviceInfo.platformVersion = modelMatch[1].replace('_', '.');
        }
    } else if (/Macintosh/i.test(userAgent) && 'ontouchend' in document) {
        // Detect iPad masquerading as Mac in recent versions
        deviceInfo.hardwareModel = "iPad";
    }

    // Fallback for other platforms
    if (!deviceInfo.hardwareModel) {
        deviceInfo.hardwareModel = /Android/i.test(userAgent) ? "Android Device" : "Unknown Device";
    }

    console.log("Detected Device Info:", deviceInfo);

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
            console.log("Success:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Trigger detection on page load
window.addEventListener("load", detectDevice);
