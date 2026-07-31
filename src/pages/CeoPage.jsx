import React from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Printer } from 'lucide-react';

/**
 * Unlisted CV page at /ceo
 *
 * Nothing links here, so it will not be found by browsing the site. It is not
 * private though: the URL is public, and the page ships inside the JS bundle
 * like every other route. Do not put anything here you would mind a stranger
 * reading. See the note at the bottom of this file.
 *
 * EDIT EVERYTHING IN `cv` BELOW. The layout adapts to however many entries you
 * add, so you can delete sections you do not want.
 */
const cv = {
  name: 'Ahnaf Saleque Jinan',
  title: 'Chief Executive Officer & Lead Producer',
  location: 'Dhaka, Bangladesh',
  email: '',        // e.g. 'jinan@cheristral.com' — leave '' to hide
  github: '',       // e.g. 'https://github.com/Jinanplayz'
  linkedin: '',     // e.g. 'https://linkedin.com/in/yourname'

  summary:
    'Founder and producer at Cheristral Studio, directing studio vision and ' +
    'core narrative development. Replace this with two or three sentences on ' +
    'what you build and what you are looking for.',

  experience: [
    {
      role: 'Founder, CEO & Lead Producer',
      org: 'Cheristral Studio',
      period: '2024 — Present',
      points: [
        'Direct overall studio vision, production pipeline and release planning.',
        'Lead narrative design across all titles in development.',
        'Built and manage a six-person cross-disciplinary team.',
      ],
    },
    {
      role: 'Your previous role',
      org: 'Company or project',
      period: '20XX — 20XX',
      points: [
        'What you were responsible for.',
        'A result you can point at, with a number if you have one.',
      ],
    },
  ],

  education: [
    {
      qualification: 'Your degree or programme',
      org: 'Institution',
      period: '20XX — 20XX',
    },
  ],

  skills: [
    'Unity', 'C#', 'Game Design', 'Narrative Design',
    'Production', 'Team Leadership', 'React', 'Git',
  ],
};

const Section = ({ title, children, delay = 0, reduce }) => (
  <motion.section
    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : delay }}
    className="mb-12"
  >
    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-primary mb-6 pb-3 border-b border-primary/30">
      {title}
    </h2>
    {children}
  </motion.section>
);

const CeoPage = () => {
  const reduce = useReducedMotion();

  const contacts = [
    cv.location && { Icon: MapPin, label: cv.location, href: null },
    cv.email && { Icon: Mail, label: cv.email, href: `mailto:${cv.email}` },
    cv.github && { Icon: Github, label: 'GitHub', href: cv.github },
    cv.linkedin && { Icon: Linkedin, label: 'LinkedIn', href: cv.linkedin },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title={`${cv.name} - Cheristral Studio`}
        description={`${cv.title}, Cheristral Studio.`}
        noIndex
      />

      <div className="print:hidden">
        <Header />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 print:pt-8 max-w-4xl">
        <motion.header
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.45 }}
          className="mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary mb-4">
            Curriculum Vitae
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-3"
            style={{ textShadow: '0 0 30px hsl(var(--primary)/0.35)' }}
          >
            {cv.name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium mb-8">
            {cv.title}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {contacts.map(({ Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </a>
              ) : (
                <span key={label} className="inline-flex items-center gap-2 text-muted-foreground">
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </span>
              )
            )}
          </div>
        </motion.header>

        {cv.summary && (
          <Section title="Profile" delay={0.05} reduce={reduce}>
            <p className="text-base md:text-lg leading-relaxed text-foreground/85">
              {cv.summary}
            </p>
          </Section>
        )}

        {cv.experience?.length > 0 && (
          <Section title="Experience" delay={0.1} reduce={reduce}>
            <div className="space-y-8">
              {cv.experience.map((job) => (
                <div
                  key={`${job.org}-${job.role}`}
                  className="border-l-2 border-primary/40 pl-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-lg font-bold">{job.role}</h3>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.org}</p>
                  <ul className="space-y-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm md:text-base text-foreground/80 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-primary/70 before:rounded-full"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {cv.education?.length > 0 && (
          <Section title="Education" delay={0.15} reduce={reduce}>
            <div className="space-y-5">
              {cv.education.map((ed) => (
                <div
                  key={`${ed.org}-${ed.qualification}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                >
                  <div>
                    <h3 className="text-base font-bold">{ed.qualification}</h3>
                    <p className="text-sm text-muted-foreground">{ed.org}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary whitespace-nowrap">
                    {ed.period}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {cv.skills?.length > 0 && (
          <Section title="Skills" delay={0.2} reduce={reduce}>
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-primary/40 text-foreground/90 bg-primary/5"
                >
                  {skill}
                </span>
              ))}
            </div>
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
