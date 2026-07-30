
import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
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
      description: 'A sophisticated psychological horror experience currently in development, seamlessly integrating atmospheric storytelling with intense action mechanics and compelling adventure elements.',
      downloads: '1K',
      rating: '5.0',
      releaseDate: '2026',
      tags: ['horror', 'psychological', 'action', 'adventure'],
      image: cards.game01
    }, 
    {
      id: "upcoming-2",
      title: 'UPCOMING',
      description: 'A gripping psychological thriller in active development, combining horror elements with fast-paced action and sophisticated adventure gameplay.',
      downloads: '1K',
      rating: '5.0',
      releaseDate: '2026',
      tags: ['horror', 'psychological', 'thriller', 'action'],
      image: cards.game03
    }
  ];

  const teamHighlights = [
    {
      name: 'Abdullah Ibn Mahmud',
      position: 'Lead Artist and Designer',
      description: 'Designing interactive mechanics that respect the audience\'s time and environments that foster deep, remarkable engagement.'
    },
    {
      name: 'Ahnaf Saleque Jinan',
      position: 'Lead Engineer and Producer',
      description: 'Serving as CEO and Lead Producer, directing the studio\'s overarching vision and driving core narrative development with extensive industry expertise.'
    },
    {
      name: 'Abdullah Al-Nahian',
      position: 'Lead Environment and Audio',
      description: 'Crafting distinguished visual experiences and sophisticated audioscapes that elevate immersive environments to an exceptional standard.'
    }
  ];

  const studioStats = [{
    label: "Total Downloads",
    value: 1,
    suffix: "K+",
    desc: "Across multiple platforms"
  }, {
    label: "Games Shipped",
    value: 1,
    suffix: "+",
    desc: "Recognized interactive titles"
  }, {
    label: "Development Time",
    value: 240,
    suffix: "H+",
    desc: "Delivering excellence with precision"
  }, {
    label: "Team Members",
    value: 6,
    suffix: "+",
    desc: "Exceptional technical professionals"
  }];

  return (
    <>
      <Helmet>
        <title>Cheristral Studio - Next-Gen Gaming Experiences</title>
        <meta name="description" content="Cheristral Studio creates sophisticated interactive games that push the boundaries of entertainment." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <HeroSection 
            backgroundImage={heroes.home} 
            title="REDEFINING INTERACTIVE EXPERIENCES" 
            subtitle="We develop highly sophisticated, immersive environments that redefine interactive entertainment, combining uncompromising quality with exceptional innovation." 
            ctaText="EXPLORE OUR WORK" 
            ctaLink="/projects" 
          />

          <section className="py-32 bg-secondary/20 relative overflow-hidden border-y border-border/30">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-4 uppercase">Our Impact</h2>
                <p className="text-4xl md:text-5xl font-black uppercase">Studio & Project Metrics</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {studioStats.map((stat, index) => (
                  <Link to="/projects" key={index} className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }} whileHover={{ scale: 1.05, y: -10 }} className="group bg-card/80 backdrop-blur-md border border-border/50 hover:border-primary p-10 rounded-2xl text-center transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] relative overflow-hidden gpu-accelerated will-change-transform">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="text-6xl md:text-7xl font-black text-foreground group-hover:text-primary transition-colors duration-300 mb-4 font-rajdhani text-glow">
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">{stat.label}</h3>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.desc}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-4 uppercase">Portfolio</h2>
                  <p className="text-4xl md:text-5xl font-black uppercase">Active Projects</p>
                </div>
                <Button asChild size="lg" className="text-lg font-bold tracking-widest uppercase rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] min-h-[44px]">
                  <Link to="/projects">Explore Our Work</Link>
                </Button>
              </motion.div>

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
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-4 uppercase">Our Leadership</h2>
                <p className="text-4xl md:text-5xl font-black uppercase max-w-2xl mx-auto">The Visionaries Behind the Studio</p>
              </motion.div>

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
