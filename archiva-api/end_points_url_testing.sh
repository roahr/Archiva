#!/bin/bash

# Define variables
export BLOCKSCOUT_API_URL="https://educhain.blockscout.com/api"  # Replace with your Educhain Blockscout URL
export DATABASE_URL="postgres://user:password@localhost:5432/archiva"  # Replace with your PostgreSQL connection string
export PINATA_API_KEY="your_pinata_api_key"  # Replace with your Pinata API key
export PINATA_SECRET_API_KEY="your_pinata_secret_key"  # Replace with your Pinata secret key
export EDUCHAIN_RPC_URL="https://educhain-rpc-url.com"  # Replace with your Educhain RPC URL
export ACCOUNT_PRIVATE_KEY="your_private_key"  # Replace with your wallet's private key
export JWT_SECRET="your_jwt_secret"  # Replace with your JWT secret key
export GROQ_API_KEY="your_groq_api_key"  # Replace with your Groq API key

# Contract addresses
export CONTRACT_ADDRESS_1="0xa78903fb27c40c6A8E9b7104A2a895195A4DA752"
export CONTRACT_ADDRESS_2="0xcC0cf46E429031258D1eda95eC75CEdDd1053009"
export CONTRACT_ADDRESS_3="0x861635951316BFae3BA34CFA73C648Ba49A0E70d"
export CONTRACT_ADDRESS_4="0x6aF8Fa5396c5da0E6307e9F6B9B0cF898ebD10dc"

# Wallet address
export WALLET_ADDRESS="0xYourWalletAddress"

# Email and password for user registration/login
export USER_EMAIL="user@example.com"
export USER_USERNAME="testuser"
export USER_PASSWORD="password123"

# Start the server (if not already running)
echo "Starting server..."
node server.js &

# Wait for the server to start
sleep 5

# Test endpoints

# 1. User Registration
echo "Testing /register endpoint..."
curl -X POST http://localhost:5000/register \
-H "Content-Type: application/json" \
-d '{
  "email": "'"$USER_EMAIL"'",
  "username": "'"$USER_USERNAME"'",
  "password": "'"$USER_PASSWORD"'"
}'
echo -e "\n"

# 2. User Login
echo "Testing /login endpoint..."
curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "'"$USER_EMAIL"'",
  "password": "'"$USER_PASSWORD"'"
}'
echo -e "\n"

# 3. Connect Wallet
echo "Testing /connect-wallet endpoint..."
curl -X GET "http://localhost:5000/connect-wallet?address=$WALLET_ADDRESS"
echo -e "\n"

# 4. Fetch Contracts
echo "Testing /contracts endpoint..."
curl -X GET "http://localhost:5000/contracts?address=$WALLET_ADDRESS"
echo -e "\n"

# 5. Fetch Contract Details
echo "Testing /contract/:contract_id endpoint..."
curl -X GET "http://localhost:5000/contract/$CONTRACT_ADDRESS_1"
echo -e "\n"

# 6. Compile Contract
echo "Testing /compile-contract endpoint..."
curl -X POST -F "contract=@/path/to/your/contract.sol" http://localhost:5000/compile-contract
echo -e "\n"

# 7. Deploy Contract
echo "Testing /deploy-contract endpoint..."
curl -X POST http://localhost:5000/deploy-contract \
-H "Content-Type: application/json" \
-d '{
  "contractName": "SimpleStorage"
}'
echo -e "\n"

# 8. Verify Contract
echo "Testing /verify-contract endpoint..."
curl -X POST http://localhost:5000/verify-contract \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "'"$CONTRACT_ADDRESS_1"'"
}'
echo -e "\n"

# 9. Add Contract to Registry
echo "Testing /add-contract endpoint..."
curl -X POST http://localhost:5000/add-contract \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "'"$CONTRACT_ADDRESS_1"'"
}'
echo -e "\n"

# 10. Archive Contract
echo "Testing /archive-contract endpoint..."
curl -X POST http://localhost:5000/archive-contract \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "'"$CONTRACT_ADDRESS_1"'"
}'
echo -e "\n"

# 11. Update Contract State
echo "Testing /update-contract-state endpoint..."
curl -X POST http://localhost:5000/update-contract-state \
-H "Content-Type: application/json" \
-d '{
  "contractAddress": "'"$CONTRACT_ADDRESS_1"'",
  "newState": 2,
  "ipfsHash": "QmExampleHash"
}'
echo -e "\n"

# 12. Fetch Contract State
echo "Testing /contract-state/:contractAddress endpoint..."
curl -X GET "http://localhost:5000/contract-state/$CONTRACT_ADDRESS_1"
echo -e "\n"

# 13. Fetch Archived Contract Data
echo "Testing /fetch-archived-contract/:ipfsHash endpoint..."
curl -X GET "http://localhost:5000/fetch-archived-contract/QmExampleHash"
echo -e "\n"

# 14. Fetch Archived Contracts
echo "Testing /archived-contracts endpoint..."
curl -X GET "http://localhost:5000/archived-contracts"
echo -e "\n"

# 15. Compare Gas and Storage
echo "Testing /compare-gas-and-storage endpoint..."
curl -X POST http://localhost:5000/compare-gas-and-storage \
-H "Content-Type: application/json" \
-d '{
  "contractAddresses": [
    "'"$CONTRACT_ADDRESS_1"'",
    "'"$CONTRACT_ADDRESS_2"'",
    "'"$CONTRACT_ADDRESS_3"'",
    "'"$CONTRACT_ADDRESS_4"'"
  ]
}'
echo -e "\n"

# 16. CodeAI Autocomplete
echo "Testing /codeai/autocomplete endpoint..."
curl -X POST http://localhost:5000/codeai/autocomplete \
-H "Content-Type: application/json" \
-d '{
  "code": "contract Example { uint256 public value; }"
}'
echo -e "\n"

# 17. CodeAI Fix
echo "Testing /codeai/fix endpoint..."
curl -X POST http://localhost:5000/codeai/fix \
-H "Content-Type: application/json" \
-d '{
  "code": "contract Example { uint256 public value; }"
}'
echo -e "\n"

# Stop the server
echo "Stopping server..."
pkill -f "node server.js"