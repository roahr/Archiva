"use client";

import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function ConnectWalletButton() {
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  // EDU Chain Testnet Details
  const EDU_CHAIN_ID = "0x13882"; // Replace with actual EDU Chain Testnet ID
  const EDU_CHAIN_RPC = "https://rpc.open-campus-codex.gelato.digital";

  const connectWallet = async (walletType: string) => {
    setConnecting(true);

    try {
      if (walletType === "metamask") {
        await connectMetaMask();
      } else if (walletType === "core") {
        await connectCoreWallet();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setConnecting(false);
    }
  };

  const connectMetaMask = async () => {
    // Check if ethereum object exists on window and cast to appropriate type
    const ethereum = (window as any).ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        const currentChainId = await (window as any).ethereum.request({ method: "eth_chainId" });

        // Switch to EDU Chain Testnet if not already connected
        if (currentChainId !== EDU_CHAIN_ID) {
          await switchToEDUChain(ethereum);
        }

        // Request account access
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];
        setConnected(true);
        setWalletAddress(walletAddress);

        // Fetch balance
        const balance = await getBalance(walletAddress);
        setBalance(balance);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      alert("Please install MetaMask to connect to EDU Chain.");
    }
  };
  const connectCoreWallet = async () => {
    // Check if avalanche object exists on window and cast to appropriate type
    const avalanche = (window as any).avalanche;
    if (typeof avalanche !== "undefined") {
      try {
        const currentChainId = await avalanche.request({ method: "eth_chainId" });

        // Switch to EDU Chain Testnet if not already connected
        if (currentChainId !== EDU_CHAIN_ID) {
          await switchToEDUChain(avalanche);
        }

        // Request account access
        const accounts = await (window as any).avalanche.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];
        setConnected(true);
        setWalletAddress(walletAddress);

        // Fetch balance
        const balance = await getBalance(walletAddress);
        setBalance(balance);
      } catch (error) {
        console.error("Error connecting to Core Wallet:", error);
        alert("Failed to connect to Core Wallet. Please try again.");
      }
    } else {
      alert("Please install the Core Wallet extension to connect to EDU Chain.");
    }
  };

  const switchToEDUChain = async (provider: any) => {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: EDU_CHAIN_ID }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: EDU_CHAIN_ID,
                chainName: "EDU Chain Testnet",
                rpcUrls: [EDU_CHAIN_RPC],
                nativeCurrency: { name: "EDU Token", symbol: "EDU", decimals: 18 },
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add EDU Chain Testnet:", addError);
          alert("Failed to add EDU Chain Testnet. Please add it manually.");
        }
      } else {
        console.error("Failed to switch to EDU Chain Testnet:", switchError);
        alert("Failed to switch to EDU Chain Testnet. Please switch manually.");
      }
    }
  };

  const getBalance = async (address: string): Promise<string> => {
    try {
      const response = await fetch(EDU_CHAIN_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [address, "latest"],
          id: 1,
        }),
      });

      const data = await response.json();

      if (data.result) {
        const balance = parseInt(data.result, 16) / 1e18;
        return `${balance} EDU`;
      } else {
        throw new Error("Invalid response from RPC");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      return "Error fetching balance";
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setWalletAddress("");
    setBalance("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-2",
            connected && "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          <Wallet className="h-4 w-4" />
          {connected ? `${walletAddress} (${balance})` : "Connect Wallet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{connected ? "Wallet Connected" : "Connect Wallet"}</DialogTitle>
          <DialogDescription>
            {connected
              ? "Your wallet is connected to Archiva Dashboard"
              : "Connect your wallet to deploy and manage contracts"}
          </DialogDescription>
        </DialogHeader>

        {connected ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Connected Account</p>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">MetaMask</p>
                    <p className="text-xs text-muted-foreground">{walletAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect
              </Button>
              <Button>Switch Account</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 hover:border-primary hover:bg-primary/5"
              onClick={() => connectWallet("metamask")}
              disabled={connecting}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">MetaMask</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 hover:border-primary hover:bg-primary/5"
              onClick={() => connectWallet("core")}
              disabled={connecting}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">Core Wallet</span>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}