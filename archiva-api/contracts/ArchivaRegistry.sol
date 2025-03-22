// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ArchivaRegistry {
    enum ContractState { Active, Pending, Archived }

    struct ContractInfo {
        address contractAddress;
        ContractState state;
        string ipfsHash;
    }

    mapping(address => ContractInfo) public contracts;
    address[] public contractList;

    // Add a new contract to the registry
    function addContract(address contractAddress) public {
        require(contracts[contractAddress].contractAddress == address(0), "Contract already exists");
        contracts[contractAddress] = ContractInfo(contractAddress, ContractState.Active, "");
        contractList.push(contractAddress);
    }

    // Update the state of a contract
    function updateContractState(address contractAddress, ContractState newState, string memory ipfsHash) public {
        require(contracts[contractAddress].contractAddress != address(0), "Contract does not exist");
        contracts[contractAddress].state = newState;
        contracts[contractAddress].ipfsHash = ipfsHash;
    }

    // Get the state of a contract
    function getContractState(address contractAddress) public view returns (ContractState, string memory) {
        require(contracts[contractAddress].contractAddress != address(0), "Contract does not exist");
        return (contracts[contractAddress].state, contracts[contractAddress].ipfsHash);
    }

    // Get all contracts
    function getAllContracts() public view returns (address[] memory) {
        return contractList;
    }
}