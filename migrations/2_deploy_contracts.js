var fundraiser = artifacts.require("./fundraiser.sol");
var LoginInfo = artifacts.require("./LoginInfo.sol");

module.exports = function(deployer) {
  deployer.deploy(fundraiser);
  deployer.deploy(LoginInfo);
};
