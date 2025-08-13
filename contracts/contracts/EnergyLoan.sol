// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./EnergyCredit.sol";

contract EnergyLoan {
    struct Loan {
        uint256 amount;
        uint256 interest;
        uint256 due;
        bool repaid;
    }

    EnergyCredit public token;
    address public treasury;
    mapping(address => Loan) public loans;

    constructor(EnergyCredit _token) {
        token = _token;
        treasury = msg.sender;
    }

    function borrow(uint256 amount, uint256 interest, uint256 duration) external {
        require(loans[msg.sender].amount == 0, "loan exists");
        require(token.balanceOf(treasury) >= amount, "insufficient treasury");
        loans[msg.sender] = Loan(amount, interest, block.timestamp + duration, false);
        token.transferFrom(treasury, msg.sender, amount);
    }

    function repay() external {
        Loan storage loan = loans[msg.sender];
        require(loan.amount > 0, "no loan");
        require(!loan.repaid, "already repaid");
        uint256 repayAmount = loan.amount + (loan.amount * loan.interest / 100);
        token.transferFrom(msg.sender, treasury, repayAmount);
        loan.repaid = true;
    }
}
