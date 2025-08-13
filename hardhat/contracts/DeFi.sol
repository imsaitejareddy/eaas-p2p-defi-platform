// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./EnergyCredit.sol";

contract DeFi {
    EnergyCredit public token;
    mapping(address => uint256) public staked;
    mapping(address => uint256) public stakeTimestamp;

    constructor(EnergyCredit _token) {
        token = _token;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "amount must be > 0");
        require(token.allowance(msg.sender, address(this)) >= amount, "approve tokens first");
        token.transferFrom(msg.sender, address(this), amount);
        staked[msg.sender] += amount;
        stakeTimestamp[msg.sender] = block.timestamp;
    }

    function unstake() external {
        uint256 amount = staked[msg.sender];
        require(amount > 0, "no stake");
        staked[msg.sender] = 0;
        token.transfer(msg.sender, amount);
    }
}
