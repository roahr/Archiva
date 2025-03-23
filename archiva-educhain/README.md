# **Smart Contracts for Archiva**

This directory contains the Solidity smart contracts used in the **Archiva** project. These contracts are designed to manage the lifecycle of smart contracts on the **Educhain** blockchain, including archiving, storage optimization, and gas fee reduction.

---

## **Contracts Overview**

### **1. ArchivaRegistry**
The main registry contract that manages the lifecycle of smart contracts. It allows adding, updating, and archiving contracts while storing their state and IPFS hash.

#### **Key Features**
- Add new contracts to the registry.
- Update contract state (Active, Pending, Archived).
- Store IPFS hash for archived contracts.
- Retrieve contract state and IPFS hash.

#### **Contract Address**
```
0xDCCb6B190EB3691749F8cAf77cA77729B555B7a5
```

---

### **2. SimpleStorage**
A basic contract for storing and retrieving a string. Used for testing and demonstration purposes.

#### **Key Features**
- Store a string on-chain.
- Retrieve the stored string.

---

### **3. EduchainToken**
An ERC-20 token contract for simulating token transfers and interactions.

#### **Key Features**
- Mint tokens to the deployer.
- Transfer tokens between addresses.
- Approve and transfer tokens on behalf of another address.

---

### **4. Voting**
A contract for creating and voting on proposals. Demonstrates more complex contract interactions.

#### **Key Features**
- Create proposals.
- Vote on proposals.
- Execute proposals.

---

### **5. FileStorage**
A contract for simulating file storage on-chain. Stores file names and content as strings.

#### **Key Features**
- Upload files (name and content).
- Retrieve files by index.

---

### **6. MultiSigWallet**
A multi-signature wallet contract that requires multiple approvals for transactions.

#### **Key Features**
- Submit transactions.
- Approve transactions.
- Execute transactions after reaching the required number of approvals.

---

## **Deployment Instructions**

### **1. Prerequisites**
- Node.js and npm installed.
- Hardhat installed globally:
  ```bash
  npm install -g hardhat
  ```
- Educhain RPC URL and private key for deployment.

### **2. Install Dependencies**
```bash
npm install
```

### **3. Compile Contracts**
```bash
npx hardhat compile
```

### **4. Deploy Contracts**
Deploy the `ArchivaRegistry` contract:
```bash
npx hardhat run scripts/deploy.js --network educhain
```

Deploy other contracts (e.g., `SimpleStorage`):
```bash
npx hardhat run scripts/deploySimpleStorage.js --network educhain
```

---

## **Usage Examples**

### **1. Add a Contract to the Registry**
```javascript
const archivaRegistry = await ethers.getContractAt("ArchivaRegistry", "0xDCCb6B190EB3691749F8cAf77cA77729B555B7a5");
await archivaRegistry.addContract("0xYourContractAddress");
```

### **2. Archive a Contract**
```javascript
await archivaRegistry.updateContractState("0xYourContractAddress", 2, "QmExampleHash");
```

### **3. Retrieve Contract State**
```javascript
const [state, ipfsHash] = await archivaRegistry.getContractState("0xYourContractAddress");
console.log(`State: ${state}, IPFS Hash: ${ipfsHash}`);
```

---

## **Testing**

### **1. Run Unit Tests**
```bash
npx hardhat test
```

### **2. Test Coverage**
```bash
npx hardhat coverage
```

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
