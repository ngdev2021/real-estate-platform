// backend/routes/blockchain.js
const express = require('express');
const router = express.Router();
const contract = require('../services/blockchain');

// Get token balance
router.get('/balance/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const balance = await contract.methods.balanceOf(address).call();
    res.json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
