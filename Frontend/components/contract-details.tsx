"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Download, ExternalLink, FileCode, FileText, History, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface ContractDetailsProps {
  id: string
}

export function ContractDetails({ id }: ContractDetailsProps) {
  const [loading, setLoading] = useState(true)
  const [contract, setContract] = useState<any>(null)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setContract({
        id,
        name: "TokenSwap.sol",
        status: "active",
        created: "March 23, 2025",
        modified: "March 23, 2025",
        storage: "On-chain",
        size: "12.4 KB",
        vendor: "Acme Inc.",
        description: "A smart contract for swapping ERC20 tokens with minimal slippage and fees.",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSwap is Ownable {
    // Fee percentage (in basis points, 1/100 of a percent)
    uint256 public feeRate = 30; // 0.3%
    
    event Swap(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );
    
    function swap(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _minAmountOut
    ) external returns (uint256 amountOut) {
        require(_tokenIn != _tokenOut, "Same tokens");
        require(_amountIn > 0, "Amount is zero");
        
        // Transfer tokens from user to contract
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        
        // Calculate fee
        uint256 fee = (_amountIn * feeRate) / 10000;
        uint256 amountInAfterFee = _amountIn - fee;
        
        // Calculate amount out (simplified for demo)
        amountOut = calculateAmountOut(_tokenIn, _tokenOut, amountInAfterFee);
        require(amountOut >= _minAmountOut, "Slippage too high");
        
        // Transfer tokens to user
        IERC20(_tokenOut).transfer(msg.sender, amountOut);
        
        emit Swap(msg.sender, _tokenIn, _tokenOut, _amountIn, amountOut);
        
        return amountOut;
    }
    
    function calculateAmountOut(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) internal view returns (uint256) {
        // In a real implementation, this would use price oracles or liquidity pools
        // Simplified for demo
        return _amountIn;
    }
    
    function setFeeRate(uint256 _feeRate) external onlyOwner {
        require(_feeRate <= 100, "Fee too high"); // Max 1%
        feeRate = _feeRate;
    }
    
    function withdrawFees(address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }
}`,
        transactions: [
          { hash: "0x1a2b3c...", type: "Deploy", timestamp: "March 23, 2025 14:30", status: "success" },
          { hash: "0x4d5e6f...", type: "Call: swap()", timestamp: "March 23, 2025 15:45", status: "success" },
          { hash: "0x7g8h9i...", type: "Call: setFeeRate()", timestamp: "March 23, 2025 16:20", status: "success" },
        ],
      })
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [id])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30">Active</Badge>
      case "archived":
        return <Badge variant="secondary">Archived</Badge>
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const copyToClipboard = () => {
    if (contract?.code) {
      navigator.clipboard.writeText(contract.code)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 loading-skeleton rounded" />
          <div className="h-6 w-48 loading-skeleton rounded" />
        </div>

        <div className="h-8 w-64 loading-skeleton rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 loading-skeleton rounded-lg" />
          ))}
        </div>

        <div className="h-8 w-full loading-skeleton rounded" />

        <div className="h-96 loading-skeleton rounded-lg" />
      </div>
    )
  }

  if (!contract) {
    return <div>Contract not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/contracts">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{contract.name}</h1>
        {getStatusBadge(contract.status)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="font-medium">{contract.created}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Last Modified</span>
              <span className="font-medium">{contract.modified}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Storage Type</span>
              <span className="font-medium">{contract.storage}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Size</span>
              <span className="font-medium">{contract.size}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="overview">
            <FileText className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="code">
            <FileCode className="h-4 w-4 mr-2" />
            Code
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <History className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Server className="h-4 w-4 mr-2" />
            Storage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="text-muted-foreground mt-1">{contract.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Vendor</p>
                      <p>{contract.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contract ID</p>
                      <p className="font-mono text-sm">{contract.id}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                  <Button variant="outline">View on Explorer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <Card className="border border-border/50">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-medium">Contract Source Code</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <CardContent className="p-0">
              <pre className="p-4 overflow-auto bg-secondary/30 rounded-b-lg font-mono text-sm h-96">
                {contract.code}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <Card className="border border-border/50">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium">Transaction History</h3>
              </div>
              <div className="divide-y divide-border">
                {contract.transactions.map((tx: any, index: number) => (
                  <div key={index} className="p-4 flex items-center justify-between hover:bg-secondary/30">
                    <div>
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={tx.status === "success" ? "outline" : "destructive"} className="mr-2">
                        {tx.status}
                      </Badge>
                      <p className="font-mono text-sm">{tx.hash}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="mt-4">
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Storage Information</h3>
                  <p className="text-muted-foreground mt-1">
                    This contract is stored{" "}
                    {contract.storage === "On-chain"
                      ? "directly on the blockchain"
                      : `on ${contract.storage} with blockchain verification`}
                    .
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-border/50">
                    <CardContent className="p-4">
                      <h4 className="font-medium">Storage Type</h4>
                      <p className="text-muted-foreground">{contract.storage}</p>
                      <div className="mt-2">
                        <p className="text-sm">Content Hash</p>
                        <p className="font-mono text-xs truncate">
                          0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border/50">
                    <CardContent className="p-4">
                      <h4 className="font-medium">Archival Status</h4>
                      <div className="flex items-center mt-1">
                        <span className="status-indicator status-active mr-2" />
                        <span>Verified and Archived</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Last verification: 2 hours ago</p>
                    </CardContent>
                  </Card>
                </div>

                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Archive
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Deploy New Version
        </Button>
      </div>
    </div>
  )
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

