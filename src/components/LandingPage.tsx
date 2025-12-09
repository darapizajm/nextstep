"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { TermsAndConditions } from "./TermsAndConditions"
import { Zap, TrendingUp, Clock, BarChart3, Brain, Bell, Users } from "./icons"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleGetStarted = () => {
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions to continue.")
      return
    }
    onGetStarted()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">NextStep</span>
          </div>
          <div className="flex items-center gap-4">
            <TermsAndConditions />
            <Button onClick={handleGetStarted} disabled={!termsAccepted} size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-28 relative">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block">
            <div className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">✨ Smart Financial Management</p>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
            Take Control of Your{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            NextStep is your all-in-one platform for smart budgeting, goal tracking, and financial planning designed
            specifically for students who want to succeed.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" onClick={handleGetStarted} disabled={!termsAccepted}>
              Start Your Journey →
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage your finances, tasks, and time efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            title="Smart Budget Tracker"
            description="Monitor daily expenses and automatically categorize spending habits with AI-powered insights."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-primary" />}
            title="Goal-Based Savings"
            description="Set financial goals and track progress visually with customizable milestones."
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="Routine Planner"
            description="Combine financial planning with time management for better daily schedules."
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-primary" />}
            title="Analytics Dashboard"
            description="Get insights into monthly trends, overspending areas, and overall budget health."
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6 text-primary" />}
            title="AI Recommendations"
            description="Receive personalized budgeting strategies and lifestyle adjustment suggestions."
          />
          <FeatureCard
            icon={<Bell className="h-6 w-6 text-primary" />}
            title="Smart Reminders"
            description="Automated alerts for upcoming payments and daily task priorities."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-primary" />}
            title="Community Tips"
            description="Share budgeting hacks and productivity routines with other students."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-12 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/10 rounded-2xl">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Finances?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of students who are taking control of their financial future with NextStep.
            </p>
            <Button size="lg" onClick={handleGetStarted} disabled={!termsAccepted}>
              Get Started Now
            </Button>
          </div>
        </Card>
      </section>

      {/* Terms Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="p-6 border-primary/10 bg-card">
          <div className="flex items-start gap-4">
            <Checkbox
              id="terms-accept"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-1 flex-shrink-0"
            />
            <Label htmlFor="terms-accept" className="text-sm text-foreground cursor-pointer">
              I agree to the <TermsAndConditions /> and accept all terms and conditions
            </Label>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">© 2025 NextStep. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 bg-card">
      <div className="mb-4 p-2.5 bg-primary/10 rounded-lg w-fit">{icon}</div>
      <h3 className="font-semibold mb-2 text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  )
}
