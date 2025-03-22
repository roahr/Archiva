import express from 'express';
import axios from 'axios';
import cors from 'cors';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { networkInterfaces } from 'os';

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


const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

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

