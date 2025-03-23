"use client"

import type React from "react"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function ConnectWalletButton() {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = (walletType: string) => {
    setConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      setWalletAddress("0x1a2b...3c4d")
    }, 1500)
  }

  const handleDisconnect = () => {
    setConnected(false)
    setWalletAddress("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("flex items-center gap-2", connected && "bg-primary/10 text-primary hover:bg-primary/20")}
        >
          <Wallet className="h-4 w-4" />
          {connected ? walletAddress : "Connect Wallet"}
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
                    <p className="text-xs text-muted-foreground">0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</p>
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
              onClick={() => handleConnect("metamask")}
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
              onClick={() => handleConnect("walletconnect")}
              disabled={connecting}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <WalletConnectIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">WalletConnect</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 hover:border-primary hover:bg-primary/5"
              onClick={() => handleConnect("coinbase")}
              disabled={connecting}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <CoinbaseIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">Coinbase</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 hover:border-primary hover:bg-primary/5"
              onClick={() => handleConnect("ledger")}
              disabled={connecting}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <LedgerIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">Ledger</span>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function WalletConnectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}

function CoinbaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14h8" />
    </svg>
  )
}

function LedgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="12" x="3" y="6" rx="2" />
      <path d="M7 12h10" />
    </svg>
  )
}

