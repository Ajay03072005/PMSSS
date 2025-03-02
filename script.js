document.addEventListener('DOMContentLoaded', () => {
    // Send OTP request
    const sendOtpForm = document.getElementById('sendOtpForm');
    sendOtpForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const phoneNumber = document.getElementById('phoneNumber').value;
        const responseMessage = document.getElementById('responseMessage');

        try {
            const response = await fetch('http://localhost:3000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber })
            });

            if (response.ok) {
                responseMessage.innerHTML = 'OTP sent successfully!';
            } else {
                responseMessage.innerHTML = 'Failed to send OTP.';
            }
        } catch (error) {
            console.error(error);
            responseMessage.innerHTML = 'Error sending OTP.';
        }
    });

    // Verify OTP request
    const verifyOtpForm = document.getElementById('verifyOtpForm');
    verifyOtpForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const phoneNumber = document.getElementById('verifyPhoneNumber').value;
        const otp = document.getElementById('otp').value;
        const responseMessage = document.getElementById('responseMessage');

        try {
            const response = await fetch('http://localhost:3000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp })
            });

            if (response.ok) {
                responseMessage.innerHTML = 'OTP verified successfully!';
            } else {
                responseMessage.innerHTML = 'Invalid OTP.';
            }
        } catch (error) {
            console.error(error);
            responseMessage.innerHTML = 'Error verifying OTP.';
        }
    });
});
