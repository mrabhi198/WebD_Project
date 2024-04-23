// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Connect to MongoDB (replace 'your_database' with your MongoDB database name)
mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a Mongoose schema for your contact messages
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
const Message = mongoose.model('Message', messageSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle form submission
app.post('/api/contact', async (req, res) => {
    try {
        // Create a new message instance
        const message = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        // Save the message to the database
        await message.save();

        // Respond with a success message
        res.json({ status: 'success', message: 'Message sent successfully.' });
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ status: 'error', message: 'Unable to send message. Please try again later.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
