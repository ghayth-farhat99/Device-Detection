const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

mongoose.set('strictQuery', false);
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const csvFilePath = path.resolve('devices.csv');

// MongoDB connection
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://gaythfr99:lr3n89vBund6JT6i@test.ozv9s.mongodb.net/?retryWrites=true&w=majority&appName=test');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

// Device schema for MongoDB
const deviceSchema = new mongoose.Schema({
    isMobile: Boolean,
    hardwareVendor: String,
    hardwareName: [String],
    hardwareModel: String,
    fullscreen: Boolean,
    screenPixelsWidth: Number,
    screenPixelsHeight: Number,
    ecoScore: Number,
}, { timestamps: true });

const Device = mongoose.model('dev', deviceSchema);

// Serve index.html for the root route
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// CSV search function
function searchCsv(id) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(csvFilePath)) {
            resolve(null); // CSV file doesn't exist
            return;
        }

        const results = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                if (id.toLowerCase() === row['model_number_info'].toLowerCase()) {
                    results.push(row);
                }
            })
            .on('end', () => {
                resolve(results.length > 0 ? results[0] : null);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

app.post('/', async (req, res) => {
    try {
        const deviceData = req.body;
        const hardwareModel = "SM-A235F"; // Assuming hardwareModel comes from the client request
        console.log('Received request body:', req.body); // Log the request body to verify the data
        
        // Create a new device document using the model
        const device = new Device(deviceData);

        // Proceed with redirection logic
        if (!hardwareModel || hardwareModel.toLowerCase() !== 'unknown') {
            // Save the document to the database
            await device.save();
            console.log('Device data saved successfully'); // Log success message
    
            const deviceFromCsv = await searchCsv(hardwareModel);
            
            if (deviceFromCsv) {
                const ecoRating = parseInt(deviceFromCsv.eco_rating, 10);
                // Construct the query parameters to send the device information
                const queryParams = new URLSearchParams({
                    eco_rating: encodeURIComponent(deviceFromCsv.eco_rating || ''),
                    durability: encodeURIComponent(deviceFromCsv.durability || ''),
                    repairability: encodeURIComponent(deviceFromCsv.repairability || ''),
                    recyclability: encodeURIComponent(deviceFromCsv.recyclability || ''),
                    climate_efficiency: encodeURIComponent(deviceFromCsv.climate_efficiency || ''),
                    resource_efficiency: encodeURIComponent(deviceFromCsv.resource_efficiency || '')
                }).toString();
                
                if (ecoRating > 80) {
                    return res.redirect(`/firstIHM.html?${queryParams}`);
                } else {
                    return res.redirect(`/secondIHM.html?${queryParams}`);
                }
            } else {
                return res.redirect('/thirdIHM.html');
            }
        }

    } catch (err) {
        console.error('Error processing request:', err);
        // Ensure only one response is sent
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Serve the different HTML pages based on the redirects
app.get('/firstIHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'firstIHM.html'));
});

app.get('/secondIHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'secondIHM.html'));
});

app.get('/thirdIHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'thirdIHM.html'));
});

start();
