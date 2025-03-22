import express from 'express';
import axios from 'axios';
import cors from 'cors';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { networkInterfaces } from 'os';
import hre from 'hardhat';
import { ethers } from 'ethers';
import multer from 'multer';
import fs from 'fs-extra';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();
const { Pool } = pkg;
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const BLOCKSCOUT_API_URL = process.env.BLOCKSCOUT_API_URL;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: 'temp/' });

const deployedContracts = {};

const ContractState = {
  0: "Active",
  1: "Pending",
  2: "Archived",
};

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

const provider = new ethers.JsonRpcProvider(process.env.EDUCHAIN_RPC_URL);
const archivaRegistryAddress = process.env.ARCHIVA_REGISTRY_ADDRESS;
const archivaRegistryABI = JSON.parse(process.env.ARCHIVA_REGISTRY_ABI || '[]');

const archivaRegistry = new ethers.Contract(archivaRegistryAddress, archivaRegistryABI, provider);

const uploadToPinata = async (data) => {
  try {
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const body = {
      pinataContent: data,
    };
    const headers = {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    };

    const response = await axios.post(url, body, { headers });
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Pinata Upload Error:", error);
    throw new Error("Failed to upload data to Pinata");
  }
};

const retrieveFromPinata = async (ipfsHash) => {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Pinata Retrieve Error:", error);
    throw new Error("Failed to retrieve data from Pinata");
  }
};

const transitionToArchived = async (contractAddress, ipfsHash) => {
  try {
    const signer = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
    const contractWithSigner = archivaRegistry.connect(signer);
    setTimeout(async () => {
      const tx = await contractWithSigner.updateContractState(contractAddress, 2, ipfsHash); // 2 = Archived
      await tx.wait();
      console.log(`Contract ${contractAddress} transitioned to Archived state.`);
    }, 60000);
  } catch (error) {
    console.error("Transition Error:", error);
  }
};

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

async function deployContract(contractName) {
  try {
    const Contract = await hre.ethers.deployContract(contractName);
    await Contract.waitForDeployment();
    console.log(`Contract deployed at ${Contract.target}`);
    return Contract.target;
  } catch (error) {
    console.error("Deployment error:", error);
    throw error;
  }
}

function getContractName(solidityFilePath) {
  const content = fs.readFileSync(solidityFilePath, "utf8");
  const match = content.match(/contract\s+([A-Za-z0-9_]+)\s*{/);
  return match ? match[1] : null;
}

app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [email, username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(email);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/connect-wallet', async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: "Missing wallet address" });
    }

    const response = await axios.get(`${BLOCKSCOUT_API_URL}?module=account&action=balance&address=${address}`);
    res.json({ walletAddress: address, balance: response.data.result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/contracts', async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: "Missing wallet address" });
    }
    const transactionsResponse = await axios.get(`${BLOCKSCOUT_API_URL}?module=account&action=txlist&address=${address}`);
    const transactions = transactionsResponse.data.result;
    const contractCreationTxs = transactions.filter(tx => tx.to === null || tx.to === "");
    const contracts = await Promise.all(contractCreationTxs.map(async tx => {
      const contractAddress = tx.contractAddress;
      const txHash = tx.hash;
      const contractResponse = await axios.get(`${BLOCKSCOUT_API_URL}?module=transaction&action=gettxinfo&txhash=${txHash}`);
      return {
        address: contractAddress,     
        contractResponse: contractResponse.data.result};
    }));

    res.json({ contracts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/contract/:contract_id', async (req, res) => {
  try {
    const { contract_id } = req.params;
    const response = await axios.get(`${BLOCKSCOUT_API_URL}?module=contract&action=getsourcecode&address=${contract_id}`);
    const contractDetails = response.data.result[0];
    const formattedResponse = {
      message: "OK",
      result: {
        ABI: contractDetails.ABI,
        CompilerVersion: contractDetails.CompilerVersion,
        ContractName: contractDetails.ContractName,
        FileName: contractDetails.FileName,
        ImplementationAddress: contractDetails.ImplementationAddress,
        IsProxy: contractDetails.IsProxy,
        OptimizationUsed: contractDetails.OptimizationUsed,
        SourceCode: contractDetails.SourceCode
      },
      status: "1"
    };

    res.json(formattedResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/compile-contract", upload.single("contract"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const tempContractPath = path.join(__dirname, "temp", `${Date.now()}_${req.file.originalname}`);
    await fs.move(req.file.path, tempContractPath, { overwrite: true });

    const contractName = getContractName(tempContractPath);
    if (!contractName) {
      await fs.remove(tempContractPath);
      return res.status(400).json({ error: "Invalid Solidity file: Contract name not found." });
    }
    exec("npx hardhat compile", async (error, stdout, stderr) => {
      if (error) {
        await fs.remove(tempContractPath);
        return res.status(500).json({ error: "Compilation failed", details: stderr });
      }
      console.log(`Compilation successful for ${contractName}`);
      res.json({ contractName });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.post("/deploy-contract", async (req, res) => {

  if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Invalid or empty JSON body" });
  }

  const { contractName } = req.body;
  console.log(`Deploying contract: ${contractName}`);

  try {
      const contractAddress = await deployContract(contractName);
      deployedContracts[contractName] = contractAddress; // Store deployed contract
      res.json({ contractName, address: contractAddress });
  } catch (deployError) {
      res.status(500).json({ error: "Deployment failed", details: deployError.message });
  }
});

app.post('/verify-contract', async (req, res) => {
  try {
    const { contractAddress } = req.body;

    if (!contractAddress) {
      return res.status(400).json({ error: "Contract address is required" });
    }

    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
      network: "opencampus",
    });

    res.json({ message: "Contract verified successfully" });
  } catch (error) {
    console.error("Verification Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/add-contract', async (req, res) => {
  try {
    const { contractAddress } = req.body;
    if (!contractAddress) {
      return res.status(400).json({ error: "Contract address is required" });
    }

    const signer = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
    const contractWithSigner = archivaRegistry.connect(signer);

    const tx = await contractWithSigner.addContract(contractAddress);
    await tx.wait();

    res.json({ message: "Contract added to registry", contractAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/archive-contract', async (req, res) => {
  try {
    const { contractAddress } = req.body;
    if (!contractAddress) {
      return res.status(400).json({ error: "Contract address is required" });
    }
    const contractDetails = await axios.get(`${BLOCKSCOUT_API_URL}?module=contract&action=getsourcecode&address=${contractAddress}`);
    const contractData = contractDetails.data.result[0];
    const ipfsHash = await uploadToPinata(contractData);
    const signer = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
    const contractWithSigner = archivaRegistry.connect(signer);

    const tx = await contractWithSigner.updateContractState(contractAddress, 1, ipfsHash); // 1 = Pending
    await tx.wait();
    transitionToArchived(contractAddress, ipfsHash);

    res.json({ message: "Contract archived successfully", contractAddress, ipfsHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/update-contract-state', async (req, res) => {
  try {
    const { contractAddress, newState, ipfsHash } = req.body;
    if (!contractAddress || !newState) {
      return res.status(400).json({ error: "Contract address and new state are required" });
    }

    const signer = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
    const contractWithSigner = archivaRegistry.connect(signer);

    const tx = await contractWithSigner.updateContractState(contractAddress, newState, ipfsHash);
    await tx.wait();

    res.json({ message: "Contract state updated", contractAddress, newState, ipfsHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/contract-state/:contractAddress', async (req, res) => {
  try {
    const { contractAddress } = req.params;
    if (!contractAddress) {
      return res.status(400).json({ error: "Contract address is required" });
    }

    const [state, ipfsHash] = await archivaRegistry.getContractState(contractAddress);
    res.json({ contractAddress, state: ContractState[state], ipfsHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/fetch-archived-contract/:ipfsHash', async (req, res) => {
  try {
    const { ipfsHash } = req.params;
    if (!ipfsHash) {
      return res.status(400).json({ error: "IPFS hash is required" });
    }

    const contractData = await retrieveFromPinata(ipfsHash);
    res.json({ ipfsHash, contractData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API running at http://${getLocalIP()}:${port}`);
});

function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

