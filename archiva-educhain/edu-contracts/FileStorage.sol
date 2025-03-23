// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract FileStorage {
    struct File {
        string name;
        string content;
    }

    mapping(address => File[]) public userFiles;

    // Upload a file
    function uploadFile(string memory _name, string memory _content) public {
        userFiles[msg.sender].push(File({
            name: _name,
            content: _content
        }));
    }

    // Retrieve all files for a user
    function getFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }

    // Retrieve a specific file by index
    function getFile(uint256 _index) public view returns (string memory, string memory) {
        File memory file = userFiles[msg.sender][_index];
        return (file.name, file.content);
    }
}