
import React, { Suspense, lazy } from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { heroes } from '@/lib/images';

const TeamMemberCard = lazy(() => import('@/components/TeamMemberCard.jsx'));

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Abdullah Ibn Mahmud',
      position: 'Lead Artist and Designer',
      description: 'Designing interactive mechanics that respect the audience\'s time and environments that foster deep, remarkable engagement.',
    },
    {
      name: 'Ahnaf Saleque Jinan',
      position: 'Lead Engineer and Producer',
      description: 'Serving as CEO and Lead Producer, directing the studio\'s overarching vision and driving core narrative development with extensive industry expertise.',
    },
    {
      name: 'Abdullah Al-Nahian',
      position: 'Lead Environment and Audio',
      description: 'Crafting distinguished visual experiences and sophisticated audioscapes that elevate immersive environments to an exceptional standard.',
    },
    {
      name: 'Al-Hasin Mahtab',
      position: 'Lead QA and Playtester',
      description: 'Ensuring exceptional product stability and refining the end-user experience through comprehensive quality assurance.',
    },
    {
      name: 'MD. Arashuzzaman Khan',
      position: 'Lead Support and Public Relations',
      description: 'Facilitating clear communication between the studio and our audience, ensuring player feedback remains central to our development process.',
    },
    {
      name: 'Azme Mia',
      position: 'Lead Graphics and Editor',
      description: 'Delivering outstanding visual assets, promotional artwork, and highly polished trailer compositions.',
    },
  ];

  return (
    <>
      <PageMeta title="Our Studio - Cheristral Studio" description="Meet the exceptional talent behind Cheristral Studio's acclaimed interactive experiences." />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <HeroSection
            backgroundImage={heroes.team}
            title="OUR STUDIO"
            subtitle="An assembly of exceptional talent dedicated to advancing the medium of interactive storytelling."
          />

          <section className="py-32 relative">
            <div className="absolute inset-0 bg-background/95 z-0 pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-glow">Leadership & Core Team</h2>
                <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-medium">
                  Our team brings together specialized expertise from across the interactive entertainment sector, united by a shared commitment to remarkable innovation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                <Suspense fallback={
                  Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-[350px] w-full rounded-2xl" />
                  ))
                }>
                  {teamMembers.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
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

export default TeamPage;
