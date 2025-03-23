"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, Upload, Trophy, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface SecurityIssue {
  id: string
  severity: "high" | "medium" | "low"
  title: string
  description: string
  recommendation: string
}

interface TopContract {
  name: string
  address: string
  score: number
  badge: string
}

export default function SecurityScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [contractAddress, setContractAddress] = useState("")
  const [securityScore, setSecurityScore] = useState<number | null>(null)
  const [issues, setIssues] = useState<SecurityIssue[]>([])

  const topContracts: TopContract[] = [
    {
      name: "SafeVault",
      address: "0x1234...5678",
      score: 98,
      badge: "🛡️ Elite Security",
    },
    {
      name: "SecureDAO",
      address: "0x8765...4321",
      score: 95,
      badge: "🔒 Top Defender",
    },
    {
      name: "GuardedNFT",
      address: "0x9876...1234",
      score: 92,
      badge: "⚔️ Security Pro",
    },
  ]

  const handleScan = async () => {
    setIsScanning(true)
    toast.success("Starting security scan...")

    // Simulate scanning process
    setTimeout(() => {
      setSecurityScore(85)
      setIssues([
        {
          id: "1",
          severity: "high",
          title: "Reentrancy Vulnerability",
          description: "Contract state changes after external calls",
          recommendation: "Implement checks-effects-interactions pattern",
        },
        {
          id: "2",
          severity: "medium",
          title: "Timestamp Dependence",
          description: "Using block.timestamp for critical logic",
          recommendation: "Use block numbers instead of timestamps",
        },
        {
          id: "3",
          severity: "low",
          title: "Floating Pragma",
          description: "Solidity pragma is not fixed",
          recommendation: "Lock pragma to specific version",
        },
      ])
      setIsScanning(false)
      toast.success("Security scan completed!")
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500 border-red-500 bg-red-500/10"
      case "medium":
        return "text-yellow-500 border-yellow-500 bg-yellow-500/10"
      case "low":
        return "text-green-500 border-green-500 bg-green-500/10"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-950 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Security Scanner</h1>
          <p className="text-gray-400">Detect vulnerabilities in your smart contracts</p>
        </div>

        {/* Scan Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Scan Contract</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter a contract address or upload a Solidity file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter contract address"
                      value={contractAddress}
                      onChange={(e) => setContractAddress(e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button onClick={handleScan} disabled={isScanning} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4 mr-2" />
                      {isScanning ? "Scanning..." : "Scan"}
                    </Button>
                  </div>
                  <div className="text-center border border-dashed border-white/10 rounded-lg p-8">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-400">
                      Drag and drop a .sol file or{" "}
                      <button className="text-blue-400 hover:underline">browse</button>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Score */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Security Score</CardTitle>
              <CardDescription className="text-gray-400">
                Overall security rating
              </CardDescription>
            </CardHeader>
            <CardContent>
              {securityScore ? (
                <div className="text-center">
                  <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {securityScore}%
                  </div>
                  <Progress value={securityScore} className="mb-4" />
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                    Good Security
                  </Badge>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  No contract scanned
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Issues and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security Issues */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Security Issues</h2>
            {issues.map((issue) => (
              <Card key={issue.id} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Badge
                      variant="outline"
                      className={`uppercase ${getSeverityColor(issue.severity)}`}
                    >
                      {issue.severity}
                    </Badge>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{issue.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{issue.description}</p>
                      <div className="bg-white/5 p-3 rounded-md">
                        <p className="text-sm text-white">
                          <span className="text-blue-400">Recommendation:</span>{" "}
                          {issue.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!issues.length && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 text-center text-gray-400">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-4 opacity-50" />
                  No issues found yet. Start by scanning a contract.
                </CardContent>
              </Card>
            )}
          </div>

          {/* Security Leaderboard */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Security Leaderboard</h2>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {topContracts.map((contract, index) => (
                    <div
                      key={contract.address}
                      className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Trophy className={`h-4 w-4 ${index === 0 ? "text-yellow-500" : "text-gray-400"}`} />
                          <h3 className="font-medium text-white">{contract.name}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{contract.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">{contract.score}%</div>
                        <Badge variant="outline" className="border-blue-500 text-blue-500 mt-1">
                          {contract.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 