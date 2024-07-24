const request = require('supertest');
const app = require('../app');
const Web3 = require('web3');
const ganache = require('ganache-cli');
const path = require('path');
const fs = require('fs');

describe('Blockchain routes', () => {
  let accounts;
  let contract;
  let provider;

  beforeAll(async () => {
    provider = ganache.provider();
    const web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();

    const contractPath = path.resolve(
      __dirname,
      '../../blockchain/build/contracts/RealEstateToken.json'
    );
    console.log('Checking for contract JSON file at:', contractPath);
    if (!fs.existsSync(contractPath)) {
      throw new Error(
        'Contract JSON file not found. Ensure the contract is compiled and migrated.'
      );
    }

    const RealEstateToken = JSON.parse(
      fs.readFileSync(contractPath, 'utf8')
    );
    const { abi, bytecode } = RealEstateToken;

    contract = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode, arguments: [1000000] })
      .send({ from: accounts[0], gas: '1000000' });

    contract.setProvider(provider);
  }, 30000); // Increase timeout to 30 seconds

  afterAll(async () => {
    if (provider && provider.engine && provider.engine.stop) {
      await provider.engine.stop();
    }
  });

  it('should get token balance', async () => {
    const res = await request(app).get(
      `/api/blockchain/balance/${accounts[0]}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('balance');
  });
});
