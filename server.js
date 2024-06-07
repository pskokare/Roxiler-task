

const express = require('express');
const axios = require('axios');
const { initDb } = require('./config/db');
const Transaction = require('./models/Transaction'); // Assuming you have a Transaction model

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the database and fetch data from the third-party API
const initData = async () => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Initialize the database
    await initDb();

    // Store fetched data in the database
    await Transaction.deleteMany({}); // Clear existing data
    await Transaction.insertMany(transactions);

    console.log('Data stored in the database');
  } catch (error) {
    console.error('Error initializing database or storing data:', error);
    process.exit(1); // Exit the process if an error occurs
  }
};

// Define route to serve data from the database
app.get('/', async (req, res) => {
  try {
    // Fetch transactions from the database
    const transactions = await Transaction.find({});
    res.json(transactions); // Send fetched data as JSON response
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize data and start the server
initData()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing data:', error);
    process.exit(1); // Exit the process if an error occurs
  });
