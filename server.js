require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const cors = require('cors'); //  Import CORS
const { generateOTP, sendOTP } = require('./otpUtil'); // OTP utilities

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Serve static HTML page
app.use(express.static(path.join(__dirname, 'public')));

// Route to send OTP
app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).send('Phone number is required');
    }

    try {
        const otp = generateOTP();
        app.locals[phoneNumber] = otp;

        await sendOTP(phoneNumber, otp);
        res.status(200).send('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send('Failed to send OTP');
    }
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
        return res.status(400).send('Phone number and OTP are required');
    }

    const storedOtp = app.locals[phoneNumber];

    if (storedOtp && storedOtp === parseInt(otp)) {
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
