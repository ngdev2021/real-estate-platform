pragma solidity ^0.8.0;

contract RealEstateToken {
    string public name = "Real Estate Token";
    string public symbol = "RET";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }
}
