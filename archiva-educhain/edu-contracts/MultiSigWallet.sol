// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MultiSigWallet {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
    }

    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public approvals;

    modifier onlyOwner() {
        bool isOwner = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Only owner can call this function");
        _;
    }

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "At least one owner required");
        require(_required > 0 && _required <= _owners.length, "Invalid required number of owners");
        owners = _owners;
        required = _required;
    }

    function submitTransaction(address _to, uint256 _value, bytes memory _data) public onlyOwner {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false
        }));
    }

    function approveTransaction(uint256 _txId) public onlyOwner {
        require(!transactions[_txId].executed, "Transaction already executed");
        approvals[_txId][msg.sender] = true;
    }

    function executeTransaction(uint256 _txId) public onlyOwner {
        require(!transactions[_txId].executed, "Transaction already executed");
        uint256 approvalCount = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (approvals[_txId][owners[i]]) {
                approvalCount += 1;
            }
        }
        require(approvalCount >= required, "Not enough approvals");
        Transaction storage transaction = transactions[_txId];
        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Transaction failed");
    }
}