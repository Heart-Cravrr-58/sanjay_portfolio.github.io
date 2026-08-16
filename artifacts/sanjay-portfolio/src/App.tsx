import { useEffect, useMemo, useRef, useState } from 'react';
import { Mail, Linkedin, ArrowUpRight, ChevronDown, Cpu, Gauge, Radio, Sun, Moon, Menu, X, Terminal, Activity, MapPin, CalendarDays, ExternalLink, Signal, Layers3, Zap } from 'lucide-react';

type Theme = 'light' | 'dark';

type Project = {
  number: string;
  title: string;
  period: string;
  category: string;
  description: string;
  stack: string[];
  metric: string;
  accent: string;
};

const projects: Project[] = [
  {
    number: '01',
    title: 'Ambient lighting effect using 555 timer',
    period: 'JUL — NOV 2024',
    category: 'SIGNAL / PROTOTYPE',
    description: 'A calling bell circuit that turns an ordinary alert into a visible SOS rhythm through 555 timer timing and light control.',
    stack: ['555 TIMER', 'ANALOG', 'LED LOGIC'],
    metric: 'SOS light blinking',
    accent: 'from-lime-300/30 to-transparent',
  },
  {
    number: '02',
    title: 'Six-Channel Transmitter for Drone Remote Control',
    period: 'JAN — MAY 2025',
    category: 'WIRELESS / UAV',
    description: 'Arduino Nano and NRF24L01 pair for six-channel remote control, engineered around the 2.4 GHz ISM band.',
    stack: ['ARDUINO NANO', 'NRF24L01', '2.4 GHZ ISM'],
    metric: '1 km range',
    accent: 'from-orange-300/35 to-transparent',
  },
  {
    number: '03',
    title: 'Highway assist based on image text-to-speech conversion',
    period: 'JUL — NOV 2025',
    category: 'VISION / ASSIST',
    description: 'A Matlab pipeline that reads highway imagery, extracts sign information and turns it into spoken guidance.',
    stack: ['MATLAB', 'IMAGE TEXT', 'TTS'],
    metric: 'under 2 seconds',
    accent: 'from-cyan-300/35 to-transparent',
  },
  {
    number: '04',
    title: 'ECU simulation and diagnostic monitoring system using Docker',
    period: 'JAN — MAY 2026',
    category: 'ECU / SIMULATION',
    description: 'Containerized engine temperature and speed monitoring with speed-based LED intensity, bringing diagnostic thinking into a repeatable sandbox.',
    stack: ['DOCKER', 'ECU LOGIC', 'MONITORING'],
    metric: 'containerized test rig',
    accent: 'from-violet-300/35 to-transparent',
  },
  {
    number: '05',
    title: 'ECU-based smart anti-glare headlight controller for retrofitting',
    period: 'JUL 2026 — PRESENT',
    category: 'AUTOMOTIVE / ACTIVE',
    description: 'A retrofit-ready controller with City and Highway modes for direct aftermarket kit control — designed to be plug-and-play.',
    stack: ['ECU', 'CITY / HIGHWAY', 'RETROFIT'],
    metric: 'plug-and-play',
    accent: 'from-rose-300/35 to-transparent',
  },
];

const activities = [
  ['SEP 21, 2024', 'Digital Twin Technology', 'Paper presentation at Tek Cluster 24', 'PAPER / PRESENTATION'],
  ['MAR 21, 2025', 'Digital Twin Technology in Automobile', 'Paper at Francis Xavier Engineering College', 'PAPER / AUTOMOTIVE'],
  ['JAN 30, 2026', 'UAV Communication', 'Seminar by IETE Students’ Forum and TiHAN by IIT Hyderabad', 'SEMINAR / UAV'],
  ['APR 13, 2026', 'Swarm-intelligence adaptive path planning for UAVs', '10th National Techno Exhibition Project Contest', 'CONTEST / RESEARCH'],
  ['JUN 08 — 13, 2026', 'Microcontroller Workshop with ATmega32', 'IIT Kharagpur', 'WORKSHOP / HARDWARE'],
];

const skills = {
  'LANGUAGES': ['Embedded C', 'Advanced C++', 'Assembly', 'HTML / CSS'],
  'TOOLS': ['Dev C++', 'Docker Desktop', 'VS Code', 'Matlab', 'ReynICE Tuner Studio', 'Arduino IDE', 'Canva'],
  'HARDWARE': ['Arduino Uno / Nano', 'ECU', 'ESP32', 'Raspberry Pi', 'STM32 Nucleo F446RE'],
  'PROTOCOLS': ['SPI', 'UART', 'CAN', 'Bluetooth BLE'],
};

function CanvasField({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    const points: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points.length = 0;
      const count = Math.min(80, Math.floor(width / 16));
      for (let i = 0; i < count; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          size: Math.random() > 0.86 ? 2.4 : 1.2,
        });
      }
    };
    const render = () => {
      context.clearRect(0, 0, width, height);
      const inverted = theme === 'dark';
      context.strokeStyle = inverted ? 'rgba(220, 224, 205, 0.10)' : 'rgba(84, 105, 103, 0.08)';
      context.lineWidth = 1;
      const grid = 48;
      for (let x = 0; x < width; x += grid) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
      points.forEach((point, index) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        context.fillStyle = index % 8 === 0
          ? 'rgba(176, 224, 45, 0.8)'
          : inverted ? 'rgba(220, 224, 205, 0.42)' : 'rgba(70, 99, 96, 0.34)';
        context.fillRect(Math.round(point.x), Math.round(point.y), point.size, point.size);
        if (index % 8 === 0) {
          context.strokeStyle = inverted ? 'rgba(176, 224, 45, 0.18)' : 'rgba(128, 177, 24, 0.12)';
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(point.x + point.vx * 70, point.y + point.vy * 70);
          context.stroke();
        }
      });
      frame = requestAnimationFrame(render);
    };
    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-80" />;
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-secondary">{index}</span>
      <span className="h-px w-8 bg-secondary/60" />
      <span>{children}</span>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [selectedProject, setSelectedProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeActivity, setActiveActivity] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('sanjay-theme');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('sanjay-theme', theme);
  }, [theme]);

  useEffect(() => {
    let cursor = 0;
    const text = 'SANJAY M';
    const interval = window.setInterval(() => {
      cursor += 1;
      setTypedName(text.slice(0, cursor));
      if (cursor === text.length) window.clearInterval(interval);
    }, 105);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable ? (window.scrollY / scrollable) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-activity]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveActivity(Number((entry.target as HTMLElement).dataset.activity));
      });
    }, { rootMargin: '-35% 0px -45% 0px', threshold: 0 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const currentProject = useMemo(() => projects[selectedProject], [selectedProject]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <CanvasField theme={theme} />
      <div className="noise-layer pointer-events-none fixed inset-0 z-[1]" />
      <div className="scanline pointer-events-none fixed inset-0 z-[1] h-1/3 opacity-40" />
      <div className="fixed left-0 top-0 z-50 h-0.5 bg-secondary transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12" aria-label="Primary navigation">
          <button type="button" onClick={() => goTo('intro')} className="group flex items-center gap-3 text-left" data-testid="button-brand">
            <span className="grid h-9 w-9 place-items-center border border-secondary bg-secondary/10 font-mono text-xs font-semibold text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">SM</span>
            <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.16em] sm:block">systems lab / 01</span>
          </button>
          <div className="hidden items-center gap-7 lg:flex">
            {[
              ['01', 'profile'],
              ['02', 'work'],
              ['03', 'activity'],
              ['04', 'contact'],
            ].map(([number, label]) => (
              <button key={label} type="button" onClick={() => goTo(label)} className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground" data-testid={`link-${label}`}>
                <span className="text-secondary/80">{number}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground xl:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" /> Salem, TN
            </span>
            <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="grid h-9 w-9 place-items-center border border-foreground/15 text-muted-foreground transition hover:border-secondary hover:text-secondary" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} data-testid="button-theme-toggle">
              {theme === 'light' ? <Moon size={15} strokeWidth={1.8} /> : <Sun size={15} strokeWidth={1.8} />}
            </button>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-9 w-9 place-items-center border border-foreground/15 lg:hidden" aria-label="Toggle navigation menu" aria-expanded={menuOpen} data-testid="button-menu-toggle">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-foreground/10 bg-background px-5 py-5 lg:hidden">
            <div className="grid gap-4">
              {['profile', 'work', 'activity', 'contact'].map((label, index) => (
                <button key={label} type="button" onClick={() => goTo(label)} className="flex items-center gap-3 text-left font-mono text-xs uppercase tracking-[0.16em]" data-testid={`mobile-link-${label}`}>
                  <span className="text-secondary">0{index + 1}</span>{label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section id="intro" className="mx-auto grid min-h-[100dvh] max-w-[1440px] items-center gap-12 px-5 pb-14 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-12 lg:pb-16 lg:pt-32">
          <div>
            <div className="reveal flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_14px_hsl(var(--secondary)/.6)]" />
              embedded systems / automotive intelligence
            </div>
            <h1 className="reveal reveal-delay-1 mt-7 max-w-4xl text-[clamp(4.2rem,13vw,11rem)] font-semibold leading-[0.82] tracking-[-0.085em]">
              {typedName}<span className="cursor-blink ml-2 inline-block h-[0.72em] w-[0.08em] translate-y-[-0.03em] bg-secondary align-middle" />
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Tuning the space between <span className="text-foreground">electronics</span> and <span className="text-foreground">intelligence</span>.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => goTo('work')} className="group flex items-center gap-3 bg-primary px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition hover:bg-secondary hover:text-secondary-foreground" data-testid="button-explore-work">
                Explore the work <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <button type="button" onClick={() => goTo('contact')} className="flex items-center gap-3 border border-foreground/20 px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-secondary hover:text-secondary" data-testid="button-start-conversation">
                Start a conversation <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              </button>
            </div>
            <div className="mt-14 flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>01 / 05</span><span className="h-px w-16 bg-foreground/20" /><span>SCROLL TO INITIALIZE</span><ChevronDown size={13} className="animate-bounce text-secondary" />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-8 rounded-full border border-secondary/10 [animation:pulse-ring_5s_ease-in-out_infinite]" />
            <div className="relative border border-foreground/15 bg-card/75 p-5 backdrop-blur-md sm:p-7">
              <div className="mb-8 flex items-center justify-between border-b border-foreground/10 pb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="flex items-center gap-2"><Terminal size={13} className="text-secondary" /> system.profile</span>
                <span className="text-secondary">online</span>
              </div>
              <div className="grid grid-cols-2 gap-5 border-b border-foreground/10 pb-7">
                <div><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">focus vector</span><p className="mt-2 text-lg font-medium">ECU + AI</p></div>
                <div><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">base station</span><p className="mt-2 text-lg font-medium">Salem, TN</p></div>
              </div>
              <div className="mt-7 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative grid h-14 w-14 place-items-center rounded-full border border-secondary/60"><div className="absolute inset-1 rounded-full border border-dashed border-secondary/40" /><Gauge size={22} className="text-secondary" /></div>
                  <div><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">current mode</p><p className="mt-1 text-base">Build / iterate / test</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center border border-orange-400/60"><Radio size={22} className="text-orange-500" /></div>
                  <div><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">signal chain</p><p className="mt-1 text-base">SPI · UART · CAN · BLE</p></div>
                </div>
              </div>
              <div className="mt-8 flex justify-between border-t border-foreground/10 pt-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><span>lat 11.66° N</span><span>lon 78.14° E</span></div>
            </div>
            <div className="absolute -bottom-5 -left-5 border border-secondary/35 bg-secondary px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-widest text-secondary-foreground">ready to connect_</div>
          </div>
        </section>

        <section id="profile" className="border-t border-foreground/10 bg-card/35">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <SectionLabel index="01" children="profile / operating system" />
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
              <div>
                <h2 className="max-w-xl text-4xl font-medium leading-[1.04] tracking-[-0.05em] sm:text-6xl">An engineer who keeps one hand on the <span className="text-secondary">circuit</span> and one on the road.</h2>
                <p className="mt-8 max-w-lg text-base leading-8 text-muted-foreground">B.E. Electronics and Communication Engineering student and certified ECU tuner. I work where embedded systems meet automotive intelligence — from a blinking 555 timer to a retrofit controller that has to behave on a real highway.</p>
                <div className="mt-9 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><span className="h-px w-10 bg-secondary" /> committed to intelligent, innovative embedded solutions</div>
              </div>
              <div className="grid grid-cols-2 gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-4">
                {[
                  ['05', 'active projects'],
                  ['04', 'hardware lanes'],
                  ['04', 'protocols'],
                  ['7.894', 'latest GPA'],
                ].map(([value, label]) => (
                  <div key={label} className="bg-card/80 p-5 sm:p-6"><p className="text-3xl font-medium tracking-[-0.05em] text-secondary sm:text-4xl">{value}</p><p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">{label}</p></div>
                ))}
              </div>
            </div>
            <div className="mt-20 grid gap-12 border-t border-foreground/10 pt-9 lg:grid-cols-[0.28fr_1fr]">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">capability map</p><p className="mt-3 text-sm leading-6 text-muted-foreground">The tools and interfaces that turn an idea into a working system.</p></div>
              <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}><p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">{group}</p><div className="flex flex-wrap gap-2">{items.map((skill) => <span key={skill} className="skill-pill border border-foreground/15 bg-background/50 px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{skill}</span>)}</div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionLabel index="02" children="work / selected builds" /><h2 className="text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Systems with a point of view.</h2></div><p className="max-w-xs font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-muted-foreground">five builds / hardware to intelligence<br />select a node to inspect its logic</p></div>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {projects.map((project, index) => (
              <button type="button" key={project.number} onClick={() => setSelectedProject(index)} className={`project-card group relative overflow-hidden border p-5 text-left sm:p-7 ${selectedProject === index ? 'border-secondary bg-card' : 'border-foreground/12 bg-card/45'} ${index === 4 ? 'lg:col-span-2' : ''}`} aria-pressed={selectedProject === index} data-testid={`card-project-${project.number}`}>
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60`} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4"><span className="font-mono text-xs text-secondary">{project.number}</span><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{project.period}</span></div>
                  <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="font-mono text-[9px] uppercase tracking-[0.17em] text-secondary">{project.category}</p><h3 className="mt-3 max-w-xl text-2xl font-medium leading-tight tracking-[-0.035em] sm:text-3xl">{project.title}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{project.description}</p></div><div className="sm:text-right"><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">output</p><p className="mt-2 text-lg text-secondary">{project.metric}</p></div></div>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-4"><div className="flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{item}</span>)}</div><ArrowUpRight size={17} className="text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-secondary" /></div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-5 border border-secondary/45 bg-secondary/10 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary">selected node / {currentProject.number}</p><p className="mt-2 text-xl font-medium">{currentProject.title}</p></div><div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"><Activity size={15} className="text-secondary" /> logic chain inspected</div></div>
          </div>
        </section>

        <section id="activity" className="border-y border-foreground/10 bg-card/35">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <SectionLabel index="03" children="activity / field notes" />
            <div className="grid gap-14 lg:grid-cols-[0.62fr_1fr] lg:gap-24">
              <div><h2 className="text-4xl font-medium leading-[1.04] tracking-[-0.05em] sm:text-6xl">Curiosity needs a <span className="text-secondary">venue.</span></h2><p className="mt-7 max-w-sm text-base leading-8 text-muted-foreground">Papers, seminars, workshops and contests — the places where a system gets challenged before it gets shipped.</p><div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><Layers3 size={15} className="text-secondary" /> continuous learning protocol</div></div>
              <div className="relative border-l border-foreground/15 pl-7 sm:pl-10">
                <div className="absolute bottom-0 left-[-1px] top-0 w-px bg-gradient-to-b from-transparent via-secondary/70 to-transparent" />
                {activities.map(([date, title, description, type], index) => (
                  <div key={title} data-activity={index} className={`timeline-item relative pb-11 last:pb-0 ${activeActivity === index ? 'is-active' : ''}`}>
                    <span className="timeline-dot absolute -left-[calc(1.75rem+5px)] top-1 h-2.5 w-2.5 rounded-full border border-background bg-foreground/35 transition-all sm:-left-[calc(2.5rem+5px)]" />
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary">{date}</span><span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">{type}</span></div>
                    <h3 className="mt-3 text-xl font-medium tracking-[-0.025em]">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-24 grid gap-10 border-t border-foreground/10 pt-10 lg:grid-cols-2">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-secondary">education / 01</p><h3 className="mt-4 text-2xl font-medium">Mepco Schlenk Engineering College</h3><p className="mt-2 text-sm text-muted-foreground">Sivakasi · B.E. Electronics and Communication Engineering · 2023 — present</p><div className="mt-5 flex gap-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>latest GPA <b className="ml-2 text-foreground">7.894</b></span><span>CGPA <b className="ml-2 text-foreground">7.07</b></span></div></div>
              <div><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-secondary">education / 02</p><h3 className="mt-4 text-2xl font-medium">Glazebrooke Public School</h3><p className="mt-2 text-sm text-muted-foreground">Salem · HSC CBSE 76.2% (2023) · SSLC CBSE 85.6% (2021)</p><div className="mt-5 flex gap-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>school record <b className="ml-2 text-foreground">2021 — 2023</b></span></div></div>
            </div>
          </div>
        </section>

        <section id="credentials" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionLabel index="04" children="credentials / signal strength" />
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><h2 className="text-4xl font-medium leading-[1.04] tracking-[-0.05em] sm:text-6xl">Proof in the <span className="text-secondary">stack.</span></h2><p className="mt-7 max-w-sm text-base leading-8 text-muted-foreground">Formal learning, field learning and the discipline to keep both connected.</p></div>
            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {['ECU Tuning and Remapping — Techmaghi', 'Digital SOC Design Verification', 'NPTEL: Digital Design with Verilog', 'NPTEL: Communication Systems using Matlab', 'NPTEL: Electronic Systems Design', 'NPTEL: IoT', 'NPTEL: Industry 4.0 / IIoT', 'NPTEL: Fundamentals of AI', 'NPTEL: Signals and Systems', 'NPTEL: Roadmap for patent creation', 'NPTEL Enthusiast', 'Diploma Yoga for Youth Empowerment', 'C Training Program — IIT Bombay', 'JEE Main 2023 qualified · 76.06 percentile B.E/B.Tech · 88.15 percentile B.Planning'].map((certificate, index) => (
                <div key={certificate} className="flex gap-3 border-b border-foreground/10 pb-4"><span className="font-mono text-[10px] text-secondary">0{(index % 9) + 1}</span><span className="text-sm leading-6 text-muted-foreground">{certificate}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-foreground/10 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div><div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary"><Signal size={14} /> open channel</div><h2 className="mt-7 max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.07em] sm:text-8xl">Have a system<br /><span className="text-secondary">worth building?</span></h2><p className="mt-8 max-w-lg text-base leading-7 text-primary-foreground/65">For automotive electronics, embedded prototypes or a thoughtful technical conversation, send a signal.</p></div>
              <div className="flex flex-col items-start gap-4 lg:items-end"><a href="mailto:sanjaymahesh16@gmail.com" className="group flex items-center gap-3 border border-primary-foreground/25 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.15em] transition hover:border-secondary hover:bg-secondary hover:text-secondary-foreground" data-testid="link-email"><Mail size={15} /> sanjaymahesh16@gmail.com <ArrowUpRight size={14} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a><a href="https://linkedin.com/in/sanjaymahesh" target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-1 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground/70 transition hover:text-secondary" data-testid="link-linkedin"><Linkedin size={15} /> linkedin.com/in/sanjaymahesh <ExternalLink size={13} /></a></div>
            </div>
            <div className="mt-24 flex flex-col justify-between gap-5 border-t border-primary-foreground/15 pt-6 font-mono text-[9px] uppercase tracking-[0.17em] text-primary-foreground/45 sm:flex-row"><span>+91 86083 31298 · Salem, Tamil Nadu</span><span className="flex items-center gap-2"><Zap size={12} className="text-secondary" /> built with intent / 2026</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
