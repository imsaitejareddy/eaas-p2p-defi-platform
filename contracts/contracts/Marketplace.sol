// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./EnergyCredit.sol";

contract Marketplace {
    struct Offer {
        address seller;
        uint256 amount;
        uint256 priceWei;
        bool active;
    }

    EnergyCredit public token;
    uint256 public nextOfferId;
    mapping(uint256 => Offer) public offers;

    event OfferCreated(uint256 offerId, address indexed seller, uint256 amount, uint256 priceWei);
    event OfferFilled(uint256 offerId, address indexed buyer);

    constructor(EnergyCredit _token) {
        token = _token;
    }

    function createOffer(uint256 amount, uint256 priceWei) external returns (uint256) {
        require(token.balanceOf(msg.sender) >= amount, "insufficient balance");
        require(token.allowance(msg.sender, address(this)) >= amount, "approve tokens first");
        token.transferFrom(msg.sender, address(this), amount);
        uint256 offerId = nextOfferId;
        offers[offerId] = Offer(msg.sender, amount, priceWei, true);
        nextOfferId++;
        emit OfferCreated(offerId, msg.sender, amount, priceWei);
        return offerId;
    }

    function buy(uint256 offerId) external payable {
        Offer storage offer = offers[offerId];
        require(offer.active, "inactive");
        require(msg.value >= offer.priceWei, "insufficient ETH");
        offer.active = false;
        token.transfer(msg.sender, offer.amount);
        payable(offer.seller).transfer(offer.priceWei);
        if (msg.value > offer.priceWei) {
            payable(msg.sender).transfer(msg.value - offer.priceWei);
        }
        emit OfferFilled(offerId, msg.sender);
    }
}
