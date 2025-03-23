## **Archiva API Documentation**

### **Base URL**
```
http://localhost:5000
```

---

## **1. User Registration**
Register a new user.

### **Endpoint**
```
POST /register
```

### **Request Body**
```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

### **Response**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "number",
    "email": "string",
    "username": "string"
  }
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/register \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "username": "testuser",
  "password": "password123"
}'
```

---

## **2. User Login**
Authenticate a user and return a JWT token.

### **Endpoint**
```
POST /login
```

### **Request Body**
```json
{
  "email": "string",
  "password": "string"
}
```

### **Response**
```json
{
  "message": "Login successful",
  "token": "string"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "password123"
}'
```

---

## **3. Connect Wallet**
Connect a wallet and fetch its balance.

### **Endpoint**
```
GET /connect-wallet
```

### **Query Parameters**
- `address`: Wallet address.

### **Response**
```json
{
  "walletAddress": "string",
  "balance": "string"
}
```

### **Example**
```bash
curl -X GET "http://localhost:5000/connect-wallet?address=0xYourWalletAddress"
```

---

## **4. Fetch Contracts**
Fetch all contracts associated with a wallet.

### **Endpoint**
```
GET /contracts
```

### **Query Parameters**
- `address`: Wallet address.

### **Response**
```json
{
  "contracts": [
    {
      "address": "string",
      "contractResponse": "object"
    }
  ]
}
```

### **Example**
```bash
curl -X GET "http://localhost:5000/contracts?address=0xYourWalletAddress"
```

---

## **5. Fetch Contract Details**
Fetch details of a specific contract.

### **Endpoint**
```
GET /contract/:contract_id
```

### **Path Parameters**
- `contract_id`: Contract address.

### **Response**
```json
{
  "message": "OK",
  "result": {
    "ABI": "string",
    "CompilerVersion": "string",
    "ContractName": "string",
    "FileName": "string",
    "ImplementationAddress": "string",
    "IsProxy": "boolean",
    "OptimizationUsed": "string",
    "SourceCode": "string"
  },
  "status": "1"
}
```

### **Example**
```bash
curl -X GET "http://localhost:5000/contract/0xYourContractAddress"
```

---

## **6. Compile Contract**
Compile a Solidity contract.

### **Endpoint**
```
POST /compile-contract
```

### **Request Body**
- `contract`: Solidity file (multipart/form-data).

### **Response**
```json
{
  "contractName": "string"
}
```

### **Example**
```bash
curl -X POST -F "contract=@/path/to/your/contract.sol" http://localhost:5000/compile-contract
```

---

## **7. Deploy Contract**
Deploy a compiled contract.

### **Endpoint**
```
POST /deploy-contract
```

### **Request Body**
```json
{
  "contractName": "string"
}
```

### **Response**
```json
{
  "contractName": "string",
  "address": "string"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/deploy-contract \
-H "Content-Type: application/json" \
-d '{
  "contractName": "SimpleStorage"
}'
```

---

## **8. Verify Contract**
Verify a deployed contract.

### **Endpoint**
```
POST /verify-contract
```

### **Request Body**
```json
{
  "contractAddress": "string"
}
```

### **Response**
```json
{
  "message": "Contract verified successfully"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/verify-contract \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "0xYourContractAddress"
}'
```

---

## **9. Add Contract to Registry**
Add a contract to the Archiva registry.

### **Endpoint**
```
POST /add-contract
```

### **Request Body**
```json
{
  "contractAddress": "string"
}
```

### **Response**
```json
{
  "message": "Contract added to registry",
  "contractAddress": "string"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/add-contract \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "0xYourContractAddress"
}'
```

---

## **10. Archive Contract**
Archive a contract by moving its data to IPFS.

### **Endpoint**
```
POST /archive-contract
```

### **Request Body**
```json
{
  "contractAddress": "string"
}
```

### **Response**
```json
{
  "message": "Contract archived successfully",
  "contractAddress": "string",
  "ipfsHash": "string"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/archive-contract \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "0xYourContractAddress"
}'
```

---

## **11. Update Contract State**
Update the state of a contract.

### **Endpoint**
```
POST /update-contract-state
```

### **Request Body**
```json
{
  "contractAddress": "string",
  "newState": "number",
  "ipfsHash": "string"
}
```

### **Response**
```json
{
  "message": "Contract state updated",
  "contractAddress": "string",
  "newState": "number",
  "ipfsHash": "string"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/update-contract-state \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "0xYourContractAddress",
  "newState": 2,
  "ipfsHash": "QmExampleHash"
}'
```

---

## **12. Fetch Contract State**
Fetch the state and IPFS hash of a contract.

### **Endpoint**
```
GET /contract-state/:contractAddress
```

### **Path Parameters**
- `contractAddress`: Contract address.

### **Response**
```json
{
  "contractAddress": "string",
  "state": "string",
  "ipfsHash": "string"
}
```

### **Example**
```bash
curl -X GET "http://localhost:5000/contract-state/0xYourContractAddress"
```

---

## **13. Fetch Archived Contract Data**
Fetch archived contract data from IPFS.

### **Endpoint**
```
GET /fetch-archived-contract/:ipfsHash
```

### **Path Parameters**
- `ipfsHash`: IPFS hash.

### **Response**
```json
{
  "ipfsHash": "string",
  "contractData": "object"
}
```

### **Example**
```bash
curl -X GET "http://localhost:5000/fetch-archived-contract/QmExampleHash"
```

---

## **14. Fetch Archived Contracts**
Fetch all archived contracts.

### **Endpoint**
```
GET /archived-contracts
```

### **Response**
```json
{
  "archivedContracts": [
    {
      "contractAddress": "string",
      "state": "string",
      "ipfsHash": "string"
    }
  ]
}
```

### **Example**
```bash
curl -X GET "http://localhost:5000/archived-contracts"
```

---

## **15. Compare Gas and Storage**
Compare gas and storage usage before and after archiving.

### **Endpoint**
```
POST /compare-gas-and-storage
```

### **Request Body**
```json
{
  "contractAddresses": ["string"]
}
```

### **Response**
```json
{
  "resultsBefore": [
    {
      "address": "string",
      "totalGas": "number",
      "totalStorage": "number"
    }
  ],
  "resultsAfter": [
    {
      "address": "string",
      "totalGas": "number",
      "totalStorage": "number"
    }
  ]
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/compare-gas-and-storage \
-H "Content-Type: application/json" \
-d '{
  "contractAddresses": [
    "0xYourContractAddress1",
    "0xYourContractAddress2"
  ]
}'
```

---

## **16. CodeAI Autocomplete**
Generate Solidity code suggestions.

### **Endpoint**
```
POST /codeai/autocomplete
```

### **Request Body**
```json
{
  "code": "string"
}
```

### **Response**
```json
{
  "suggestions": "string"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/codeai/autocomplete \
-H "Content-Type: application/json" \
-d '{
  "code": "contract Example { uint256 public value; }"
}'
```

---

## **17. CodeAI Fix**
Fix and optimize Solidity code.

### **Endpoint**
```
POST /codeai/fix
```

### **Request Body**
```json
{
  "code": "string"
}
```

### **Response**
```json
{
  "Reason": "string",
  "Code": "string"
}
```

### **Example**
```bash
curl -X POST http://localhost:5000/codeai/fix \
-H "Content-Type: application/json" \
-d '{
  "code": "contract Example { uint256 public value; }"
}'
```