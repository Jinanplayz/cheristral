
import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import { Link } from 'react-router-dom';
import { m, useInView } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { heroes, cards } from '@/lib/images';

// Lazy loaded heavy components
const ProjectCard = lazy(() => import('@/components/ProjectCard.jsx'));
const TeamMemberCard = lazy(() => import('@/components/TeamMemberCard.jsx'));

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const HomePage = () => {
  const featuredProjects = [
    {
      id: "upcoming-1",
      title: 'UPCOMING',
      description: 'A story-based multiplayer fighting game with progressive leveling, skill trees and unique twists.',
      downloads: '0',
      rating: '5.0',
      releaseDate: '2027-28',
      tags: ['fighting', 'multiplayer', 'story-based', 'skill trees'],
      image: cards.game01
    },
    {
      id: "upcoming-2",
      title: 'UPCOMING',
      description: 'A multiplayer psychological and supernatural horror game in the vein of Phasmophobia and Fears to Fathom.',
      downloads: '0',
      rating: '5.0',
      releaseDate: '2027-28',
      tags: ['horror', 'psychological', 'supernatural', 'multiplayer'],
      image: cards.game03
    }
  ];

  const teamHighlights = [
    {
      name: 'Abdullah Ibn Mahmud',
      position: 'Dev and Lead Design',
      description: 'Developing and designing interactive mechanics that respect the audience\'s time and foster deep, remarkable engagement.'
    },
    {
      name: 'Ahnaf Saleque Jinan',
      position: 'Lead Dev and Producer',
      description: 'Serving as CEO and Lead Producer, directing the studio\'s overarching vision and leading core game development with extensive industry expertise.'
    },
    {
      name: 'Abdullah Al-Nahian',
      position: 'Dev and Lead Config',
      description: 'Leading configuration and developing sophisticated systems that elevate immersive environments to an exceptional standard.'
    }
  ];

  // A stat shows an animated `value`, or a short `text` phrase in its place.
  const studioStats = [{
    label: "Total Downloads",
    value: 0,
    suffix: "",
    desc: "Across multiple platforms"
  }, {
    label: "Games Shipped",
    value: 0,
    suffix: "",
    desc: "First title due mid 2027"
  }, {
    label: "Development Time",
    value: 240,
    suffix: "H+",
    desc: "Delivering excellence with precision"
  }, {
    label: "Team Members",
    text: "Actively recruiting!",
    desc: "Exceptional technical professionals"
  }];

  return (
    <>
      <PageMeta title="Cheristral Studio - Next-Gen Gaming Experiences" description="Cheristral Studio creates sophisticated interactive games that push the boundaries of entertainment." />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <HeroSection 
            backgroundImage={heroes.home}
            priority 
            title="REDEFINING INTERACTIVE EXPERIENCES" 
            subtitle="We develop highly sophisticated, immersive environments that redefine interactive entertainment, combining uncompromising quality with exceptional innovation." 
            ctaText="EXPLORE OUR WORK" 
            ctaLink="/projects" 
          />

          <section className="py-32 bg-secondary/20 relative overflow-hidden border-y border-border/30">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                <p className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-2xl sm:rounded-full border border-primary/40 bg-primary/10 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest text-primary">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                  {/* Two stacked lines on phones, one line with a divider from sm up. */}
                  <span className="flex flex-col sm:flex-row sm:gap-2">
                    <span>Development begins November 2026</span>
                    <span className="hidden sm:inline" aria-hidden="true">·</span>
                    <span>First game mid 2027</span>
                  </span>
                </p>
                <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-4 uppercase">Our Impact</h2>
                <p className="text-4xl md:text-5xl font-black uppercase">Studio & Project Metrics</p>
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {studioStats.map((stat, index) => (
                  <Link to="/projects" key={index} className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
                    <m.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }} whileHover={{ scale: 1.05, y: -10 }} className="group h-full bg-card/80 backdrop-blur-md border border-border/50 hover:border-primary p-10 lg:p-6 xl:p-10 rounded-2xl text-center transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] relative overflow-hidden gpu-accelerated will-change-transform">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="relative z-10">
                        {/* The box is always one number tall, so a text stat lines up with the rest.
                            Sizes step down at lg/xl, where four columns are too narrow for "240H+" at full size. */}
                        <div className="h-[1em] flex items-center justify-center text-6xl md:text-7xl lg:text-5xl xl:text-6xl min-[1400px]:text-7xl font-black text-foreground group-hover:text-primary transition-colors duration-300 mb-4 font-rajdhani text-glow">
                          {stat.text
                            ? <span className="text-3xl/none lg:text-2xl/none xl:text-3xl/none">{stat.text}</span>
                            : <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">{stat.label}</h3>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.desc}</p>
                      </div>
                    </m.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-4 uppercase">Portfolio</h2>
                  <p className="text-4xl md:text-5xl font-black uppercase">Active Projects</p>
                </div>
                <Button asChild size="lg" className="text-lg font-bold tracking-widest uppercase rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] min-h-[44px]">
                  <Link to="/projects">Explore Our Work</Link>
                </Button>
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Suspense fallback={
                  <>
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                  </>
                }>
                  {featuredProjects.map((project) => <ProjectCard key={project.id} {...project} />)}
                </Suspense>
              </div>
            </div>
          </section>

          <section className="py-32 bg-card border-t border-border/30 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-4 uppercase">Our Leadership</h2>
                <p className="text-4xl md:text-5xl font-black uppercase max-w-2xl mx-auto">The Visionaries Behind the Studio</p>
              </m.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                <Suspense fallback={
                  <>
                    <Skeleton className="h-[300px] w-full rounded-2xl" />
                    <Skeleton className="h-[300px] w-full rounded-2xl" />
                    <Skeleton className="h-[300px] w-full rounded-2xl" />
                  </>
                }>
                  {teamHighlights.map((member, index) => <TeamMemberCard key={index} {...member} />)}
                </Suspense>
              </div>

              <div className="text-center">
                <Button asChild size="lg" variant="outline" className="border-border/50 hover:border-primary hover:bg-primary hover:text-white uppercase font-bold tracking-widest text-lg px-10 h-14 min-w-[44px] rounded-none transition-all shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
                  <Link to="/team">Meet Our Studio</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
