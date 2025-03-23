"use client"

import { useState } from "react"
import { Play, Download, Wand2, RotateCcw, AlertTriangle, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const SAMPLE_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}`

export function PlaygroundContent() {
  const [code, setCode] = useState(SAMPLE_CODE)
  const [isCompiling, setIsCompiling] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [securityScore, setSecurityScore] = useState<number | null>(null)

  const handleCompile = () => {
    setIsCompiling(true)
    toast.success("Compiling contract...")
    setTimeout(() => {
      setIsCompiling(false)
      toast.success("Compilation successful!")
    }, 2000)
  }

  const handleCheck = () => {
    setIsChecking(true)
    toast.success("AI is analyzing your code...")
    setTimeout(() => {
      setIsChecking(false)
      setSecurityScore(85)
      toast.success("Code analysis complete!")
    }, 2000)
  }

  const handleGetTestTokens = () => {
    toast.success("Sending 100 TEST tokens to your wallet...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <Select defaultValue="0.8.0">
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Solidity Version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.8.0">Solidity 0.8.0</SelectItem>
              <SelectItem value="0.8.4">Solidity 0.8.4</SelectItem>
              <SelectItem value="0.8.9">Solidity 0.8.9</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleCompile} disabled={isCompiling} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            {isCompiling ? "Compiling..." : "Compile & Run"}
          </Button>

          <Button onClick={handleCheck} disabled={isChecking} className="bg-purple-600 hover:bg-purple-700">
            <Wand2 className="h-4 w-4 mr-2" />
            {isChecking ? "Checking..." : "AI Checker"}
          </Button>

          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <div className="ml-auto flex items-center gap-4">
            <Button onClick={handleGetTestTokens} className="bg-blue-600 hover:bg-blue-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Get Test Tokens
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[600px] bg-transparent text-white font-mono text-sm focus:outline-none resize-none"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Security Check Result */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Security Check
              </h3>
              {securityScore ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {securityScore}%
                    </div>
                    <Progress value={securityScore} className="mb-2" />
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                      Good Security
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>No critical vulnerabilities found</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-yellow-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>2 minor issues detected</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p>Run AI Checker to see security analysis</p>
                </div>
              )}
            </div>

            {/* AI Suggestions */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">AI Suggestions</h3>
              <div className="space-y-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-md">
                  <div className="flex items-start gap-2">
                    <Wand2 className="h-4 w-4 text-purple-400 mt-1" />
                    <div>
                      <p className="text-sm text-white">Consider adding events for state changes</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Events help track contract state changes off-chain
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mt-1" />
                    <div>
                      <p className="text-sm text-white">Missing input validation</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Add require() statements to validate input parameters
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Templates */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Templates</h3>
              <div className="space-y-2">
                {["ERC20", "ERC721", "Ownable", "Pausable"].map((template) => (
                  <Button
                    key={template}
                    variant="outline"
                    className="w-full justify-start border-white/10 text-white hover:bg-white/5"
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 