const RealEstateToken = artifacts.require('RealEstateToken');

module.exports = function (deployer) {
  deployer.deploy(RealEstateToken, 1000000);
};
