"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Copy, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

interface RecentContractsProps {
  loading: boolean
}

interface ContractDetails {
  id: string
  name: string
  address: string
  status: string
  created: string
  storage: string
  description: string
  sourceCode: string
  fromAddress: string
  toAddress: string
  gasUsed: string
  blockNumber: string
}

export function RecentContracts({ loading }: RecentContractsProps) {
  const [contracts, setContracts] = useState<ContractDetails[]>([])
  const [selectedContract, setSelectedContract] = useState<ContractDetails | null>(null)
  const [contractToArchive, setContractToArchive] = useState<ContractDetails | null>(null)
  const [isArchiving, setIsArchiving] = useState(false)

  useEffect(() => {
    if (!loading) {
      // Simulate data loading
      const timer = setTimeout(() => {
        setContracts([
          {
            id: "c-1",
            name: "CourseRegistration",
            address: "0x1234...5678",
            status: "active",
            created: "2023-03-15",
            storage: "On-chain",
            description: "A smart contract for managing course registration and student enrollment in educational institutions.",
            sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseRegistration {
    struct Course {
        string name;
        uint256 capacity;
        uint256 enrolled;
        uint256 price;
        bool isActive;
    }
    
    mapping(uint256 => Course) public courses;
    
    function enrollInCourse(uint256 courseId) external payable {
        // Implementation
    }
}`,
            fromAddress: "0xabcd...efgh",
            toAddress: "0x1234...5678",
            gasUsed: "150,000",
            blockNumber: "12345678"
          },
          {
            id: "c-2",
            name: "CredentialVerification",
            address: "0x8765...4321",
            status: "archived",
            created: "2023-02-28",
            storage: "IPFS",
            description: "A blockchain-based system for verifying and issuing educational credentials and certificates.",
            sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVerification {
    struct Credential {
        string studentName;
        string institution;
        string degree;
        uint256 issueDate;
        string ipfsHash;
    }
    
    mapping(address => Credential[]) public credentials;
    
    function issueCredential(string memory ipfsHash) external {
        // Implementation
    }
}`,
            fromAddress: "0xefgh...ijkl",
            toAddress: "0x8765...4321",
            gasUsed: "180,000",
            blockNumber: "12345679"
          },
          {
            id: "c-3",
            name: "StudentLoan",
            address: "0x2468...1357",
            status: "active",
            created: "2023-03-10",
            storage: "On-chain",
            description: "A decentralized lending platform for student loans with automated repayment tracking.",
            sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentLoan {
    struct Loan {
        address student;
        uint256 amount;
        uint256 interestRate;
        uint256 startDate;
        uint256 endDate;
    }
    
    mapping(address => Loan[]) public loans;
    
    function requestLoan(uint256 amount) external {
        // Implementation
    }
}`,
            fromAddress: "0xijkl...mnop",
            toAddress: "0x2468...1357",
            gasUsed: "200,000",
            blockNumber: "12345680"
          },
          {
            id: "c-4",
            name: "ResearchFunding",
            address: "0x9876...5432",
            status: "archived",
            created: "2023-03-05",
            storage: "Arweave",
            description: "A smart contract for managing research funding and grant distribution in academic institutions.",
            sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResearchFunding {
    struct Grant {
        string researchTitle;
        address researcher;
        uint256 amount;
        uint256 duration;
        string ipfsHash;
    }
    
    mapping(uint256 => Grant) public grants;
    
    function submitProposal(string memory ipfsHash) external {
        // Implementation
    }
}`,
            fromAddress: "0xmnop...qrst",
            toAddress: "0x9876...5432",
            gasUsed: "170,000",
            blockNumber: "12345681"
          },
          {
            id: "c-5",
            name: "AcademicPublishing",
            address: "0x1357...2468",
            status: "archived",
            created: "2023-03-01",
            storage: "IPFS",
            description: "A decentralized platform for academic paper publishing and peer review process.",
            sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicPublishing {
    struct Paper {
        string title;
        address author;
        string ipfsHash;
        uint256 submissionDate;
        bool isPeerReviewed;
    }
    
    mapping(uint256 => Paper) public papers;
    
    function submitPaper(string memory ipfsHash) external {
        // Implementation
    }
}`,
            fromAddress: "0xqrst...uvwx",
            toAddress: "0x1357...2468",
            gasUsed: "190,000",
            blockNumber: "12345682"
          }
        ])
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [loading])

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleArchive = async (contract: ContractDetails) => {
    setIsArchiving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      // Update contract status
      setContracts(prevContracts =>
        prevContracts.map(c =>
          c.id === contract.id
            ? { ...c, status: "archived", storage: "IPFS" }
            : c
        )
      )
      
      toast.success("Contract successfully archived")
      setContractToArchive(null)
    } catch (error) {
      toast.error("Failed to archive contract")
    } finally {
      setIsArchiving(false)
    }
  }

  return (
    <>
      <Card className="border border-border/50 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Recent Contracts</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/contracts">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="w-full">
              <div className="flex items-center justify-between border-b pb-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-24 loading-skeleton rounded" />
                ))}
              </div>
              <div className="space-y-3 pt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 w-20 loading-skeleton rounded" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract Name</TableHead>
                  <TableHead>Contract Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Created
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id} className="hover:bg-secondary/50">
                    <TableCell className="font-medium">
                      <Link href={`/contracts/${contract.id}`} className="text-primary hover:underline">
                        {contract.name}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{contract.address}</TableCell>
                    <TableCell>{getStatusBadge(contract.status)}</TableCell>
                    <TableCell>{contract.created}</TableCell>
                    <TableCell>{contract.storage}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedContract(contract)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setContractToArchive(contract)}
                            disabled={contract.status !== "active"}
                          >
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Contract Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(80vh-8rem)]">
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contract Name</h3>
                  <p className="mt-1">{selectedContract?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className="mt-1">{selectedContract && getStatusBadge(selectedContract.status)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contract Address</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="font-mono text-sm">{selectedContract?.address}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => selectedContract && copyToClipboard(selectedContract.address)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Storage</h3>
                  <p className="mt-1">{selectedContract?.storage}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">From Address</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="font-mono text-sm">{selectedContract?.fromAddress}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => selectedContract && copyToClipboard(selectedContract.fromAddress)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">To Address</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="font-mono text-sm">{selectedContract?.toAddress}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => selectedContract && copyToClipboard(selectedContract.toAddress)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Gas Used</h3>
                  <p className="mt-1">{selectedContract?.gasUsed}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Block Number</h3>
                  <p className="mt-1">{selectedContract?.blockNumber}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{selectedContract?.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Source Code</h3>
                <div className="mt-1 relative">
                  <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6" onClick={() => selectedContract && copyToClipboard(selectedContract.sourceCode)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <pre className="p-4 bg-secondary/30 rounded-lg overflow-auto font-mono text-sm">
                    {selectedContract?.sourceCode}
                  </pre>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!contractToArchive} onOpenChange={() => setContractToArchive(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Contract</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive the contract "{contractToArchive?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setContractToArchive(null)}
              disabled={isArchiving}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => contractToArchive && handleArchive(contractToArchive)}
              disabled={isArchiving}
            >
              {isArchiving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Archiving...
                </>
              ) : (
                "Archive"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

