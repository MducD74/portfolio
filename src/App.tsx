import {useEffect, useMemo, useState} from 'react'

type Project = {
  title: string;
  role: string;
  description: string;
  image: string;
  tags: string[];
  live?: string;
  detail: string
}

const skills = [
  ['Backend', ['Node.js', 'JavaScript', 'Express.js', 'Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', '.NET', 'ASP.NET MVC']],
  ['Frontend', ['React.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap']],
  ['Database', ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server']],
  ['Cache / Architecture', ['Redis', 'Microservices', 'REST APIs']],
  ['DevOps / Infra', ['Git', 'Linux Server Management', 'Azure Portal', 'Azure Blob']],
  ['Mobile', ['Flutter', 'React Native']],
]

const projects: Project[] = [
  {
    title: 'MMP Platform',
    role: 'Fullstack Developer',
    description: 'White-label multi-channel messaging platform for Telcos and Aggregators.',
    image: '/peacom.png',
    tags: ['Node.js', 'React', 'MySQL', 'Redis'],
    live: 'https://peacom.co',
    detail: 'A messaging ecosystem connecting Zalo, Facebook Messenger, WhatsApp, Viber and Telegram through reliable REST APIs, Node.js services, MySQL and Redis.'
  },
  {
    title: 'Coco Studio',
    role: 'Fullstack Developer',
    description: 'AI platform that generates videos and images through Byteplus integration.',
    image: '/coco.png',
    tags: ['Node.js', 'React', 'Redis', 'MySQL'],
    live: 'https://cocostudio.io',
    detail: 'Full-stack AI media product integrating Byteplus APIs for video and image generation, with a focus on performance and smooth workflows.'
  },
  {
    title: 'FAITH-CONNECT',
    role: 'Intern Fullstack Developer',
    description: 'Church management platform on web and mobile.',
    image: '/faith.png',
    tags: ['ASP.NET MVC', 'PostgreSQL', 'Flutter'],
    live: 'https://faithconnect.my',
    detail: 'A responsive web and Flutter mobile platform for managing church communities, posts, events and certificates.'
  },
]

const roles = ['Backend Engineer', 'Full-Stack Builder', 'Systems Thinker']
const marquee = ['Node.js', 'React', 'MySQL', 'Redis', 'PostgreSQL', 'MongoDB', 'Spring Boot', 'ASP.NET', 'Flutter', 'Azure', 'Tailwind', 'Linux']

function Icon({children}: { children: string }) {
  return <span className="icon" aria-hidden="true">{children}</span>
}

function Tag({children}: { children: string }) {
  return <span className="tag">{children}</span>
}

function Reveal({children, delay = 0, className = ''}: {
  children: React.ReactNode;
  delay?: number;
  className?: string
}) {
  return <div className={`reveal ${className}`} style={{'--delay': delay} as React.CSSProperties}>{children}</div>
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [language, setLanguage] = useState<'EN' | 'VI'>('EN')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeRole, setActiveRole] = useState(0)
  const [modal, setModal] = useState<Project | null>(null)
  // const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  useEffect(() => {
    const timer = window.setInterval(() => setActiveRole((r) => (r + 1) % roles.length), 2200)
    const onScroll = () => setProgress((window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100)
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll()
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch { /* clipboard may be unavailable */
    }
    setCopied(value);
    window.setTimeout(() => setCopied(''), 1500)
  }
  const dictionary = useMemo(() => language === 'VI' ? {
    about: 'Giới thiệu',
    skills: 'Kỹ năng',
    experience: 'Kinh nghiệm',
    projects: 'Dự án',
    contact: 'Liên hệ'
  } : {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact'
  }, [language])
  // const submit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setSent(true)
  // }

  return <div className="app">
    <div className="progress" style={{width: `${progress}%`}}/>
    <div className="grain"/>
    <nav aria-label="Main navigation"><a className="brand"
                                         href="#hero">MD</a>{[['about', dictionary.about], ['skills', dictionary.skills], ['experience', dictionary.experience], ['projects', dictionary.projects], ['contact', dictionary.contact]].map(([id, label]) =>
      <a className="nav-link" href={`#${id}`} key={id}>{label}</a>)}
      <button className="hidden" onClick={() => setLanguage(language === 'EN' ? 'VI' : 'EN')}
              aria-label="Switch language">{language === 'EN' ? 'VI' : 'EN'}</button>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme">{theme === 'dark' ? '☼' : '☾'}</button>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>☰</button>
    </nav>
    <aside
      className={menuOpen ? 'drawer open' : 'drawer'}>{[['about', dictionary.about], ['skills', dictionary.skills], ['experience', dictionary.experience], ['projects', dictionary.projects], ['contact', dictionary.contact]].map(([id, label]) =>
      <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}>{label}</a>)}</aside>

    <main>
      <section id="hero" className="hero">
        <div className="blob one"/>
        <div className="blob two"/>
        <div className="chips"><span>Node.js</span><span>React</span><span>Redis</span><span>MySQL</span></div>
        <div className="wrap"><p className="eyebrow">Full-Stack Software Engineer</p><h2>Hi, I&apos;m <span
          className="gradient">Tran Dang Minh Duc</span> <br></br> I build full-stack products.</h2><p
          className="role">&gt; <b>{roles[activeRole]}</b><i/></p>
          <div className="button-row">
            <a className="button primary" href="#projects">View Projects</a>
            <a className="button" href="#contact">Contact Me</a>
            <a className="button" href="https://www.facebook.com/duc07042004" target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a>
            <a className="button" href="https://zalo.me/0898759423" target="_blank" rel="noreferrer" aria-label="Zalo">Zalo</a>
          </div>
        </div>
        <div className="scroll-indicator"/>
      </section>
      <section id="about">
        <div className="wrap"><Reveal><p className="eyebrow">{dictionary.about}</p><h2>Backend depth, frontend
          taste.</h2></Reveal>
          <div className="bento"><Reveal className="card span-8">
            <p className="lead">
            Full-Stack Web Developer with 1 year of experience building applications using ReactJS, Node.js, Java (Spring Boot), and C# (.NET). Proficient in using MySQL and Redis, with practical expertise in integrating complex core functionalities, including payment gateways and AI services.
            </p></Reveal><Reveal
            delay={1} className="card span-4"><h3>Education</h3><p><strong>Danang University of Science and Technology
            (DUT)</strong></p><p className="muted">Information Technology · GPA 7.4/10</p>
          </Reveal>{[['1+', 'year of experience'], ['3+', 'projects']].map(([num, label], i) => <Reveal delay={i}
                                                                                                        className="card span-6"
                                                                                                        key={label}>
            <div className="stat gradient">{num}</div>
            <p className="muted">{label}</p></Reveal>)}</div>
        </div>
      </section>
      <section id="skills">
        <div className="wrap"><Reveal><p className="eyebrow">{dictionary.skills}</p><h2>The toolbox.</h2></Reveal>
          <div className="bento">{skills.map(([name, tags], i) => <Reveal delay={i % 3}
                                                                          className={`card ${i === 0 ? 'span-8' : 'span-4'}`}
                                                                          key={name as string}><h3>
            <Icon>⌘</Icon>{name as string}</h3>
            <div className="tags">{(tags as string[]).map((x) => <Tag key={x}>{x}</Tag>)}</div>
          </Reveal>)}</div>
          <div className="marquee">{[...marquee, ...marquee].map((x, i) => <span key={`${x}-${i}`}>{x}</span>)}</div>
        </div>
      </section>
      <section id="experience">
        <div className="wrap"><Reveal><p className="eyebrow">{dictionary.experience}</p><h2>Where I&apos;ve
          shipped.</h2></Reveal>
          <div className="timeline">
            <article><span className="meta">09/2025 – 07/2026</span><h3>Peacom Global</h3><p className="muted">Fresher
              Fullstack Developer · Team of 10</p>
              <details open>
                <summary>MMP — Multi-channel Messaging Platform</summary>
                <ul>
                  <li>Developed full-stack features and REST APIs with Node.js and React.js</li>
                  <li>Designed microservices with MySQL and Redis</li>
                  <li>Integrated Zalo, Facebook Messenger, WhatsApp, Viber and Telegram</li>
                  <li>Worked in a 10-person cross-functional team to optimize performance</li>
                </ul>
              </details>
            </article>
            <article>
              <details open>
                <summary>Coco Studio — AI integration from Byteplus to generate videos and images</summary>
                <ul>
                  <li>Acted as a full-stack developer, integrating Byteplus APIs into the Coco Studio platform</li>
                  <li>Utilized Node.js, React.js, Redis, and MySQL to build and optimize system performance</li>
                </ul>
              </details>
            </article>
            <article><span className="meta">06/2025 – 09/2025</span><h3>SAPOTA CORP</h3><p className="muted">Intern
              Fullstack Developer · Team of 2</p>
              <details open>
                <summary>FAITH-CONNECT — Church management platform with web and mobile applications for managing members, posts, events, certificates, and daily operations</summary>
                <ul>
                  <li>Built backend services and APIs with ASP.NET MVC</li>
                  <li>Managed data with PostgreSQL</li>
                  <li>Delivered responsive web UI and Flutter mobile app</li>
                </ul>
              </details>
            </article>
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="wrap"><Reveal><p className="eyebrow">{dictionary.projects}</p><h2>Selected work.</h2></Reveal>
          <div className="bento">{projects.map((project, i) => <Reveal delay={i} className="card project span-4"
                                                                       key={project.title}>
            <img className="mock" src={project.image} alt={project.title} />
            <h3>{project.title}</h3><p className="role2">{project.role}</p><p
            className="muted">{project.description}</p>
            <div className="tags">{project.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>
            {project.live ?
              <div className="tags"><a className="button small" href={project.live} target="_blank" rel="noreferrer">Live ↗</a></div> :
              <button className="button small" onClick={() => setModal(project)}>Details</button>}</Reveal>)}</div>
        </div>
      </section>
      {/*<section id="activity">*/}
      {/*  <div className="wrap"><Reveal><p className="eyebrow">GitHub</p><h2>Open source activity.</h2></Reveal>*/}
      {/*    <div className="card activity"><span className="muted">Decorative contribution graph</span><a*/}
      {/*      className="button small" href="https://github.com/MducD74" target="_blank"*/}
      {/*      rel="noreferrer">github.com/MducD74</a>*/}
      {/*      <div className="github-grid">{Array.from({length: 182}, (_, i) => <i key={i}*/}
      {/*                                                                           style={{opacity: .12 + ((i * 37) % 88) / 100}}/>)}</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <section id="contact">
        <div className="wrap"><Reveal><p className="eyebrow">{dictionary.contact}</p><h2 className="big">Let&apos;s
          build something <span className="gradient">great</span> together.</h2></Reveal>
          <div className="bento">
            {/*<div className="card span-6">{sent ?*/}
            {/*  <div className="success"><span>✓</span><h3>Message sent. Thank you!</h3></div> :*/}
            {/*  <form onSubmit={submit}><label>Name<input required name="name"/></label><label>Email<input required*/}
            {/*                                                                                             type="email"*/}
            {/*                                                                                             name="email"/></label><label>Message<textarea*/}
            {/*    required minLength={5} name="message" rows={5}/></label>*/}
            {/*    <button className="button primary" type="submit">Send message</button>*/}
            {/*  </form>}</div>*/}
            <div
              className="card span-12">{['minhduc07042004@gmail.com', '0898 759 423', 'github.com/MducD74'].map((value) =>
              <button className="copy" key={value}
                      onClick={() => copy(value)}>{value}<small>{copied === value ? 'COPIED' : 'COPY'}</small>
              </button>)}</div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <div className="wrap"><span>Designed &amp; built by Tran Dang Minh Duc</span><a className="button small"
                                                                                      href="#hero">Back to top</a></div>
    </footer>
    {modal && <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}>
        <dialog open onClick={(e) => e.stopPropagation()}><h3>{modal.title}</h3><p className="muted">{modal.detail}</p>
            <div className="tags">{modal.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>
            <button className="button" onClick={() => setModal(null)}>Close</button>
        </dialog>
    </div>}
  </div>
}
