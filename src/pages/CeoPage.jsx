import React from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { m, useReducedMotion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Printer, MessageSquare, Phone } from 'lucide-react';

/**
 * Unlisted CV page at /ceo
 *
 * Nothing links here and it is marked noindex, so it will not turn up in search
 * results or by browsing the site. It is NOT private: the URL is public and
 * anyone who types /ceo can read it.
 *
 * That is why `phone` and `address` are blank below. Treat everything on this
 * page as readable by a stranger. Both are wired up and will render the moment
 * they are non-empty, so enabling them is a one-line change.
 *
 * EDIT ONLY THE `cv` OBJECT. Any field left as '' hides itself, and any empty
 * array skips its whole section.
 */
const cv = {
  name: 'Ahnaf Saleque Jinan',
  title: 'Engineer and Specialist in the Gaming Industry',
  subtitle: 'Founder & Lead Producer, Cheristral Studio',

  location: 'Dhaka, Bangladesh',
  email: 'ahnafsalequejinan@gmail.com',
  discord: 'Jinanplayz',
  github: 'https://github.com/Jinanplayz',
  linkedin: '',

  // Deliberately empty. Read the note above before filling these in.
  phone: 'Contact Email for phone number',            
  address: 'Contact Email for addresss',          

  summary:
    'Lead QA Engineer working across live game projects serving over 1.25 million ' +
    'monthly active players, focused on release stability, structured defect ' +
    'documentation and cross-functional delivery. Currently founding Cheristral ' +
    'Studio to build original PC and mobile titles.',

  experience: [
    {
      role: 'Lead QA Engineer',
      org: 'Craftigames / Mexin Global Ventures',
      place: 'Amsterdam, Netherlands (Remote)',
      period: 'July 2023 — Present',
      points: [
        'Collaborating in a remote, cross-functional team using Agile (Scrum) and Kanban (ClickUp/Trello/Jira) to deliver tasks on schedule. Contributed to LiveOps for game projects serving 1.25 million+ monthly active players across multiple platforms, working across dev and production server pipelines.',
        'Leading review processes across 24+ game projects, managing evaluations within weekly sprints (1–3 projects weekly) and extended review cycles for new and concept-stage projects. Collaborating closely with developers, configurators, product managers and a global player council to review over 150+ game projects.',
        'Solely responsible for the bug review process, ensuring clear communication and timely issue resolution. Leading regression and smoke testing across all game projects to maintain quality and release stability. Handling over 1k+ tickets a month, increasing bug reduction by up to 90%.',
        'Documenting bugs, issues, feedback and suggestions from multiple sources in a clear, structured format for conversion into actionable tasks. Compiled 35+ project documents to plan and provide insight for future initiatives. Communicating with Discord communities totalling 250k+ members.',
        'Playtesting and collaborating on beta tests with the player council to gather insight, bugs and actionable data. Converted 15k+ issues, bugs and pieces of feedback into actionable implementation tickets.',
        'Contributing to effective test plans and test cases focused on improving quality and player experience. Preparing sprint progress reports and documenting tooling feedback. Increased team efficiency by 40% and project delivery speed by 50%, raising overall project size capability.',
        'Contributing to player events, collaborating with moderation managers and staff teams on safety principles for younger audiences while respecting their privacy. Balancing game economies and expanding fair-play competition to increase retention by 80%.',
      ],
    },
  ],

  projects: [
    {
      title: 'Cheristral Studio',
      meta: '2026 — Present',
      description:
        'Creating an indie studio with select friends to produce high-quality games targeting PC and mobile. Currently learning Unity and 3D modelling and exploring project management solutions and game ideas. The goal for 2026 is to master the fundamentals and launch a first title in 2027. Genres: horror, co-op, multiplayer, action, thriller.',
    },
    {
      title: 'Monument Valley 3',
      meta: 'Ustwo Games · Netflix Games',
      description: 'Pre-release QA playtesting on mobile.',
    },
    {
      title: 'King of Meat',
      meta: 'Glowmade · Amazon Games',
      description: 'Pre-release QA playtesting on PC.',
    },
    {
      title: 'Fortnite',
      meta: 'Epic Games × Antidote',
      description: 'Pre-release QA playtesting across two update sessions.',
    },
  ],

  achievements: [
    'Goethe Institut KIKUK 2.0 AI Competition — National Winner, 2026. Partnered with Cornelsen and Magazin für Technik.',
    'Scholastica Senior Vertical Hackathon 2025 — First place, for "Voice-based Fintech Budgeting with AI".',
    'LingHacks VII 2026 — Hackathon winner, for "VoiceFlow: AI-Assistive Speaking".',
    'Clarion Call Math Olympiad 2025 — Winner.',
    'Speaker at HDMUN IAEA (International Atomic Energy Agency) on humanitarian ideologies that impact our lives.',
  ],

  skills: {
    'Programming': ['Python', 'C#', 'JavaScript', 'Lua', 'HTML', 'CSS'],
    'QA & Production': ['Agile / Scrum', 'Kanban', 'Jira', 'ClickUp', 'Trello', 'Regression testing', 'Smoke testing', 'LiveOps'],
    'AI tools': ['Claude', 'GPT / Gemini', 'ElevenLabs', 'Suno', 'Tripo3D', 'WAN', 'Cursor', 'Kommodo', 'WisprFlow', 'Canva AI'],
  },

  education: [
    {
      qualification: 'O/A Levels',
      org: 'South Point School and College',
      period: 'Current',
    },
  ],

  languages: [
    { name: 'Bengali', level: 'C2' },
    { name: 'English', level: 'C1' },
    { name: 'Hindi / Urdu', level: 'B2' },
    { name: 'Deutsch', level: 'A2' },
  ],

  interests: [
    'Music creation',
    'Volunteering at educational institutions for STEM events',
    'Studying research papers',
  ],
};

const Section = ({ title, children, delay = 0, reduce }) => (
  <m.section
    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : delay }}
    className="mb-12 print:mb-5 print:break-inside-avoid"
  >
    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-primary mb-6 pb-3 border-b border-primary/30 print:text-base print:mb-3 print:pb-1">
      {title}
    </h2>
    {children}
  </m.section>
);

const Bullet = ({ children }) => (
  <li className="text-sm md:text-base text-foreground/80 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-primary/70 before:rounded-full print:text-[11px] print:leading-snug">
    {children}
  </li>
);

const CeoPage = () => {
  const reduce = useReducedMotion();

  const contacts = [
    (cv.address || cv.location) && { key: 'loc', Icon: MapPin, label: cv.address || cv.location, href: null },
    cv.email && { key: 'mail', Icon: Mail, label: cv.email, href: `mailto:${cv.email}` },
    cv.phone && { key: 'tel', Icon: Phone, label: cv.phone, href: `tel:${cv.phone.replace(/\s/g, '')}` },
    cv.discord && { key: 'dc', Icon: MessageSquare, label: cv.discord, href: null },
    cv.github && { key: 'gh', Icon: Github, label: 'GitHub', href: cv.github },
    cv.linkedin && { key: 'li', Icon: Linkedin, label: 'LinkedIn', href: cv.linkedin },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title={`${cv.name} - Cheristral Studio`}
        description={`${cv.title}.`}
        noIndex
      />

      <div className="print:hidden">
        <Header />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 print:pt-0 print:pb-0 max-w-4xl">
        <m.header
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.45 }}
          className="mb-14 print:mb-5"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary mb-4 print:hidden">
            Curriculum Vitae
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-3 print:text-2xl print:mb-1"
            style={{ textShadow: '0 0 30px hsl(var(--primary)/0.35)' }}
          >
            {cv.name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium print:text-sm">
            {cv.title}
          </p>
          {cv.subtitle && (
            <p className="text-base text-muted-foreground/80 mt-1 print:text-xs">
              {cv.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mt-8 print:mt-3 print:text-[11px] print:gap-x-4">
            {contacts.map(({ key, Icon, label, href }) =>
              href ? (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={16} aria-hidden="true" className="print:hidden" />
                  {label}
                </a>
              ) : (
                <span key={key} className="inline-flex items-center gap-2 text-muted-foreground">
                  <Icon size={16} aria-hidden="true" className="print:hidden" />
                  {label}
                </span>
              )
            )}
          </div>
        </m.header>

        {cv.summary && (
          <Section title="Profile" delay={0.05} reduce={reduce}>
            <p className="text-base md:text-lg leading-relaxed text-foreground/85 print:text-[11px] print:leading-snug">
              {cv.summary}
            </p>
          </Section>
        )}

        {cv.experience?.length > 0 && (
          <Section title="Professional Experience" delay={0.1} reduce={reduce}>
            <div className="space-y-8">
              {cv.experience.map((job) => (
                <div key={`${job.org}-${job.role}`} className="border-l-2 border-primary/40 pl-5 print:pl-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-lg font-bold print:text-sm">{job.role}</h3>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary whitespace-nowrap print:text-[10px]">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 print:text-[11px] print:mb-2">
                    {job.org}
                    {job.place ? ` — ${job.place}` : ''}
                  </p>
                  <ul className="space-y-2 print:space-y-1">
                    {job.points.map((point) => (
                      <Bullet key={point}>{point}</Bullet>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {cv.projects?.length > 0 && (
          <Section title="Projects & Playtesting" delay={0.15} reduce={reduce}>
            <div className="space-y-6 print:space-y-3">
              {cv.projects.map((proj) => (
                <div key={proj.title} className="border-l-2 border-primary/40 pl-5 print:pl-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-base font-bold print:text-sm">{proj.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary whitespace-nowrap print:text-[10px]">
                      {proj.meta}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed print:text-[11px] print:leading-snug">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {cv.achievements?.length > 0 && (
          <Section title="Achievements" delay={0.2} reduce={reduce}>
            <ul className="space-y-2 print:space-y-1">
              {cv.achievements.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </Section>
        )}

        {Object.keys(cv.skills ?? {}).length > 0 && (
          <Section title="Skills" delay={0.25} reduce={reduce}>
            <div className="space-y-5 print:space-y-3">
              {Object.entries(cv.skills).map(([group, items]) => (
                <div key={group}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 print:mb-1 print:text-[10px]">
                    {group}
                  </h3>
                  <div className="flex flex-wrap gap-2 print:gap-1">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-primary/40 text-foreground/90 bg-primary/5 print:px-2 print:py-0.5 print:text-[9px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {cv.education?.length > 0 && (
          <Section title="Education" delay={0.3} reduce={reduce}>
            <div className="space-y-5 print:space-y-2">
              {cv.education.map((ed) => (
                <div
                  key={`${ed.org}-${ed.qualification}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                >
                  <div>
                    <h3 className="text-base font-bold print:text-sm">{ed.qualification}</h3>
                    <p className="text-sm text-muted-foreground print:text-[11px]">{ed.org}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary whitespace-nowrap print:text-[10px]">
                    {ed.period}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {cv.languages?.length > 0 && (
          <Section title="Languages" delay={0.35} reduce={reduce}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 print:gap-x-5">
              {cv.languages.map((lang) => (
                <div key={lang.name} className="flex items-baseline gap-2">
                  <span className="text-base font-bold print:text-xs">{lang.name}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary print:text-[10px]">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {cv.interests?.length > 0 && (
          <Section title="Interests" delay={0.4} reduce={reduce}>
            <p className="text-sm md:text-base text-foreground/80 print:text-[11px]">
              {cv.interests.join(' · ')}
            </p>
          </Section>
        )}

        <button
          type="button"
          onClick={() => window.print()}
          className="print:hidden inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border-2 border-primary text-primary font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-colors"
        >
          <Printer size={16} aria-hidden="true" />
          Save as PDF
        </button>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default CeoPage;