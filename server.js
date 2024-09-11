const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const path = require('path');


const app = express();

app.use(express.json());
// Connect to MongoDB
const start = async()=>{
    try{
        await mongoose.connect('mongodb+srv://gaythfr99:lr3n89vBund6JT6i@test.ozv9s.mongodb.net/?retryWrites=true&w=majority&appName=test');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e.message)
    }
};

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

// Create a model from the schema
const Device = mongoose.model('dev', deviceSchema); // Ensure this line is correctly placed


// Serve the index.html file on the root route
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/', (req, res) => {
    console.log('Received request body:', req.body); // Log the request body to verify the data
    
    const deviceData = req.body;
    
    // Create a new device document using the model
    const device = new Device(deviceData);
    const hardwareModel = deviceData.hardwareModel;
    // Save the document to the database
    device.save()
        .then(savedDevice => {
            console.log('Device data saved:', savedDevice); // Log the saved document
            res.json({ message: 'Device data saved successfully', data: savedDevice });
        })
        .catch(err => {
            console.error('Failed to save device data:', err); // Log any errors
            res.status(500).json({ error: 'Failed to save device data', details: err });
        });

    
});

app.get('/', (req,res) =>{
    
})



const PORT = process.env.PORT || 3000;


start();

