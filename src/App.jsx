import { useState, useEffect, useRef } from 'react'
import { Button, GlassCard, GradientText, Rotator, StatCounter } from 'performative-ui'
import 'performative-ui/styles.css'
import './App.css'
import data from './data'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!els.length) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = ['about', 'skills', 'experience', 'projects', 'contact']
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id)
      })
    }, { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' })
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function TermCmd({ cmd, delay = 0 }) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setShow(true), delay * 1000)
        obs.unobserve(el)
      }
    }, { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`term-cmd${show ? ' typed' : ''}`}>
      <span className="prompt">$</span> cat {cmd}
    </div>
  )
}

function CursorLine() {
  return (
    <div className="term-cursor-line">
      <span className="prompt">$</span> <span className="terminal-cursor" />
    </div>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return visible ? (
    <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
      ↑
    </button>
  ) : null
}

function Nav({ activeSection, menuOpen, setMenuOpen }) {
  const links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]
  return (
    <nav className="nav">
      <div className="nav-inner">
        <span className="nav-brand">Omkar Murkute</span>
        <div className="nav-actions">
          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            {links.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link${activeSection === link.id ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  useScrollReveal()

  const [adminOpen, setAdminOpen] = useState(false)
  const [adminStep, setAdminStep] = useState('prompt')
  const [adminKey, setAdminKey] = useState('')
  const [adminData, setAdminData] = useState([])
  const [adminError, setAdminError] = useState('')

  useEffect(() => {
    fetch('/.netlify/functions/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: window.location.pathname }),
    }).catch(() => {})
  }, [])

  async function handleAdminSubmit(e) {
    e.preventDefault()
    setAdminStep('loading')
    setAdminError('')
    try {
      const res = await fetch(`/.netlify/functions/get-visitors?key=${encodeURIComponent(adminKey)}`)
      if (!res.ok) { setAdminStep('prompt'); setAdminError('Wrong key'); return }
      const data = await res.json()
      setAdminData(data)
      setAdminStep('data')
    } catch {
      setAdminStep('prompt')
      setAdminError('Failed to load')
    }
  }

  const { hero, about, skills, experience, projects, education, certifications, contact, stats } = data

  return (
    <div className="app">
      <Nav activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ScrollToTop />

      <section className="hero-section" id="hero">
        <div className="terminal-grid-bg" />
        <div className="hero-content" data-reveal>
          <div className="terminal-hero-card">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">omkar@devops:~/portfolio</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-left">
                <img src="/profile-pic.png" alt="Omkar Murkute" className="hero-pic" />
                <p className="hero-badge">$ whoami</p>
                <GradientText as="h1" className="hero-name">{hero.name}</GradientText>
                <p className="hero-title">
                  <Rotator words={["Linux", "AWS", "Azure", "Docker", "Kubernetes", "CI/CD"]} hideCursor />{" "}
                  • Infrastructure • Automation
                </p>
                <p className="hero-tagline">{hero.tagline}</p>
                <div className="hero-actions">
                  <Button as="a" href={`mailto:${hero.email}`} variant="glow" size="lg" sparkle>Hire Me</Button>
                  <Button as="a" href={hero.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">LinkedIn</Button>
                </div>
              </div>
              <div className="terminal-right" aria-label="DevOps terminal summary">
                <p><span className="prompt">$</span> uptime --portfolio</p>
                <p className="terminal-output terminal-line">7+ production environments monitored</p>
                <p><span className="prompt">$</span> deploy --pipeline github-actions</p>
                <p className="terminal-output terminal-line">release cycle reduced by 96%</p>
                <p><span className="prompt">$</span> incident --mttr</p>
                <p className="terminal-output success terminal-line">MTTR reduced by 85%+</p>
                <p><span className="prompt">$</span> ssl --status</p>
                <p className="terminal-output success terminal-line">zero expiry incidents</p>
                <p className="prompt" style={{ marginTop: 8 }}>$ <span className="terminal-cursor" /></p>
              </div>
            </div>
          </div>
          <div className="hero-stats" data-reveal>
            {stats.map((s) => (
              <div className="stat-item" key={s.label}>
                <StatCounter target={s.target} format={s.format ? v => v + s.format : undefined} />
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-about" id="about" data-reveal>
        <div className="section-container">
          <TermCmd cmd="about.md" />
          <GradientText as="h2" className="section-title">About</GradientText>
          <div className="about-content">
            {about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section section-skills" id="skills">
        <div className="section-container">
          <TermCmd cmd="skills.json" delay={0.1} />
          <GradientText as="h2" className="section-title" data-reveal>Skills</GradientText>
          <div className="skills-grid">
            {skills.map((g, i) => (
              <div key={g.category} data-reveal style={{ transitionDelay: `${i * 0.06}s` }}>
                <GlassCard glowOnHover>
                  <GlassCard.Title>{g.category}</GlassCard.Title>
                  <GlassCard.Body>
                    <div className="skill-tags">
                      {g.items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}
                    </div>
                  </GlassCard.Body>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-experience" id="experience">
        <div className="section-container">
          <TermCmd cmd="experience.log" delay={0.2} />
          <GradientText as="h2" className="section-title" data-reveal>Experience</GradientText>
          <div className="timeline">
            {experience.map((job, i) => (
              <div className="timeline-item" key={job.role + job.company} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <p className="timeline-period">{job.period}</p>
                  <h3>{job.role}</h3>
                  <p className="timeline-company">{job.company}</p>
                  <ul>
                    {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-projects" id="projects">
        <div className="section-container">
          <TermCmd cmd="projects/" delay={0.3} />
          <GradientText as="h2" className="section-title" data-reveal>Projects</GradientText>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={p.name} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                <GlassCard glowOnHover>
                  <GlassCard.Title>{p.name}</GlassCard.Title>
                  <GlassCard.Body>
                    {p.desc}
                    <div className="project-tags">
                      {p.tags.map((t) => <span className="project-tag" key={t}>{t}</span>)}
                    </div>
                  </GlassCard.Body>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-education" id="education">
        <div className="section-container">
          <TermCmd cmd="education.md" delay={0.4} />
          <GradientText as="h2" className="section-title" data-reveal>Education</GradientText>
          <div className="info-grid">
            {education.map((item, i) => (
              <div key={item.title} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                <GlassCard>
                  <GlassCard.Title>{item.title}</GlassCard.Title>
                  <GlassCard.Body>{item.desc}</GlassCard.Body>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {certifications && certifications.length > 0 && (
        <section className="section section-certifications" id="certifications">
          <div className="section-container">
            <TermCmd cmd="certifications.asc" delay={0.5} />
            <GradientText as="h2" className="section-title" data-reveal>Certifications</GradientText>
            <div className="cert-list" data-reveal>
              {certifications.map((c, i) => (
                <div className="cert-item" key={c} data-reveal style={{ transitionDelay: `${i * 0.05}s` }}>
                  <span className="cert-bullet">&#9656;</span> {c}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-contact" id="contact">
        <div className="section-container">
          <TermCmd cmd="contact.ini" delay={0.6} />
          <GradientText as="h2" className="section-title" data-reveal>Contact</GradientText>
          <div className="contact-content" data-reveal>
            <p className="contact-intro">Let's work together on your next infrastructure project.</p>
            <div className="contact-grid">
              {contact.map((item) => (
                <GlassCard key={item.title} glowOnHover>
                  <GlassCard.Title>{item.title}</GlassCard.Title>
                  <GlassCard.Body>
                    {item.link ? <a href={item.link} className="contact-link">{item.value}</a> : item.value}
                  </GlassCard.Body>
                </GlassCard>
              ))}
            </div>
            <div className="contact-cta">
              <Button as="a" href={`mailto:${hero.email}?subject=Let's%20work%20together`} variant="glow" size="lg" sparkle>
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CursorLine />

      <footer className="footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} {hero.name}. Built with React.</p>
          <div className="footer-links">
            <a href={hero.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="admin-badge" onClick={() => { setAdminOpen(true); setAdminStep('prompt'); setAdminKey(''); setAdminError('') }} title="Visitor log">admin ●</span>
          </div>
        </div>
      </footer>

      {adminOpen && (
        <div className="admin-overlay" onClick={() => setAdminOpen(false)}>
          <div className="admin-panel" onClick={e => e.stopPropagation()}>
            <button className="admin-close" onClick={() => setAdminOpen(false)}>×</button>
            {adminStep === 'prompt' && (
              <div className="admin-prompt">
                <h2>Visitor Log</h2>
                <p className="admin-hint">Enter admin key to view visitor data</p>
                <form onSubmit={handleAdminSubmit}>
                  <input type="password" className="admin-input" value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="Admin key" autoFocus />
                  {adminError && <p className="admin-error">{adminError}</p>}
                  <button type="submit" className="admin-unlock">Unlock</button>
                </form>
              </div>
            )}
            {adminStep === 'loading' && <p className="admin-loading">Loading visitor data...</p>}
            {adminStep === 'data' && (
              <div className="admin-data">
                <h2>Visitor Log ({adminData.length})</h2>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>IP</th>
                        <th>Location</th>
                        <th>Browser</th>
                        <th>Page</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.map((v, i) => (
                        <tr key={i}>
                          <td className="admin-cell-ip">{v.ip}</td>
                          <td>{[v.city, v.region, v.country].filter(Boolean).join(', ') || '—'}</td>
                          <td className="admin-cell-ua">{v.userAgent}</td>
                          <td>{v.url}</td>
                          <td>{new Date(v.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
