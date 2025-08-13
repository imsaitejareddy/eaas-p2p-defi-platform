// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EnergyDAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 endBlock;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => bool)) public voted;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed id, string description, uint256 endBlock);
    event Voted(address indexed voter, uint256 indexed proposalId);
    event Executed(uint256 indexed proposalId);

    function createProposal(string calldata description, uint256 duration) external returns (uint256) {
        uint256 id = proposalCount;
        proposals[id] = Proposal(description, 0, block.number + duration, false);
        proposalCount++;
        emit ProposalCreated(id, description, block.number + duration);
        return id;
    }

    function vote(uint256 proposalId) external {
        Proposal storage p = proposals[proposalId];
        require(block.number <= p.endBlock, "voting ended");
        require(!voted[msg.sender][proposalId], "already voted");
        p.voteCount++;
        voted[msg.sender][proposalId] = true;
        emit Voted(msg.sender, proposalId);
    }

    function execute(uint256 proposalId) external {
        Proposal storage p = proposals[proposalId];
        require(block.number > p.endBlock, "voting ongoing");
        require(!p.executed, "already executed");
        p.executed = true;
        emit Executed(proposalId);
        // In a real DAO, you would perform some on-chain action based on the proposal.
    }
}
