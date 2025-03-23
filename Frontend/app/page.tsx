"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AuthModal } from "@/components/auth-modal"
import { CompilationDiagram } from "@/components/compilation-diagram"
import { ContractManagementDiagram } from "@/components/contract-management-diagram"

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <div className="min-h-screen bg-[#2B2B2B]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#1186B1] bg-opacity-95 backdrop-blur-sm border-b border-[#91E4F2]/10">
        <Link href="/" className="text-2xl font-bold text-white">
          Archiva
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#home" className="text-white hover:text-[#91E4F2] transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-white hover:text-[#91E4F2] transition-colors">
            Features
          </Link>
          <Link href="#team" className="text-white hover:text-[#91E4F2] transition-colors">
            Team
          </Link>
          <Link href="#contact" className="text-white hover:text-[#91E4F2] transition-colors">
            Contact
          </Link>
          <Link 
            href="/signup" 
            className="bg-[#D55455] text-white hover:bg-[#D55455]/90 transition-colors px-4 py-2 rounded-md"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-[#1186B1] to-[#522C94] text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-bold mb-12">
            Archive Smart<br />Contracts in Seconds
          </h1>
          <div className="max-w-6xl mx-auto">
            <Image
              src="/pic1.png"
              alt="Dashboard Preview"
              width={1200}
              height={800}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#2B2B2B] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <CompilationDiagram />
            </div>
            <div>
              <h2 className="text-5xl font-bold mb-6 text-[#91E4F2]">Compile<br />Instantly</h2>
              <p className="text-[#A09F9F] text-lg">
                Rapidly compile Solidity smart contracts integrated with a clean,
                intuitive interface. Save everything now!
              </p>
              <p className="text-[#A09F9F] text-lg mt-4">
                Explore Archiva's advanced features, including real-time monitoring,
                smart contract integration, for unparalleled contract management and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manage Contracts Section */}
      <section className="py-20 bg-gradient-to-br from-[#2B2B2B] to-[#522C94]/20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-[#91E4F2]">Manage<br />Contracts</h2>
              <p className="text-[#A09F9F] text-lg">
                Archiva offers comprehensive contract management tools with real-time analytics,
                secure storage solutions, and intuitive features of Web3 development.
              </p>
            </div>
            <div>
              <ContractManagementDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Revolutionize Section */}
      <section className="py-20 bg-gradient-to-br from-[#1186B1] to-[#522C94] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">
            Ready to revolutionize your<br />smart contracts?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#2B2B2B] rounded-2xl p-6 shadow-2xl border border-[#91E4F2]/10">
              <Image
                src="/pic4.png"
                alt="Dashboard Alternative View"
                width={1000}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
<section id="team" className="py-20 bg-[#2B2B2B] text-white text-center">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold mb-4 text-[#91E4F2]">Our Team</h2>
    <p className="text-[#A09F9F] mb-12 max-w-2xl mx-auto">
      Meet the Archiva team: blockchain experts dedicated to revolutionizing smart
      contract deployment and management.
    </p>
    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div className="group">
        <div className="overflow-hidden rounded-lg mb-4  transition-all duration-300 ">
          <Image
            src="/JayashreDP.JPG"
            alt="Team Member"
            width={300}
            height={400}
            className="rounded-lg transition-transform duration-300 group-hover:scale-105 w-64 h-64 object-cover"
          />
        </div>
        <h3 className="text-xl font-bold">Jayashre</h3>
        <p className="text-[#A09F9F]">Blockchain Developer</p>
      </div>
      <div className="group">
        <div className="overflow-hidden rounded-lg mb-4  transition-all duration-300 ">
          <Image
            src="/nidhi.jpg"
            alt="Team Member"
            width={300}
            height={400}
            className="rounded-lg transition-transform duration-300 group-hover:scale-105 w-64 h-64 object-cover"
          />
        </div>
        <h3 className="text-xl font-bold">Nidhi G</h3>
        <p className="text-[#A09F9F]">UI Developer</p>
      </div>
      <div className="group">
        <div className="overflow-hidden rounded-lg mb-4  transition-all duration-300 ">
          <Image
            src="/roahith.jpeg"
            alt="Team Member"
            width={300}
            height={400}
            className="rounded-lg transition-transform duration-300 group-hover:scale-105 w-64 h-64 object-cover"
          />
        </div>
        <h3 className="text-xl font-bold">Roahith R</h3>
        <p className="text-[#A09F9F]">Backend Engineer</p>
      </div>
    </div>
  </div>
</section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-[#2B2B2B] to-[#522C94]/20 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-[#91E4F2]">Simple, Transparent Pricing</h2>
          <p className="text-[#A09F9F] mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your smart contract needs. All plans include our core features with additional benefits as you scale.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="p-8 rounded-2xl bg-[#2B2B2B] border border-[#91E4F2]/10 hover:border-[#91E4F2]/30 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-6">
                <span className="text-[#91E4F2]">$0</span>
                <span className="text-[#A09F9F] text-lg">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Up to 10 contracts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Basic security checks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Community support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Standard templates</span>
                </li>
              </ul>
              <Button className="w-full bg-[#D55455] hover:bg-[#D55455]/90">
                Get Started
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1186B1] to-[#522C94] border border-[#91E4F2]/30 hover:border-[#91E4F2]/50 transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#D55455] text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">
                <span className="text-white">$49</span>
                <span className="text-white/70 text-lg">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  <span>Unlimited contracts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  <span>Advanced security checks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  <span>Premium templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  <span>Custom branding</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-[#1186B1] hover:bg-white/90">
                Upgrade to Pro
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl bg-[#2B2B2B] border border-[#91E4F2]/10 hover:border-[#91E4F2]/30 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">
                <span className="text-[#91E4F2]">Custom</span>
                <span className="text-[#A09F9F] text-lg">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#91E4F2]">✓</span>
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <Button className="w-full bg-[#D55455] hover:bg-[#D55455]/90">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#2B2B2B] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-12">
            <div className="bg-[#2B2B2B] p-6 rounded-2xl border border-[#91E4F2]/10">
              <Image
                src="/snuc.png"
                alt="Location Map"
                width={900}
                height={1000}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8 text-[#91E4F2]">Get In Touch</h2>
              <p className="text-[#A09F9F] mb-8">Reach out for project collaborations!</p>
              <form className="space-y-6">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="bg-[#2B2B2B] border-[#91E4F2]/10 focus:border-[#91E4F2]/30 transition-colors"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-[#2B2B2B] border-[#91E4F2]/10 focus:border-[#91E4F2]/30 transition-colors"
                />
                <Textarea
                  placeholder="Message"
                  className="bg-[#2B2B2B] border-[#91E4F2]/10 focus:border-[#91E4F2]/30 min-h-[120px] transition-colors"
                />
                <Button className="w-full bg-[#1186B1] hover:bg-[#1186B1]/90 transition-colors">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1186B1] to-[#522C94] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-12">
            Let's Do Something<br />Great Together!
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#2B2B2B] text-white border-t border-[#91E4F2]/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#91E4F2]">Archiva</div>
            <div className="flex items-center gap-6">
              <Link href="#home" className="text-[#A09F9F] hover:text-[#91E4F2] transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-[#A09F9F] hover:text-[#91E4F2] transition-colors">
                About
              </Link>
              <Link href="#features" className="text-[#A09F9F] hover:text-[#91E4F2] transition-colors">
                Features
              </Link>
              <Link href="#contact" className="text-[#A09F9F] hover:text-[#91E4F2] transition-colors">
                Contact
              </Link>
            </div>
            <div className="text-sm text-[#A09F9F]">
              © {new Date().getFullYear()} Archiva. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

