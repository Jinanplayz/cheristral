
import React, { Suspense, lazy } from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import { m } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { heroes } from '@/lib/images';

const JobCard = lazy(() => import('@/components/JobCard.jsx'));

const CareersPage = () => {
  const jobListings = [
    {
      id: "junior-unity-developer",
      title: 'Junior Unity Developer',
      department: 'Engineering',
      type: 'Permanent',
      location: 'Remote',
      description: 'Accelerate your career in interactive entertainment. Collaborate with our engineering team to construct sophisticated gameplay mechanics within a dedicated, professional environment.',
    },
    {
      id: "video-editor",
      title: 'Video and Trailer Editor',
      department: 'Marketing / Media',
      type: 'Contractor',
      location: 'Remote',
      description: 'Assist in presenting our projects to a global audience. We are seeking a skilled editor to compose distinguished promotional content and polished trailers.',
    },
    {
      id: "sfx-audio-artist",
      title: 'SFX and Audio Artist',
      department: 'Audio',
      type: 'Contractor',
      location: 'Remote',
      description: 'Elevate our immersive environments through sophisticated sound design. Compose impactful audioscapes and implement refined audio assets.',
    },
    {
      id: "photo-thumbnail-editor",
      title: 'Photo and Game Thumbnail Editor',
      department: 'Art / Media',
      type: 'Contractor',
      location: 'Remote',
      description: 'Capture compelling visual assets. Compose and edit outstanding in-game photography and promotional media for our platforms.',
    },
    {
      id: "community-manager",
      title: 'Community and Social Media Manager',
      department: 'Community',
      type: 'Permanent',
      location: 'Remote',
      description: 'Serve as the primary liaison for our studio. Engage thoughtfully with our audience and foster a distinguished, welcoming community.',
    },
    {
      id: "qa-playtester",
      title: 'QA Playtester',
      department: 'Quality Assurance',
      type: 'Contract to Permanent',
      location: 'Remote',
      description: 'Help us ensure our products are exceptionally polished. Evaluate new builds, identify issues, and provide critical feedback to refine the user experience.',
    },
  ];

  return (
    <>
      <PageMeta title="Careers - Cheristral Studio" description="Explore opportunities to join Cheristral Studio and contribute to exceptional interactive experiences." />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <HeroSection
            backgroundImage={heroes.careers}
            title="CAREERS"
            subtitle="We are continuously seeking exceptional talent to join our studio. Whether you are an industry veteran or an emerging professional, discover your next opportunity with us."
          />

          <section className="py-32 relative">
            <div className="absolute inset-0 bg-background/90 z-0 pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-glow">Open Positions</h2>
                <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-medium">
                  We foster talent and provide substantial opportunities for professional growth. We invite candidates of all experience levels to explore our current openings.
                </p>
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <Suspense fallback={
                  Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-[250px] w-full rounded-2xl" />
                  ))
                }>
                  {jobListings.map((job) => (
                    <JobCard key={job.id} {...job} />
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

export default CareersPage;
