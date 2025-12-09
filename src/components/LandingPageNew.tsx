import React from "react"
import "./LandingPageNew.css"

export function LandingPageNew({ onGetStarted }: { onGetStarted: () => void }) {
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [showTermsModal, setShowTermsModal] = React.useState(false)

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions to continue.")
      return
    }
    onGetStarted()
  }

  return (
    <div className="landing-root">
      {/* Header */}
      <header className="landing-header">
        <div className="container landing-header-container">
          <div className="landing-logo">
            <div className="landing-logo-icon">⚡</div>
            <span className="landing-logo-text">NextStep</span>
          </div>
          <div className="landing-header-actions">
            <button className="btn-text" onClick={() => setShowTermsModal(true)}>Terms & Conditions</button>
            <button onClick={handleGetStarted} className="btn-lg">Get Started</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        {/* Hero Section */}
        <section className="landing-hero">
          <div className="container landing-hero-content">
            <div className="landing-badge">
              <p className="landing-badge-text">✨ Smart Financial Management</p>
            </div>
            <h1 className="landing-hero-title">
              Take Control of Your <span className="landing-hero-gradient">Financial Future</span>
            </h1>
            <p className="landing-hero-description">
              NextStep is your all-in-one platform for smart budgeting, goal tracking, and financial planning designed specifically for students who want to succeed.
            </p>
            <div className="landing-hero-cta">
              <button onClick={handleGetStarted} className="btn-lg">Start Your Journey →</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="landing-features">
          <div className="container">
            <div className="landing-features-header">
              <h2 className="landing-features-title">Powerful Features</h2>
              <p className="landing-features-subtitle">
                Everything you need to manage your finances, tasks, and time efficiently.
              </p>
            </div>

            <div className="landing-features-grid">
              {[
                { icon: '📈', title: 'Smart Budget Tracker', desc: 'Monitor daily expenses and automatically categorize spending habits with AI-powered insights.' },
                { icon: '⚡', title: 'Goal-Based Savings', desc: 'Set financial goals and track progress visually with customizable milestones.' },
                { icon: '🕐', title: 'Routine Planner', desc: 'Combine financial planning with time management for better daily schedules.' },
                { icon: '📊', title: 'Analytics Dashboard', desc: 'Get insights into monthly trends, overspending areas, and overall budget health.' },
                { icon: '🧠', title: 'AI Recommendations', desc: 'Receive personalized budgeting strategies and lifestyle adjustment suggestions.' },
                { icon: '🔔', title: 'Smart Reminders', desc: 'Automated alerts for upcoming payments and daily task priorities.' },
                { icon: '🔔', title: 'Smart Reminders', desc: 'Automated alerts for upcoming payments and daily task priorities.' },
                { icon: '👥', title: 'Community Tips', desc: 'Share budgeting hacks and productivity routines with other students.' },
              ].map((feature, i) => (
                <div key={i} className="landing-feature-card">
                  <div className="landing-feature-icon-wrapper">{feature.icon}</div>
                  <h3 className="landing-feature-title">{feature.title}</h3>
                  <p className="landing-feature-description">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="landing-cta">
          <div className="container">
            <div className="landing-cta-card">
              <div className="landing-cta-content">
                <h2 className="landing-cta-title">Ready to Transform Your Finances?</h2>
                <p className="landing-cta-description">
                  Join thousands of students who are taking control of their financial future with NextStep.
                </p>
                <button onClick={handleGetStarted} className="btn-lg">Get Started Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className="landing-terms">
          <div className="container">
            <div className="landing-terms-card">
              <div className="landing-terms-excerpt">
                <p>
                  By creating an account or continuing as a guest, you agree to NextStep's Terms &amp; Conditions. Please review the summary below or open the full terms to read all details.
                </p>
              </div>
              <div className="landing-terms-container">
                <input 
                  type="checkbox" 
                  id="termsAcceptCheckbox" 
                  className="landing-terms-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="termsAcceptCheckbox" className="landing-terms-label">
                  I agree to the <a onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>Terms and Conditions</a> and accept all terms and conditions
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container landing-footer-content">
          <p className="landing-footer-text">© 2025 NextStep. All rights reserved.</p>
          <div className="landing-footer-links">
            <a href="#" className="landing-footer-link">Privacy Policy</a>
            <a href="#" className="landing-footer-link">Contact</a>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="modal open">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Terms & Conditions</h2>
              <button className="modal-close" onClick={() => setShowTermsModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing and using NextStep, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <h3>2. Use License</h3>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on NextStep for personal, non-commercial transitory viewing only.</p>
              <h3>3. Disclaimer</h3>
              <p>The materials on NextStep are provided on an 'as is' basis. NextStep makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
              <h3>4. Governing Law</h3>
              <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
