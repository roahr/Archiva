"use client"

import type React from "react"

import { useState, useRef } from "react"
import { AlertCircle, ArrowRight, Check, FileCode, HardDrive, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function DeployContract() {
  const [step, setStep] = useState(1)
  const [deploying, setDeploying] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    storage: "on-chain",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStorageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, storage: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.name.endsWith('.sol')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          setFormData(prev => ({ ...prev, code: content }))
          toast.success("File uploaded successfully")
        }
        reader.readAsText(file)
      } else {
        toast.error("Please upload a .sol file")
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text')
    setFormData(prev => ({ ...prev, code: pastedText }))
    toast.success("Code pasted successfully")
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleDeploy = () => {
    setDeploying(true)

    // Simulate deployment progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setDeployProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setDeploying(false)
          setStep(4) // Success step
        }, 500)
      }
    }, 300)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Contract Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. TokenSwap"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this contract does..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={nextStep} disabled={!formData.name}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code">Contract Code</Label>
              <div className="relative">
                <Textarea
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  placeholder="// Paste your Solidity code here or upload a .sol file..."
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".sol"
                    onChange={handleFileUpload}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upload .sol file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                You can either paste your Solidity code directly or upload a .sol file
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} disabled={!formData.code}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Storage Type</Label>
              <RadioGroup
                value={formData.storage}
                onValueChange={handleStorageChange}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="on-chain" id="on-chain" className="peer sr-only" />
                  <Label
                    htmlFor="on-chain"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-secondary/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <HardDrive className="mb-3 h-6 w-6" />
                    <div className="text-center">
                      <p className="font-medium">On-Chain</p>
                      <p className="text-sm text-muted-foreground">Store directly on blockchain</p>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="ipfs" id="ipfs" className="peer sr-only" />
                  <Label
                    htmlFor="ipfs"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-secondary/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <FileCode className="mb-3 h-6 w-6" />
                    <div className="text-center">
                      <p className="font-medium">IPFS</p>
                      <p className="text-sm text-muted-foreground">Distributed file storage</p>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="arweave" id="arweave" className="peer sr-only" />
                  <Label
                    htmlFor="arweave"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-secondary/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Database className="mb-3 h-6 w-6" />
                    <div className="text-center">
                      <p className="font-medium">Arweave</p>
                      <p className="text-sm text-muted-foreground">Permanent storage</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gas Fee Estimation</AlertTitle>
              <AlertDescription>Estimated deployment cost: 0.0042 ETH</AlertDescription>
            </Alert>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleDeploy} disabled={deploying}>
                {deploying ? (
                  <>
                    <span className="mr-2">Deploying...</span>
                    <span>{deployProgress}%</span>
                  </>
                ) : (
                  <>
                    Deploy Contract
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {deploying && (
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${deployProgress}%` }}
                />
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold">Contract Deployed Successfully!</h2>
              <p className="text-muted-foreground mt-2">Your contract has been deployed and is now being processed.</p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href="/contracts">View All Contracts</a>
              </Button>
              <Button asChild>
                <a href={`/contracts/new-${Date.now()}`}>View Contract Details</a>
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="border border-border/50 shadow-md">
      <CardContent className="p-6">
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Deploy New Contract</h2>
              <div className="text-sm text-muted-foreground">Step {step} of 3</div>
            </div>

            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 flex rounded-full bg-secondary">
                <div
                  style={{ width: `${(step / 3) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                />
              </div>
              <div className="flex justify-between">
                <div className={cn("flex flex-col items-center", step >= 1 ? "text-primary" : "text-muted-foreground")}>
                  <div
                    className={cn(
                      "rounded-full h-8 w-8 flex items-center justify-center mb-2",
                      step >= 1 ? "bg-primary text-primary-foreground" : "bg-secondary",
                    )}
                  >
                    1
                  </div>
                  <div className="text-xs">Details</div>
                </div>

                <div className={cn("flex flex-col items-center", step >= 2 ? "text-primary" : "text-muted-foreground")}>
                  <div
                    className={cn(
                      "rounded-full h-8 w-8 flex items-center justify-center mb-2",
                      step >= 2 ? "bg-primary text-primary-foreground" : "bg-secondary",
                    )}
                  >
                    2
                  </div>
                  <div className="text-xs">Code</div>
                </div>

                <div className={cn("flex flex-col items-center", step >= 3 ? "text-primary" : "text-muted-foreground")}>
                  <div
                    className={cn(
                      "rounded-full h-8 w-8 flex items-center justify-center mb-2",
                      step >= 3 ? "bg-primary text-primary-foreground" : "bg-secondary",
                    )}
                  >
                    3
                  </div>
                  <div className="text-xs">Storage</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {renderStep()}
      </CardContent>
    </Card>
  )
}

function Database(props: React.SVGProps<SVGSVGElement>) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  )
}

