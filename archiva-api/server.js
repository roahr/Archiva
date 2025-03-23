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
import Groq from 'groq-sdk';


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
const archivaRegistryAddress = "0xDCCb6B190EB3691749F8cAf77cA77729B555B7a5";
const archivaRegistryABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        }
      ],
      "name": "addContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "contractList",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "contracts",
      "outputs": [
        {
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        },
        {
          "internalType": "enum ArchivaRegistry.ContractState",
          "name": "state",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllContracts",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        }
      ],
      "name": "getContractState",
      "outputs": [
        {
          "internalType": "enum ArchivaRegistry.ContractState",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        },
        {
          "internalType": "enum ArchivaRegistry.ContractState",
          "name": "newState",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "updateContractState",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const archivaRegistry = new ethers.Contract(archivaRegistryAddress, archivaRegistryABI, provider);

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });





function sanitizeJsonString(jsonString) {

  if (typeof jsonString !== 'string') return jsonString;

  let cleaned = jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  

  const jsonStartIndex = cleaned.indexOf('{');

  const jsonEndIndex = cleaned.lastIndexOf('}') + 1;

  

  if (jsonStartIndex >= 0 && jsonEndIndex > jsonStartIndex) {

    cleaned = cleaned.substring(jsonStartIndex, jsonEndIndex);

  }


  console.log("Sanitized JSON:", cleaned.substring(0, 100) + "...");

  return cleaned;

}


async function generateWithGroq(prompt, model = "llama-3.3-70b-versatile") {

  let retries = 3; 

  let backoffTime = 5000; 

  

  console.log(`Calling Groq API with model: ${model}`);

  console.log(`Prompt (first 100 chars): ${prompt.substring(0, 100)}...`);

  

  while (retries > 0) {

    try {

      const response = await groq.chat.completions.create({

        model: model,

        messages: [

          { role: "system", content: "You are an advanced Solidity AI expert with deep knowledge of smart contract security, gas optimizations, and best practices." },

          { role: "user", content: prompt }

        ],

        temperature: 0.3,

        max_tokens: 2048,

        top_p: 1,

        stream: false,

      });



      const responseContent = response.choices[0]?.message?.content || "";

      console.log(`Received response (first 100 chars): ${responseContent.substring(0, 100)}...`);

      return responseContent;

    } catch (error) {

      if (error.message.includes("rate limit")) {

        console.warn(`Rate limit hit! Retrying in ${backoffTime/1000} seconds...`);

        await new Promise((resolve) => setTimeout(resolve, backoffTime));

        retries--;

        

        backoffTime *= 2;

      } else {

        console.error("Groq API error:", error.message);

        throw error;

      }

    }

  }

  throw new Error("Failed due to repeated rate limiting");

}

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

async function deployContract(contractName, constructorArgs = []) {
  try {
    const Contract = await hre.ethers.deployContract(contractName, constructorArgs);
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

    // Create contracts directory in the Hardhat project structure
    const contractsDir = path.join(__dirname, "contracts");
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir, { recursive: true });
    }

    // Clean up any existing contract files and artifacts to avoid conflicts
    const files = fs.readdirSync(contractsDir);
    for (const file of files) {
      if (file.endsWith('.sol')) {
        fs.unlinkSync(path.join(contractsDir, file));
      }
    }

    // Clean artifacts directory
    const artifactsDir = path.join(__dirname, "artifacts");
    if (fs.existsSync(artifactsDir)) {
      fs.removeSync(artifactsDir);
    }

    // Clean cache directory
    const cacheDir = path.join(__dirname, "cache");
    if (fs.existsSync(cacheDir)) {
      fs.removeSync(cacheDir);
    }

    // Move the uploaded file to the contracts directory with a simple name
    const contractPath = path.join(contractsDir, "Contract.sol");
    await fs.move(req.file.path, contractPath, { overwrite: true });

    const contractName = getContractName(contractPath);
    if (!contractName) {
      await fs.remove(contractPath);
      return res.status(400).json({ error: "Invalid Solidity file: Contract name not found." });
    }
    exec("npx hardhat compile", async (error, stdout, stderr) => {
      try {

        if (error) {

          return res.status(500).json({ error: "Compilation failed", details: stderr });

        }



        console.log(`Compilation successful for ${contractName}`);

        res.json({ contractName });

      } catch (execError) {

        res.status(500).json({ error: "Execution error", details: execError.message });

      } finally {

        if (tempContractPath) {

          await fs.remove(tempContractPath);

        }
      }
    });
  } catch (err) {
    console.error("Server error during compilation:", err);
    res.status(500).json({ 
      error: "Server error", 
      details: err.message 
    });
  }
});

app.post("/deploy-contract", async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Invalid or empty JSON body" });
  }

  const { contractName, constructorArgs } = req.body;
  console.log(`Deploying contract: ${contractName}`);

  try {
    // Verify the artifact exists before attempting deployment
    const artifactPath = path.join(__dirname, "artifacts/contracts/Contract.sol", `${contractName}.json`);
    if (!fs.existsSync(artifactPath)) {
      throw new Error(`Contract artifact not found at ${artifactPath}`);
    }

    console.log("Found artifact at:", artifactPath);
    
    // Load the artifact to verify it's valid
    const artifact = await fs.readJson(artifactPath);
    if (!artifact || !artifact.abi) {
      throw new Error('Invalid artifact: missing ABI');
    }

    const contractAddress = await deployContract(contractName);
    console.log("Contract deployed at:", contractAddress);

    // Get the transaction hash from the deployment
    const code = await provider.getCode(contractAddress);
    if (code === '0x') {
      throw new Error('Contract deployment failed - no code at address');
    }

    deployedContracts[contractName] = contractAddress;
    
    // Get the latest transaction for this address to find the deployment transaction
    const tx = await provider.getTransaction(contractAddress);
    
    res.json({ 
      contractName, 
      address: contractAddress,
      transactionHash: tx ? tx.hash : undefined,
      message: "Contract deployed successfully"
    });
  } catch (deployError) {
    console.error("Deployment error:", deployError);
    res.status(500).json({ 
      error: "Deployment failed", 
      details: deployError.message 
    });
  }
});

app.post('/verify-contract', async (req, res) => {
  try {
    const { contractAddress, constructorArgs } = req.body;

    if (!contractAddress) {
      return res.status(400).json({ error: "Contract address is required" });
    }

    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs || [], // Pass constructorArgs
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

app.get('/archived-contracts', async (req, res) => {
  try {
    // Fetch all contracts from the ArchivaRegistry
    const allContracts = await archivaRegistry.getAllContracts();

    // Fetch the state and IPFS hash for each contract
    const archivedContracts = await Promise.all(
      allContracts.map(async (contractAddress) => {
        const [state, ipfsHash] = await archivaRegistry.getContractState(contractAddress);
        return { contractAddress, state: ContractState[state], ipfsHash };
      })
    );

    // Filter contracts with state "Archived"
    const filteredArchivedContracts = archivedContracts.filter(
      (contract) => contract.state === "Archived"
    );

    res.json({ archivedContracts: filteredArchivedContracts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/codeai/autocomplete", async (req, res) => {
  try {
    console.log("Autocomplete request received:", new Date().toISOString());
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      console.log("Invalid code input received");
      return res.status(400).json({ error: "Valid code input is required" });
    }

    console.log(`Code length: ${code.length}`);
    console.log(`Code snippet: ${code.substring(0, 100)}...`);

    const prompt = `You are an AI Solidity expert. Predict the next optimal lines of Solidity code based on the following existing code:\n\n${code}\n\nEnsure your prediction follows best practices, maintains readability, and avoids unnecessary complexity. Provide only the suggested Solidity code without explanation or markdown formatting.`;
    
    const suggestions = await generateWithGroq(prompt, "llama-3.1-8b-instant");
    console.log("Autocomplete suggestions generated successfully");

    res.json({ suggestions });
  } catch (error) {
    console.error("Autocomplete error:", error.message);
    res.status(500).json({ error: "Failed to generate code suggestions" });
  }
});

app.post("/codeai/fix", async (req, res) => {
  try {
    console.log("Code fix request received:", new Date().toISOString());
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      console.log("Invalid code input received");
      return res.status(400).json({ error: "Valid code input is required" });
    }

    console.log(`Code length: ${code.length}`);
    console.log(`Code snippet: ${code.substring(0, 100)}...`);

    const prompt = `You are a Solidity security and optimization expert. Perform a comprehensive analysis of the following Solidity contract:

\`\`\`solidity
${code}
\`\`\`

Your task is to:
1. Identify and fix any bugs, security vulnerabilities, or logical errors
2. Optimize the code for gas efficiency without compromising readability
3. Ensure the code follows current Solidity best practices
4. Maintain the original functionality while improving the implementation

IMPORTANT: You MUST return a JSON object with exactly two fields: "Reason" and "Code". Ensure your response is properly escaped and contains no control characters, line breaks in strings should be represented as \\n not actual newlines within the JSON string values. Do not include any text outside the JSON object.

Format example:
{"Reason": "Summary of changes", "Code": "contract Example { ... }"}`;

    const response = await generateWithGroq(prompt, "llama-3.3-70b-versatile");
    
    try {

      const cleanedResponse = sanitizeJsonString(response);
      console.log("Attempting to parse JSON response");
      
      const jsonResponse = JSON.parse(cleanedResponse);
      console.log("JSON parsing successful");
      

      if (!jsonResponse.Reason || !jsonResponse.Code) {
        console.error("Missing required fields in JSON response");
        throw new Error("Invalid response format: missing Reason or Code fields");
      }
      
      res.json(jsonResponse);
    } catch (error) {
      console.error("JSON parsing error:", error.message);
      console.error("Raw response:", response);
      
      try {
        console.log("Attempting regex fallback extraction");
        const reasonMatch = response.match(/["']Reason["']\s*:\s*["']([^"']*)["']/);
        const codeMatch = response.match(/["']Code["']\s*:\s*["']([^"']*)["']/);
        
        if (reasonMatch && codeMatch) {
          const extractedReason = reasonMatch[1].replace(/\\n/g, '\n');
          const extractedCode = codeMatch[1].replace(/\\n/g, '\n');
          
          console.log("Regex extraction successful");
          res.json({
            Reason: extractedReason,
            Code: extractedCode
          });
        } else {
          throw new Error("Regex extraction failed");
        }
      } catch (regexError) {
        console.error("Regex fallback failed:", regexError.message);
        res.status(500).json({ 
          error: "Invalid JSON response from AI.",
          rawResponse: response.substring(0, 200) + "..." 
        });
      }
    }
  } catch (error) {
    console.error("Code fix error:", error.message);
    res.status(500).json({ error: "Failed to analyze and fix code" });
  }
});

// Utility function to fetch gas and storage usage for a contract
const fetchGasAndStorageUsage = async (contractAddress) => {
  const response = await axios.get(`${BLOCKSCOUT_API_URL}?module=account&action=txlist&address=${contractAddress}`);
  const transactions = response.data.result;
  const totalGas = transactions.reduce((sum, tx) => sum + parseInt(tx.gasUsed), 0);
  const totalStorage = transactions.reduce((sum, tx) => sum + parseInt(tx.storageUsed), 0);
  return { totalGas, totalStorage };
};

app.post('/compare-gas-and-storage', async (req, res) => {
  try {
    const { contractAddresses } = req.body;
    if (!contractAddresses || !Array.isArray(contractAddresses)) {
      return res.status(400).json({ error: "Contract addresses array is required" });
    }

    console.log("Fetching gas and storage usage before archiving...");
    const resultsBefore = [];
    for (const address of contractAddresses) {
      console.log(`Fetching data for contract: ${address}`);
      const { totalGas, totalStorage } = await fetchGasAndStorageUsage(address);
      resultsBefore.push({ address, totalGas, totalStorage });
    }

    console.log("Archiving contracts...");
    for (const address of contractAddresses) {
      console.log(`Archiving contract: ${address}`);
      await axios.post('http://localhost:5000/archive-contract', { contractAddress: address });
    }

    console.log("Fetching gas and storage usage after archiving...");
    const resultsAfter = [];
    for (const address of contractAddresses) {
      console.log(`Fetching data for contract: ${address}`);
      const { totalGas, totalStorage } = await fetchGasAndStorageUsage(address);
      resultsAfter.push({ address, totalGas, totalStorage });
    }

    console.log("Comparison completed successfully.");
    res.json({ resultsBefore, resultsAfter });
  } catch (error) {
    console.error("Error in /compare-gas-and-storage:", error.message);
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