
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { query, validationResult } = require('express-validator');

router.get('/', [
  query('month').isString().optional(),
  query('search').isString().optional(),
  query('page').isInt({ min: 1 }).optional().default(1),
  query('per_page').isInt({ min: 1 }).optional().default(10)
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { month, search, page, per_page } = req.query;
  const perPage = parseInt(per_page);
  const currentPage = parseInt(page);

  let query = {};
  
  if (month) {
    const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
    query = { dateOfSale: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] } } };
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: parseFloat(search) || 0 } 
    ];
  }

  try {
    const transactions = await Transaction.find(query)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    const total = await Transaction.countDocuments(query);

    res.json({
      total,
      page: currentPage,
      per_page: perPage,
      transactions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/statistics', [
  query('month').isString().optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { month } = req.query;

  let query = {};
  
  if (month) {
    const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
    query = { dateOfSale: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] } } };
  }

  try {
    const totalSale = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    const totalSoldItems = await Transaction.countDocuments({ ...query, sold: true });
    const totalNotSoldItems = await Transaction.countDocuments({ ...query, sold: false });

    res.json({
      total_sale: totalSale[0]?.total || 0,
      total_sold_items: totalSoldItems,
      total_not_sold_items: totalNotSoldItems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/barchart', [
  query('month').isString().optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { month } = req.query;

  let query = {};
  
  if (month) {
    const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
    query = { dateOfSale: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] } } };
  }

  const priceRanges = [
    [0, 100], [101, 200], [201, 300], [301, 400], [401, 500],
    [501, 600], [601, 700], [701, 800], [801, 900], [901, Infinity]
  ];

  try {
    const barchartData = {};

    for (const [start, end] of priceRanges) {
      const count = await Transaction.countDocuments({
        ...query,
        price: { $gte: start, $lt: end === Infinity ? undefined : end }
      });

      barchartData[`${start}-${end === Infinity ? 'above' : end}`] = count;
    }

    res.json(barchartData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/piechart', [
  query('month').isString().optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { month } = req.query;

  let query = {};
  
  if (month) {
    const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
    query = { dateOfSale: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] } } };
  }

  try {
    const categories = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const piechartData = categories.reduce((acc, category) => {
      acc[category._id] = category.count;
      return acc;
    }, {});

    res.json(piechartData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', [
  query('month').isString().optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { month } = req.query;

  const transactions = await Transaction.find({ month });
  const statistics = await get_statistics({ month });
  const barchart = await get_barchart({ month });
  const piechart = await get_piechart({ month });

  res.json({
    transactions,
    statistics,
    barchart,
    piechart
  });
});

module.exports = router;

