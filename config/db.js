// // const mongoose = require('mongoose');
// // const axios = require('axios');
// // const Transaction = require('../models/Transaction');

// // const mongoURI = 'mongodb://localhost:27017/mern_transactions123';    //u can change database name

// // const initDb = async () => {
// //   try {
// //     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// //     console.log('MongoDB connected');

// //     const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
// //     const transactions = response.data;

// //     await Transaction.deleteMany({});

// //     await Transaction.insertMany(transactions);

// //     console.log('Database seeded');
// //   } catch (err) {
// //     console.error(err.message);
// //     process.exit(1);
// //   }
// // };

// // module.exports = { initDb };

// const mongoose = require('mongoose');
// const axios = require('axios');
// const Transaction = require('../models/Transaction');

// const mongoURI = 'mongodb://localhost:27017/mern_transactions456';

// const initDb = async () => {
//   try {
//     const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
//     const transactions = response.data;

//     await Transaction.deleteMany({});
//     await Transaction.insertMany(transactions);

//     console.log('Database seeded');
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const connectDb = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('MongoDB connected');
//     await initDb();
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = { connectDb };


// const mongoose = require('mongoose');
// const axios = require('axios');
// const Transaction = require('../models/Transaction');

// const mongoURI = 'mongodb://localhost:27017/mern_transactions456';

// const initDb = async () => {
//   try {
//     const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
//     const transactions = response.data;

//     await Transaction.deleteMany({});
//     await Transaction.insertMany(transactions);

//     console.log('Database seeded');
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const connectDb = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('MongoDB connected');
//     await initDb();
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = { connectDb };


const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const axios = require('axios');

const mongoURI = 'mongodb://localhost:27017/mern_transactions456';

const initDb = async () => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB is connected');

    // Clear existing data and insert new data
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);

    console.log('Database created');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { initDb };
