import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Search, MapPin, Briefcase, ExternalLink, ArrowUpRight, Users, BookOpenCheck, MessageSquare } from 'lucide-react'

// Color variables (mapped in CSS via CSS variables for easy theming)
// Primary derived roughly from Aerie jobs palette (cool blue)
const BRAND = {
  50: '#f3f7ff',
  100: '#e6efff',
  200: '#cddfff',
  300: '#a3c2ff',
  400: '#6f98ff',
  500: '#3b74ff',
  600: '#225dff',
  700: '#1a49cc',
  800: '#153aa6',
  900: '#112f87',
}

// ---------- Utilities ----------
function useInterval(callback, delay) {
  const savedRef = useRef(callback)
  useEffect(() => { savedRef.current = callback }, [callback])
  useEffect(() => {
    if (delay == null) return
    const id = setInterval(() => savedRef.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const current = ref.current
    if (!current) return
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin })
    observer.observe(current)
    return () => observer.unobserve(current)
  }, [ref, rootMargin])
  return isIntersecting
}

// ---------- Header ----------
function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showCourses, setShowCourses] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 ${scrolled ? 'py-2' : 'py-4'}`} aria-label="Primary">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)] ring-offset-white rounded-md" aria-label="Aerie Academy home">
            <div className="h-9 w-9 rounded-md bg-[var(--aerie-700)] text-white grid place-items-center font-semibold">A</div>
            <span className="font-semibold tracking-tight text-slate-900">Aerie Academy</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            <div className="relative">
              <button className="text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)] rounded-md px-2 py-1" aria-haspopup="true" aria-expanded={showCourses} onMouseEnter={() => setShowCourses(true)} onMouseLeave={() => setShowCourses(false)} onFocus={() => setShowCourses(true)}>
                Courses
              </button>
              <div onMouseEnter={() => setShowCourses(true)} onMouseLeave={() => setShowCourses(false)} className={`${showCourses ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'} absolute left-0 mt-2 w-[560px] bg-white border border-slate-200 shadow-xl rounded-lg p-4 transition-all duration-200`} role="menu">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'GATE Architecture & Planning', desc: 'Live coaching with IIT alumni mentors' },
                    { title: 'BIM & Revit Essentials', desc: 'Practical workflows for studios' },
                    { title: 'Portfolio & Applications', desc: 'Craft offers that stand out' },
                    { title: 'Career Studio', desc: 'Interview prep and job mapping' },
                  ].map((c) => (
                    <a key={c.title} href="#courses" className="rounded-md p-3 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aerie-600)]">
                      <div className="font-medium text-slate-900">{c.title}</div>
                      <p className="text-sm text-slate-600 mt-1">{c.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {['GATE Prep', 'Jobs', 'Community', 'Resources', 'About', 'Contact'].map((label) => (
              <a key={label} href={`#${label.toLowerCase().replace(/ /g, '')}`} className="text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)] rounded-md px-2 py-1">{label}</a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-slate-700 hover:text-slate-900">Sign in</a>
            <a href="#courses" className="inline-flex items-center justify-center rounded-md bg-[var(--aerie-700)] hover:bg-[var(--aerie-800)] text-white px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)]">Start Learning</a>
          </div>

          <button className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aerie-600)]" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            <span className="sr-only">Toggle navigation</span>
            {open ? <span aria-hidden><Pause size={20} /></span> : <span aria-hidden><Play size={20} /></span>}
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
          <div className="py-3 grid gap-2">
            {['Courses','GATE Prep','Jobs','Community','Resources','About','Contact'].map((label) => (
              <a key={label} href={`#${label.toLowerCase().replace(/ /g, '')}`} className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aerie-600)]">{label}</a>
            ))}
            <a href="#courses" className="mt-1 inline-flex items-center justify-center rounded-md bg-[var(--aerie-700)] hover:bg-[var(--aerie-800)] text-white px-4 py-2 font-medium">Start Learning</a>
          </div>
        </div>
      </div>
    </header>
  )
}

// ---------- Hero ----------
function Hero() {
  const images = useMemo(() => [
    'https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531831108325-7fe9616ed4cc?q=80&w=1600&auto=format&fit=crop',
  ], [])
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  useInterval(() => setIndex((i) => (i + 1) % images.length), 3500)

  return (
    <section className="relative bg-white" aria-label="Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-12 pb-10 md:pt-16 md:pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            The One-Stop Platform for Architects to Learn, Grow, and Get Hired.
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Live coaching, expert mentors, structured GATE Architecture & Planning prep, and real career pathways—all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#courses" className="inline-flex items-center gap-2 rounded-md bg-[var(--aerie-700)] hover:bg-[var(--aerie-800)] text-white px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)]">
              Explore Courses <ArrowRight size={18} />
            </a>
            <a href="#community" className="inline-flex items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-900 px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)]">
              Join the Community
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
            {['Live classes by IITians & GATE toppers','Structured mock tests'].map((t) => (
              <span key={t} className="inline-block text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{t}</span>
            ))}
          </div>
        </div>

        <div className="relative h-[300px] sm:h-[380px] md:h-[420px] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          {images.map((src, i) => (
            <motion.img key={src} src={src} alt="Architecture studio and site visuals" loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ willChange: 'opacity, transform' }} initial={{ opacity: 0 }} animate={{ opacity: index === i ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.8, ease: 'easeInOut' }} />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/0" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

// ---------- Proof Strip ----------
function ProofStrip() {
  const ref = useRef(null)
  const onScreen = useOnScreen(ref, '-100px')
  const metrics = [
    { label: 'Practice Questions', value: 2000 },
    { label: 'Regular Mock Exams', value: 30 },
    { label: 'Live + Recorded Sessions', value: 120 },
  ]
  return (
    <section ref={ref} className="bg-slate-50/60 border-y border-slate-200" aria-label="Proof">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-xs tracking-widest text-slate-500 uppercase">{m.label}</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">
                {onScreen ? (
                  <CountUp end={m.value} suffix={m.label.includes('Questions') ? '+' : ''} />
                ) : (
                  0
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, duration = 1200, suffix = '' }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.round(end * p))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration])
  return <span>{val}{suffix}</span>
}

// ---------- Courses ----------
function Courses() {
  const items = [
    {
      title: 'GATE Architecture & Planning 2025',
      outcome: 'Score higher with a structured, mentor-led plan',
      duration: '6 months · Live Cohort',
      chip: 'Live',
      learn: ['Syllabus-first roadmap', 'Weekly mock tests', 'Doubt clearing with IITians'],
      img: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'BIM & Revit Essentials',
      outcome: 'Studio-ready modeling and documentation workflows',
      duration: '4 weeks · Cohort',
      chip: 'Cohort',
      learn: ['Templates & families', 'Sheets & schedules', 'Coordination basics'],
      img: 'https://images.unsplash.com/photo-1516902803597-96408ad2d63c?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'Portfolio & Applications',
      outcome: 'Present projects that win interviews and admits',
      duration: '3 weeks · New',
      chip: 'New',
      learn: ['Narrative & layout', 'Case-study polish', 'ATS-friendly resume'],
      img: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?q=80&w=1600&auto=format&fit=crop',
    },
  ]
  return (
    <section id="courses" className="bg-white" aria-label="Courses overview">
      <div className="mx-auto max-w-[1280px] px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Courses designed for outcomes</h2>
            <p className="text-slate-600 mt-2">Practical skills, structured prep, and job relevance—without breaking the bank.</p>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-2 text-[var(--aerie-700)] hover:text-[var(--aerie-800)] font-medium">View all <ArrowUpRight size={18} /></a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((c) => (
            <a key={c.title} href="#" className="group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aerie-600)] flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={c.img} alt="Course visual" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 text-slate-800 px-3 py-1 text-xs font-medium border border-slate-200">{c.chip}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="text-slate-600 mt-1">{c.outcome}</p>
                <div className="mt-2 text-sm text-slate-700">{c.duration}</div>
                <ul className="mt-4 space-y-1 text-sm text-slate-700 list-disc pl-5">
                  {c.learn.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <div className="mt-5 inline-flex items-center gap-2 text-[var(--aerie-700)] group-hover:underline font-medium">View details <ExternalLink size={16} /></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Jobs Highlight ----------
function JobsHighlight() {
  const jobs = [
    { role: 'Junior Architect', firm: 'Studio Axis', location: 'Bengaluru', tags: ['Full-time', 'Hybrid'] },
    { role: 'Urban Planner Intern', firm: 'CityLab', location: 'Mumbai', tags: ['Internship', 'On-site'] },
    { role: 'BIM Modeler', firm: 'BuildWorks', location: 'Remote', tags: ['Contract', 'Remote'] },
    { role: 'Landscape Designer', firm: 'GreenScape', location: 'Delhi NCR', tags: ['Full-time', 'Hybrid'] },
  ]
  return (
    <section id="jobs" className="bg-slate-50/60 border-y border-slate-200" aria-label="Jobs highlight">
      <div className="mx-auto max-w-[1280px] px-4 py-14 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">More Than Just Coaching: Your Gateway to Top Architecture Jobs.</h2>
          <p className="mt-3 text-slate-600">Curated roles for architects and planners. Get matched through mentors, projects, and hiring partners.</p>
          <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--aerie-700)] hover:bg-[var(--aerie-800)] text-white px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)]">Explore Jobs <Briefcase size={18} /></a>
          <p className="mt-2 text-xs text-slate-500">Curated roles for architects and planners.</p>
        </div>
        <div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            <div className="col-span-2 flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2"><Search size={16} className="text-slate-500" /><input aria-label="Search" className="w-full outline-none placeholder:text-slate-400" placeholder="Search roles, firms..." /></div>
            <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2"><MapPin size={16} className="text-slate-500" /><input aria-label="Location" className="w-full outline-none placeholder:text-slate-400" placeholder="Location" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {jobs.map((j) => (
              <div key={j.role + j.firm} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="font-medium text-slate-900">{j.role}</div>
                <div className="text-sm text-slate-600">{j.firm} · {j.location}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {j.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Community & Mentorship ----------
function CommunityMentorship() {
  const [i, setI] = useState(0)
  const imgs = [
    'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop',
  ]
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  useInterval(() => setI((p) => (p + 1) % imgs.length), paused ? null : 4000)

  const mentors = [
    { name: 'Ananya Rao', role: 'Senior Architect', firm: 'Studio Axis' },
    { name: 'Rahul Singh', role: 'Urban Planner', firm: 'CityLab' },
    { name: 'Meera Iyer', role: 'BIM Lead', firm: 'BuildWorks' },
    { name: 'Kabir Shah', role: 'Landscape Architect', firm: 'GreenScape' },
    { name: 'Neha Gupta', role: 'Academic Mentor', firm: 'IIT Grad' },
    { name: 'Aman Verma', role: 'Design Manager', firm: 'MegaBuild' },
  ]
  const [open, setOpen] = useState(false)

  return (
    <section id="community" className="bg-white" aria-label="Community & Mentorship">
      <div className="mx-auto max-w-[1280px] px-4 py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Join the Community Where Future Architects Launch.</h2>
          <p className="mt-2 text-slate-600">Mentor AMAs, peer study groups, and portfolio reviews that keep you accountable and inspired.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="grid gap-4">
            <Benefit icon={<Users />} title="Mentor AMAs" desc="Weekly live Q&As with industry experts and toppers." />
            <Benefit icon={<MessageSquare />} title="Peer groups" desc="Focused cohorts to study, review, and ship together." />
            <Benefit icon={<BookOpenCheck />} title="Portfolio reviews" desc="Actionable critique to sharpen project narratives." />
            <button onClick={() => setOpen(true)} className="mt-2 inline-flex w-max items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-900 px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aerie-600)]">Meet mentors <ArrowRight size={18} /></button>
          </div>
          <div className="lg:col-span-2 relative">
            <div className="relative h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-slate-200">
              {imgs.map((src, idx) => (
                <motion.img key={src} src={src} alt="Community visuals" loading="lazy" className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: i === idx ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.8 }} />
              ))}
              <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between">
                <div className="flex gap-1">
                  {imgs.map((_, d) => (
                    <button key={d} aria-label={`Go to slide ${d + 1}`} onClick={() => setI(d)} className={`h-1.5 w-6 rounded-full ${i === d ? 'bg-white' : 'bg-white/60'}`} />
                  ))}
                </div>
                <button aria-label={paused ? 'Play' : 'Pause'} onClick={() => setPaused(p => !p)} className="rounded-full bg-black/40 text-white p-1">
                  {paused ? <Play size={16} /> : <Pause size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {open && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <div className="relative w-full max-w-4xl rounded-xl bg-white p-6 shadow-xl focus:outline-none">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">Mentors</h3>
                <button onClick={() => setOpen(false)} className="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50">Close</button>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mentors.map((m) => (
                  <div key={m.name} className="rounded-lg border border-slate-200 p-4">
                    <div className="h-12 w-12 rounded-full bg-[var(--aerie-100)] text-[var(--aerie-800)] grid place-items-center font-semibold mb-3">{m.name.split(' ').map(s=>s[0]).join('')}</div>
                    <div className="font-medium text-slate-900">{m.name}</div>
                    <div className="text-sm text-slate-600">{m.role}</div>
                    <div className="text-sm text-slate-600">{m.firm}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Benefit({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[var(--aerie-700)]" aria-hidden>{icon}</div>
      <div>
        <div className="font-medium text-slate-900">{title}</div>
        <p className="text-slate-600 text-sm">{desc}</p>
      </div>
    </div>
  )
}

// ---------- Outcome Narrative ----------
function OutcomeNarrative() {
  const items = [
    { title: 'Live classes that fit your schedule', bullets: ['Evening/weekend cohorts', 'Concept-first teaching', 'Recorded access included'], img: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Mock exams that build confidence', bullets: ['Regular timed tests', 'Detailed solutions', 'Ranked leaderboards'], img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Structured guidance to admissions and jobs', bullets: ['Portfolio mapping', 'Interview prep', 'Referral network'], img: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1600&auto=format&fit=crop' },
  ]
  return (
    <section className="bg-white" aria-label="Outcomes">
      <div className="mx-auto max-w-[1280px] px-4 py-14 space-y-10">
        {items.map((b, idx) => (
          <div key={b.title} className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className={`order-${idx % 2 === 1 ? '2' : '1'}`}>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">{b.title}</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                {b.bullets.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <a href="#" className="mt-4 inline-flex items-center gap-2 text-[var(--aerie-700)] hover:text-[var(--aerie-800)] font-medium">Learn more <ArrowRight size={18} /></a>
            </div>
            <div className={`order-${idx % 2 === 1 ? '1' : '2'}`}>
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200">
                <img src={b.img} alt="Learning outcomes visuals" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------- Testimonials ----------
function Testimonials() {
  const cards = [
    { name: 'Ritika, AIR 56', quote: 'Mentorship and mocks took me from scattered to systematic. Best decision for GATE.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
    { name: 'Arjun, BIM Modeler', quote: 'Hands-on Revit training made me job-ready. Got an offer within a month.', img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop' },
    { name: 'Nisha, M.Arch Admit', quote: 'Portfolio studio sharpened my narrative. Landed admits and scholarships.', img: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop' },
  ]
  const [idx, setIdx] = useState(0)
  useInterval(() => setIdx((p) => (p + 1) % cards.length), 6000)

  return (
    <section className="bg-slate-50/60 border-y border-slate-200" aria-label="Testimonials">
      <div className="mx-auto max-w-[1280px] px-4 py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">What learners say</h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <article key={c.name} className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-opacity ${i === idx ? 'opacity-100' : 'opacity-80'}`}>
                <div className="flex items-center gap-3">
                  <img src={c.img} alt="Learner portrait" className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  <div className="font-medium text-slate-900">{c.name}</div>
                </div>
                <p className="mt-3 text-slate-700">“{c.quote}”</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <button aria-label="Previous" onClick={() => setIdx((p) => (p - 1 + cards.length) % cards.length)} className="rounded-full border border-slate-300 p-2 hover:bg-white"><ChevronLeft size={18} /></button>
            <button aria-label="Next" onClick={() => setIdx((p) => (p + 1) % cards.length)} className="rounded-full border border-slate-300 p-2 hover:bg-white"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
          <blockquote className="text-lg md:text-xl font-medium text-slate-900">“Aerie is the one-stop platform that bridges GATE prep, community, and real jobs.”</blockquote>
        </div>
      </div>
    </section>
  )
}

// ---------- Resource Highlights ----------
function ResourceHighlights() {
  const items = [
    { title: 'Free Kit', desc: 'Syllabus planner, formula sheets, and past-year papers.', icon: <ArrowDownIcon /> },
    { title: 'FAQs', desc: 'Clear answers on timelines, fees, and exam strategy.', icon: <MessageSquare size={18} /> },
    { title: 'Blog/Guides', desc: 'Mentor-written guides on GATE and careers.', icon: <ArrowRight size={18} /> },
  ]
  return (
    <section id="resources" className="bg-white" aria-label="Resources">
      <div className="mx-auto max-w-[1280px] px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((r) => (
            <a key={r.title} href="#" className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aerie-600)]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 grid place-items-center rounded-md bg-[var(--aerie-50)] text-[var(--aerie-700)] border border-[var(--aerie-100)]">{r.icon}</div>
                <div className="font-semibold text-slate-900">{r.title}</div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{r.desc}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-[var(--aerie-700)] group-hover:underline">Learn more <ArrowRight size={16} /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ---------- Final CTA ----------
function FinalCTA() {
  return (
    <section className="bg-[var(--aerie-50)]" aria-label="Final call to action">
      <div className="mx-auto max-w-[1280px] px-4 py-14">
        <div className="rounded-2xl border border-[var(--aerie-200)] bg-white/70 p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">The One-Stop Platform for Architects to Learn, Grow, and Get Hired.</h2>
          <p className="mt-2 text-slate-600">Start with the course that fits your goals—or discover curated jobs tailored to your strengths.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#courses" className="inline-flex items-center gap-2 rounded-md bg-[var(--aerie-700)] hover:bg-[var(--aerie-800)] text-white px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)]">Explore Courses</a>
            <a href="#jobs" className="inline-flex items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-900 px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aerie-600)]">Explore Jobs</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200" aria-label="Footer">
      <div className="mx-auto max-w-[1280px] px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[var(--aerie-700)] text-white grid place-items-center font-semibold">A</div>
            <div className="font-semibold">Aerie Academy</div>
          </div>
          <p className="mt-3 text-sm text-slate-600">Built for architects and planners.</p>
        </div>
        {[
          { heading: 'Learn', links: ['Courses', 'GATE Prep', 'Workshops'] },
          { heading: 'Community', links: ['Mentors', 'Peer Groups', 'Events'] },
          { heading: 'Company', links: ['About', 'Resources', 'Contact'] },
        ].map((col) => (
          <div key={col.heading}>
            <div className="text-sm font-semibold text-slate-900">{col.heading}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {col.links.map(l => <li key={l}><a href="#" className="hover:text-slate-900">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-[1280px] px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-xs text-slate-500">© {new Date().getFullYear()} Aerie Academy</div>
          <form className="flex items-center gap-2">
            <label htmlFor="nl" className="sr-only">Email</label>
            <input id="nl" type="email" placeholder="Subscribe to newsletter" className="w-56 rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aerie-600)]" />
            <button className="rounded-md bg-[var(--aerie-700)] px-3 py-2 text-sm text-white hover:bg-[var(--aerie-800)]">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  )
}

// ---------- App ----------
export default function App() {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--aerie-50', BRAND[50])
    root.style.setProperty('--aerie-100', BRAND[100])
    root.style.setProperty('--aerie-200', BRAND[200])
    root.style.setProperty('--aerie-300', BRAND[300])
    root.style.setProperty('--aerie-400', BRAND[400])
    root.style.setProperty('--aerie-500', BRAND[500])
    root.style.setProperty('--aerie-600', BRAND[600])
    root.style.setProperty('--aerie-700', BRAND[700])
    root.style.setProperty('--aerie-800', BRAND[800])
    root.style.setProperty('--aerie-900', BRAND[900])
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main id="content" className="[&_*:focus-visible]:outline-none">
        <Hero />
        <ProofStrip />
        <Courses />
        <JobsHighlight />
        <CommunityMentorship />
        <OutcomeNarrative />
        <Testimonials />
        <ResourceHighlights />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
