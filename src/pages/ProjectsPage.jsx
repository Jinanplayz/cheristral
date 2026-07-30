
import React, { Suspense, lazy } from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { useImagePreload } from '@/hooks/useImagePreload.js';

const ProjectCard = lazy(() => import('@/components/ProjectCard.jsx'));

const ProjectsPage = () => {
  const bgUrl = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80";
  const isBgLoaded = useImagePreload(bgUrl);

  const projects = [
    {
      id: "upcoming-1",
      title: 'UPCOMING',
      description: 'A sophisticated psychological horror experience currently in development, seamlessly integrating atmospheric storytelling with intense action mechanics and compelling adventure elements.',
      downloads: '1K',
      rating: '5.0',
      releaseDate: '2026',
      tags: ['horror', 'psychological', 'action', 'adventure'],
      image: 'https://images.unsplash.com/photo-1629867578529-7f5a9f984c78'
    }, 
    {
      id: "upcoming-2",
      title: 'UPCOMING',
      description: 'A gripping psychological thriller in active development, combining horror elements with fast-paced action and sophisticated adventure gameplay.',
      downloads: '1K',
      rating: '5.0',
      releaseDate: '2026',
      tags: ['horror', 'psychological', 'thriller', 'action'],
      image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <>
      <PageMeta title="Projects - Cheristral Studio" description="Explore Cheristral Studio's portfolio of sophisticated interactive experiences across multiple genres." />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <HeroSection
            backgroundImage="https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80"
            title="OUR PORTFOLIO"
            subtitle="A distinguished collection of interactive experiences that push the boundaries of modern gaming across multiple platforms."
          />

          <section className="py-32 relative">
            {/* Stable Background Container */}
            <div 
              className={`absolute inset-0 bg-image-stable opacity-5 mix-blend-screen pointer-events-none ${!isBgLoaded ? 'bg-[hsl(var(--image-placeholder-bg))]' : ''}`}
              style={isBgLoaded ? { backgroundImage: `url(${bgUrl})` } : {}}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-glow">Current Projects</h2>
                <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-medium">
                  From sophisticated narrative adventures to highly detailed simulations, our portfolio reflects a steadfast commitment to exceptional quality and continuous innovation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
                <Suspense fallback={
                  <>
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                  </>
                }>
                  {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </Suspense>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;
