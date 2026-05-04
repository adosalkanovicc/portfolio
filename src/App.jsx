import { useState, useEffect } from 'react'
import './App.css'
import logo1 from './assets/pickleball.jpg'
import upwork from './assets/upwork.png'
import ca from './assets/ca.png'
import { GitHubCalendar } from 'react-github-calendar'
import { SiHtml5, SiCss, SiJavascript, SiReact, SiBootstrap, SiGo, SiMysql, SiGit, SiGithubactions } from 'react-icons/si'

// ── Icons ─────────────────────────────────────────────────────
const BuildingIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="8" width="48" height="48" rx="2" />
    <line x1="8" y1="24" x2="56" y2="24" />
    <line x1="32" y1="8" x2="32" y2="56" />
    <rect x="20" y="36" width="10" height="20" />
    <rect x="34" y="36" width="10" height="20" />
  </svg>
)

// ── Skills ────────────────────────────────────────────────────
const skills = [
  { label: 'HTML5',      Icon: SiHtml5,         color: '#E34F26' },
  { label: 'CSS3',       Icon: SiCss,           color: '#1572B6' },
  { label: 'JavaScript', Icon: SiJavascript,    color: '#F7DF1E' },
  { label: 'React',      Icon: SiReact,         color: '#61DAFB' },
  { label: 'Bootstrap',  Icon: SiBootstrap,     color: '#7952B3' },
  { label: 'Go',         Icon: SiGo,            color: '#00ADD8' },
  { label: 'MySQL',      Icon: SiMysql,         color: '#4479A1' },
  { label: 'Git',        Icon: SiGit,           color: '#F05032' },
  { label: 'CI/CD',      Icon: SiGithubactions, color: '#2088FF' },
]

// ── Experience data ───────────────────────────────────────────
const experiences = [
  {
    company: 'Pickleball.com',
    duration: 'Feb 2025 — Present',
    role: 'Software Engineer',
    tasks: [
      'Backend Development & Business Logic: Designing and implementing scalable RESTful APIs and core business logic for a high-traffic Pickleball platform using Golang.',
      'Database Optimization & Management: Managing and optimizing MySQL database, including schema design and resolving critical performance issues such as CPU spikes.',
      'Quality Assurance & Testing: Ensuring system reliability by writing Unit tests and performing rigorous manual testing across Development, Staging, and Production environments to maintain high code quality and zero downtime deployments.',
      'Agile Methodology & Collaboration: Actively participating in Agile/Scrum workflows, including daily stand-ups and sprint planning, while collaborating with clients, project managers, and frontend teams to translate business needs into technical solutions.',
      'Data Engineering: Developing scripts for analyzing, cleaning, and migrating large datasets from external sources into the internal relational architecture.',
      'System Monitoring: Utilizing tools like Grafana to monitor system health, identify bottlenecks, and ensure the high availability of the server-side infrastructure.',
      'Documentation: Maintaining comprehensive technical documentation for APIs and system architectures to facilitate team onboarding and long-term maintainability.',
    ],
    logo: logo1,
  },
  {
    company: 'Upwork',
    duration: 'Jun 2021 — Jul 2024',
    role: 'Web Developer | UI/UX Designer | Graphic Designer | Video Editor',
    tasks: [
      'Working with clients worldwide in web development, UI/UX design, and video editing.',
      'Creating modern websites using HTML5, CSS3, JavaScript, and React.',
      'Editing videos using Vegas Pro and Adobe Premiere.',
      'Designing thumbnails for YouTube channels using Adobe Photoshop.',
      'Crafting mockups and UI/UX designs with Figma and Adobe XD.',
    ],
    logo: upwork,
  },
  {
    company: 'Cape Ann Enterprises',
    duration: 'May 2022 — Aug 2022',
    role: 'Software Engineer Intern',
    tasks: [
      'Produced clean, efficient code with supervision from a mentor using Angular 10.',
      'Troubleshooting, debugging and upgrading existing software.',
      'Designed mockups using Figma.',
      'Followed the Agile process, planned sprints and groomed user stories.',
    ],
    logo: ca,
  },
]

// ── Navbar ────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience']
      let current = 'about'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 100) {
          current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLinks = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    // { id: 'projects', label: 'Projects' },
  ]

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <button
            className="navbar-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Admir Salkanović
          </button>

          <ul className="navbar-links">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? 'active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(id) }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}

// ── Experience Card ───────────────────────────────────────────
function ExperienceCard({ company, duration, role, tasks, logo }) {
  return (
    <article className="exp-card">
      <div className="exp-card__header">
        <div className="exp-card__logo">
          {logo ? (
            <img src={logo} alt={company} />
          ) : (
            <BuildingIcon />
          )}
        </div>
        <div className="exp-card__meta">
          <h3 className="exp-card__company">{company}</h3>
          <span className="exp-card__role">{role}</span>
          <span className="exp-card__duration">{duration}</span>
        </div>
      </div>
      <ul className="exp-card__tasks">
        {tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </article>
  )
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />

      <main className="page">
        {/* ── About Me ── */}
        <section id="about" className="about-section">
          <div className="container">
            <p className="section-label">Who I am</p>
            <h2>About Me</h2>
            <p>
              👋 I&apos;m Admir, a Software Engineer specializing in backend development
              with a focus on building scalable and efficient systems. When I’m not programming, I enjoy playing football, working out, playing chess, and spending time with family and friends.
            </p>

            <a href="/cv.pdf" download="CV.pdf" className="btn-cv">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>

            {/* ── Skills ── */}
            <div className="skills-wrapper">
              <p className="section-label" style={{ marginBottom: '1rem' }}>Skills</p>
              <div className="skills-grid">
                {skills.map(({ label, Icon, color }) => (
                  <span key={label} className="skill-tag">
                    <Icon className="skill-tag__icon" style={{ color }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── GitHub Activity ── */}
            <div className="github-calendar-wrapper">
              <p className="section-label" style={{ marginBottom: '1rem' }}>GitHub Activity</p>
              <GitHubCalendar
                username="adosalkanovicc"
                colorScheme="light"
                theme={{
                  light: ['#e8e4de', '#b8d4b8', '#7aaa7a', '#4a8a4a', '#2a6a2a'],
                }}
                blockSize={13}
                blockMargin={4}
                fontSize={12}
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Experience ── */}
        <section id="experience" className="experience-section">
          <div className="container">
            <p className="section-label">Where I&apos;ve worked</p>
            <h2>Experience</h2>
            <div className="exp-list">
              {experiences.map((exp) => (
                <ExperienceCard key={exp.company} {...exp} />
              ))}
            </div>
          </div>
        </section>

        {/*
        ── Projects  ──
        <hr className="divider" />
        <section id="projects" className="projects-section">
          <div className="container">
            <p className="section-label">My work</p>
            <h2>Projects</h2>
          </div>
        </section>
        */}
      </main>
    </>
  )
}
