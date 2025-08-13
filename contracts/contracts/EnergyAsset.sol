// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EnergyAsset is ERC721 {
    struct Asset {
        uint256 capacity;
        string location;
    }

    uint256 public nextId;
    mapping(uint256 => Asset) public assets;

    constructor() ERC721("EnergyAsset", "EAS") {}

    function mint(address to, uint256 capacity, string calldata location) external returns (uint256) {
        uint256 tokenId = nextId;
        nextId++;
        _safeMint(to, tokenId);
        assets[tokenId] = Asset(capacity, location);
        return tokenId;
    }
}
