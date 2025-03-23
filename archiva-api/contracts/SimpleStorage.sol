// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStorage {
    string public data;

    // Store data on-chain
    function storeData(string memory _data) public {
        data = _data;
    }

    // Retrieve data
    function getData() public view returns (string memory) {
        return data;
    }
}