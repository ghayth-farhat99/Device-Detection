const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

mongoose.set('strictQuery', false);
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const csvFilePath = path.resolve('devices.csv');

//this line will solve the problem of running css and images 
app.use(express.static(path.join(__dirname, 'dist')));


// MongoDB connection
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URL);
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
    onBase: Number,
}, { timestamps: true });

const Device = mongoose.model('dev', deviceSchema);

// Serve bienvenue_IHM.html for the root route
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/bienvenue/bienvenue_IHM.html'));
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
        deviceData.onBase = 0;
        const hardwareModel = "CPH2621"; // deviceData.hardwareModel; // Assuming hardwareModel comes from the client request
        console.log('Received request body:', req.body); // Log the request body to verify the data
        
        // Create a new device document using the model
        const device = new Device(deviceData);

        // Proceed with redirection logic
        if (!hardwareModel || hardwareModel.toLowerCase() !== 'unknown') {

            // Save the document to the database
            const savedDevice = await device.save();
            console.log('Device data saved successfully with ID:', savedDevice._id);
    
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
                    resource_efficiency: encodeURIComponent(deviceFromCsv.resource_efficiency || ''),
                    element_ID_MongoDB: savedDevice._id,
                }).toString();
                
                if (ecoRating > process.env.THRESHOLD) {
                    return res.redirect(`/score_OK_IHM.html?${queryParams}`);
                } else {
                    return res.redirect(`/score_ameliorable_IHM.html?${queryParams}`);
                }
            } else {
                return res.redirect('/score_inconnu_IHM.html');
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

app.get('/check-onbase/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const device = await Device.findById(id);
        if (device) {
            res.json({ onBase: device.onBase });
        } else {
            res.status(404).json({ error: 'Device not found' });
        }
    } catch (error) {
        console.error('Error checking onBase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Serve the different HTML pages based on the redirects
app.get('/score_OK_IHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/score_OK/score_OK_IHM.html'));
});

app.get('/score_ameliorable_IHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/score_ameliorable/score_ameliorable_IHM.html'));
});

app.get('/score_inconnu_IHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/score_inconnu/score_inconnu_IHM.html'));
});

app.get('/labels_verts_IHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/labels_verts/labels_verts_IHM.html'));
});

app.get('/ou_chercher_IHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/ou_chercher/ou_chercher_IHM.html'));
});

app.get('/ou_explorer_IHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/ou_explorer/ou_explorer_IHM.html'));
});

app.get('/score_details_IHM.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './pages/score_details/score_details_IHM.html'));
});

start();
