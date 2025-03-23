"use client"

import { useState } from "react"
import { Star, Shield, Upload, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface ContractTemplate {
  id: string
  name: string
  description: string
  category: string
  stars: number
  audited: boolean
  deployments: number
  author: string
  rating: number
}

export function ContractHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [templates] = useState<ContractTemplate[]>([
    {
      id: "1",
      name: "ERC-20 Token",
      description: "Standard ERC-20 token implementation with burning and minting capabilities.",
      category: "Token",
      stars: 245,
      audited: true,
      deployments: 1234,
      author: "OpenZeppelin",
      rating: 4.8,
    },
    {
      id: "2",
      name: "NFT Marketplace",
      description: "Complete NFT marketplace with bidding, auctions, and royalties.",
      category: "NFT",
      stars: 189,
      audited: true,
      deployments: 856,
      author: "CryptoDevs",
      rating: 4.6,
    },
    {
      id: "3",
      name: "DAO Governance",
      description: "Decentralized governance system with proposal and voting mechanisms.",
      category: "DAO",
      stars: 167,
      audited: true,
      deployments: 432,
      author: "DAOmaster",
      rating: 4.7,
    },
  ])

  const handleDeploy = (templateId: string) => {
    toast.success("Preparing contract for deployment...")
    // Add deployment logic here
  }

  const handleUpload = () => {
    toast.success("Coming soon: Upload your own contract templates!")
    // Add upload logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-black">
      {/* Search and Upload Section */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>
        <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Contract
        </Button>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {["All", "Token", "NFT", "DAO", "DeFi", "Gaming", "Utility"].map((category) => (
            <Button
              key={category}
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="bg-white/5 border-white/10 text-white hover:border-blue-500/50 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{template.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {template.description}
                  </CardDescription>
                </div>
                {template.audited && (
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    <Shield className="h-3 w-3 mr-1" />
                    Audited
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {template.stars}
                </div>
                <div>Deployments: {template.deployments}</div>
                <div>Rating: {template.rating}/5</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-gray-400">By {template.author}</div>
              <Button onClick={() => handleDeploy(template.id)} className="bg-blue-600 hover:bg-blue-700">
                Deploy <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 