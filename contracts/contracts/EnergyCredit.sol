// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract EnergyCredit is ERC20 {
    constructor() ERC20("Energy Credit", "KWH") {}
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
