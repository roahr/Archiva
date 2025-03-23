// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
    }

    address public owner;
    Proposal[] public proposals;
    mapping(address => bool) public voters;
    mapping(uint256 => mapping(address => bool)) public votes;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProposal(string memory _description) public onlyOwner {
        proposals.push(Proposal({
            description: _description,
            voteCount: 0,
            executed: false
        }));
    }

    function vote(uint256 _proposalId) public {
        require(voters[msg.sender], "Not a registered voter");
        require(!votes[_proposalId][msg.sender], "Already voted");
        proposals[_proposalId].voteCount += 1;
        votes[_proposalId][msg.sender] = true;
    }

    function executeProposal(uint256 _proposalId) public onlyOwner {
        require(!proposals[_proposalId].executed, "Proposal already executed");
        require(proposals[_proposalId].voteCount > 0, "No votes for this proposal");
        proposals[_proposalId].executed = true;
    }

    function getProposal(uint256 _proposalId) public view returns (string memory, uint256, bool) {
        Proposal memory proposal = proposals[_proposalId];
        return (proposal.description, proposal.voteCount, proposal.executed);
    }
}