# **Archiva for EduChain**  

![Tech Stack](https://img.shields.io/badge/Tech%20Stack-Blockchain%20%7C%20Solidity%20%7C%20IPFS%20%7C%20Node.js%20%7C%20Hardhat%20%7C%20AI%20Tools-blue)  

**Archiva** is an advanced **smart contract management solution** designed for **EduChain**, a blockchain-powered educational ecosystem. It optimizes **contract storage**, **reduces gas fees**, and enhances lifecycle management with **AI-driven automation**.  

By archiving deployed contracts onto **IPFS**, Archiva significantly **reduces blockchain congestion** while ensuring secure, cost-effective, and **on-demand retrieval** of archived contracts.  

---

## **Deployment Details**  

- **Live Deployment**: [Archiva Platform](https://jnr-archiva.vercel.app/)  
- **Contract Address**: [EduChain Testnet Explorer](https://edu-chain-testnet.blockscout.com/address/0xDCCb6B190EB3691749F8cAf77cA77729B555B7a5)  
- **Pitch Presentation**: [View on Canva](https://www.canva.com/design/DAGig3-OC2Q/EBWs-sQS-CLSQzYDmNxRrA/view?utm_content=DAGig3-OC2Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h428ccc385a)  
- **Demo Video**: [Watch on YouTube](https://youtu.be/T91wkT9NWd4)  

---

## **Flow Diagram**  

![archiva-flow-chart](https://github.com/user-attachments/assets/8531d933-7001-4e84-bb03-81562e7bb3e4)

---

## **Features**  

- **Smart Contract Archiving** – Offloads deployed contracts to IPFS, reducing blockchain storage costs.  
- **Gas Fee Optimization** – Minimizes gas consumption during contract interactions.  
- **AI-Assisted Development** – Provides AI-powered code suggestions, optimizations, and security fixes.  
- **Full Contract Lifecycle Management** – Enables seamless contract tracking, archiving, and restoration.  
- **Seamless Integration with EduChain** – Designed to function natively within the EduChain ecosystem.  

---

## **How It Works**  

1. **Upload & Deploy** – Deploy smart contracts efficiently while optimizing gas fees.  
2. **Archiving to IPFS** – Securely store contracts off-chain to prevent blockchain congestion.  
3. **Retrieval on Demand** – Restore and verify archived contracts when needed.  
4. **AI-Powered Enhancements** – Optimize code, detect vulnerabilities, and enhance security.  
5. **Lifecycle Management** – Monitor, archive, and reactivate contracts seamlessly.  

---

## **Tech Stack**  

- **Blockchain**: Solidity, Hardhat, EduChain  
- **Storage**: IPFS for off-chain contract archiving  
- **Backend**: Node.js, Express.js  
- **AI Tools**: Smart contract analysis and auto-completion  
- **Frontend**: React.js (for future integrations)  
- **Verification**: Contract verification tools  

---

## **API Endpoints**  

### **User Management**  
- `POST /register` - Registers a new user.  
- `POST /login` - Logs in a user and provides a JWT token.  

### **Wallet & Contracts**  
- `GET /connect-wallet?address={WALLET_ADDRESS}` - Connects a wallet and retrieves its balance.  
- `GET /contracts?address={WALLET_ADDRESS}` - Retrieves all contracts associated with a wallet.  
- `GET /contract/{CONTRACT_ADDRESS}` - Fetches details of a specific contract.  

### **Compilation & Deployment**  
- `POST /compile-contract` - Compiles Solidity code for deployment.  
- `POST /deploy-contract` - Deploys the compiled contract on EduChain.  

### **Archiva Registry**  
- `POST /add-contract` - Adds a contract to the Archiva registry.  
- `POST /archive-contract` - Archives a deployed contract to IPFS.  
- `GET /contract-state/{CONTRACT_ADDRESS}` - Fetches contract state (active or archived).  

### **AI Code Tools**  
- `POST /codeai/autocomplete` - AI-powered smart contract code suggestions.  
- `POST /codeai/fix` - Analyzes and fixes security vulnerabilities in contracts.  

---

## **Installation and Setup**  

The project is divided into three directories:  
1. [**Website**]() – Contains the frontend code.  
2. [**API**](https://github.com/roahr/Archiva/tree/main/archiva-api) – Contains the backend server and API logic.  
3. [**Smart Contracts**](https://github.com/roahr/Archiva/tree/main/archiva-educhain) – Contains the Solidity contracts and deployment scripts.  

### **1. Clone the Repository**  
```sh
git clone https://github.com/roahr/archiva.git
cd archiva
```

### **2. Install Dependencies**  
Navigate to each directory and install dependencies:  

#### **Website**  
```sh
cd frontend
npm install
```

#### **API**  
```sh
cd archiva-api
npm install
```

#### **Smart Contracts**  
```sh
cd archiva-educhain
npm install
```

### **3. Set Up Environment Variables**  
Create a `.env` file in the **API** and **Smart Contracts** directories and add the required variables.  

#### **API/.env**  
```sh
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EDUCHAIN_RPC_URL=your_rpc_url
GROQ_API_KEY=your_ai_api_key
PINATA_API_KEY=your_ipfs_api_key
PINATA_SECRET_API_KEY=your_ipfs_secret_key
```

#### **Smart Contracts/.env**  
```sh
EDUCHAIN_RPC_URL=your_rpc_url
PRIVATE_KEY=your_wallet_private_key
PINATA_API_KEY=your_ipfs_api_key
PINATA_SECRET_API_KEY=your_ipfs_secret_key
```

### **4. Start the Servers**  
- **API**:  
```sh
cd archiva-api
node server.js
```

- **Website**:  
```sh
cd frontend
npm run dev
```

- **Smart Contracts**:  
Follow the deployment instructions in the `smart-contracts/README.md` file.  

---

## **Use Cases**  

- **Educational Institutions** – Manage contracts for blockchain-based learning platforms, credential verification, and digital course certifications.  
- **EdTech Startups** – Reduce contract storage costs while ensuring data security and easy retrieval.  
- **Blockchain-Based Exams & Certifications** – Secure and verifiable contract storage for educational exams and credentials.  

---

## **Team**  

| Name | Role |  
|------|------|  
| **Jayashre K** | Team Leader |  
| **Nidhi Gummaraju** | Team Member |  
| **Roahith R** | Team Member |  

---

## **License**  

This project is licensed under the **MIT License**.
