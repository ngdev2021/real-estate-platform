// backend/services/blockchain.js
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(
  new Web3.providers.HttpProvider('http://127.0.0.1:7545')
);

const contractPath = path.resolve(
  __dirname,
  '../../blockchain/build/contracts/RealEstateToken.json'
);
const contractJSON = JSON.parse(
  fs.readFileSync(contractPath, 'utf8')
);

const contractABI = contractJSON.abi;
const contractAddress = '0xcd7e0d306e06ed8999a08f0ac97c92955fbda33c'; // Replace with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = contract;
