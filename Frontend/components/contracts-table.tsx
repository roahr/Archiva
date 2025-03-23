"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpDown, Download, Filter, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

interface Contract {
  id: string
  name: string
  number: string
  fromAddress: string
  toAddress: string
  timestamp: string
  status: string
  storage: string
  gasUsed: string
  expiryDate: string
}

export function ContractsTable() {
  const [loading, setLoading] = useState(true)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    number: true,
    fromAddress: true,
    toAddress: true,
    timestamp: true,
    status: true,
    storage: true,
    gasUsed: true,
    expiryDate: true
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setContracts([
        {
          id: "c-1",
          name: "CourseRegistration",
          number: "CON-001",
          fromAddress: "0x1234...5678",
          toAddress: "0xabcd...efgh",
          timestamp: "2023-03-15 14:30",
          status: "active",
          storage: "On-chain",
          gasUsed: "150,000",
          expiryDate: "2024-03-15"
        },
        {
          id: "c-2",
          name: "CredentialVerification",
          number: "CON-002",
          fromAddress: "0x8765...4321",
          toAddress: "0xefgh...ijkl",
          timestamp: "2023-02-28 09:15",
          status: "archived",
          storage: "IPFS",
          gasUsed: "180,000",
          expiryDate: "2024-02-28"
        },
        {
          id: "c-3",
          name: "StudentLoan",
          number: "CON-003",
          fromAddress: "0x2468...1357",
          toAddress: "0xijkl...mnop",
          timestamp: "2023-03-10 16:45",
          status: "active",
          storage: "On-chain",
          gasUsed: "200,000",
          expiryDate: "2024-03-10"
        },
        {
          id: "c-4",
          name: "ResearchFunding",
          number: "CON-004",
          fromAddress: "0x9876...5432",
          toAddress: "0xmnop...qrst",
          timestamp: "2023-03-05 11:20",
          status: "archived",
          storage: "Arweave",
          gasUsed: "170,000",
          expiryDate: "2024-03-05"
        },
        {
          id: "c-5",
          name: "AcademicPublishing",
          number: "CON-005",
          fromAddress: "0x1357...2468",
          toAddress: "0xqrst...uvwx",
          timestamp: "2023-03-01 13:40",
          status: "archived",
          storage: "IPFS",
          gasUsed: "190,000",
          expiryDate: "2024-03-01"
        }
      ])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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

  const handleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    setContracts(prev => [...prev].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    }))
  }

  const handleExport = (format: 'json' | 'csv') => {
    const data = contracts.map(contract => ({
      ...contract,
      status: contract.status,
      storage: contract.storage
    }))

    if (format === 'json') {
      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'contracts.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      const headers = Object.keys(data[0])
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header as keyof Contract]).join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'contracts.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <Card className="border border-border/50 shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilterDialog(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button size="sm" asChild>
          <Link href="/deploy">
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="p-4">
          <div className="flex items-center justify-between border-b pb-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-4 w-24 loading-skeleton rounded" />
            ))}
          </div>
          <div className="space-y-4 pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                {[...Array(9)].map((_, j) => (
                  <div key={j} className="h-4 w-20 loading-skeleton rounded" />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.name && <TableHead>Contract Name</TableHead>}
                {visibleColumns.number && <TableHead>Contract Number</TableHead>}
                {visibleColumns.fromAddress && <TableHead>From Address</TableHead>}
                {visibleColumns.toAddress && <TableHead>To Address</TableHead>}
                {visibleColumns.timestamp && (
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={handleSort}>
                      Timestamp
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                )}
                {visibleColumns.status && <TableHead>Status</TableHead>}
                {visibleColumns.storage && <TableHead>Storage</TableHead>}
                {visibleColumns.gasUsed && <TableHead>Gas Used</TableHead>}
                {visibleColumns.expiryDate && <TableHead>Expiry Date</TableHead>}
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id} className="hover:bg-secondary/50">
                  {visibleColumns.name && (
                    <TableCell className="font-medium">
                      <Link href={`/contracts/${contract.id}`} className="text-primary hover:underline">
                        {contract.name}
                      </Link>
                    </TableCell>
                  )}
                  {visibleColumns.number && <TableCell>{contract.number}</TableCell>}
                  {visibleColumns.fromAddress && <TableCell className="font-mono text-sm">{contract.fromAddress}</TableCell>}
                  {visibleColumns.toAddress && <TableCell className="font-mono text-sm">{contract.toAddress}</TableCell>}
                  {visibleColumns.timestamp && <TableCell>{contract.timestamp}</TableCell>}
                  {visibleColumns.status && <TableCell>{getStatusBadge(contract.status)}</TableCell>}
                  {visibleColumns.storage && <TableCell>{contract.storage}</TableCell>}
                  {visibleColumns.gasUsed && <TableCell>{contract.gasUsed}</TableCell>}
                  {visibleColumns.expiryDate && <TableCell>{contract.expiryDate}</TableCell>}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/contracts/${contract.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Columns</DialogTitle>
            <DialogDescription>
              Select which columns you want to display in the table.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {Object.entries(visibleColumns).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => 
                    setVisibleColumns(prev => ({ ...prev, [key]: checked }))
                  }
                />
                <label
                  htmlFor={key}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

