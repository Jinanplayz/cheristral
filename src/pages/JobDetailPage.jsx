
import React from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import { useParams, Link, Navigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, Briefcase, MapPin, Clock, CheckCircle2, DollarSign, ArrowUpRight, HeartPulse, ShieldCheck, Zap, Gamepad2, Users, Sparkles } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FormCTAButton from '@/components/FormCTAButton.jsx';
import { APPLICATION_FORM_URL } from '@/lib/formLinks.js';

const JobDetailPage = () => {
  const { jobId } = useParams();

  // Centralized job data to handle all routes dynamically
  const jobsData = {
    "junior-unity-developer": {
      title: "Junior Unity Developer",
      department: "Engineering",
      location: "Remote",
      type: "Permanent",
      salary: "Competitive Entry-Level",
      description: "Accelerate your career in interactive entertainment. We are seeking an enthusiastic Junior Unity Developer prepared to engage with sophisticated engineering challenges. You will collaborate with our engineering team to construct robust gameplay mechanics within a dedicated, professional environment.",
      responsibilities: [
        "Assist in implementing and refining gameplay mechanics using C# and Unity.",
        "Collaborate with designers and artists to accurately integrate assets into the engine.",
        "Identify, track, and resolve defects to elevate product stability.",
        "Participate in code reviews and actively integrate feedback from senior engineers."
      ],
      requirements: [
        "Demonstrated understanding of Unity Engine and C# programming.",
        "A profound dedication to interactive media and game development.",
        "Excellent communication skills and a professional, collaborative demeanor.",
        "A portfolio or relevant projects illustrating your technical capability."
      ],
      benefits: [
        { icon: Sparkles, text: "Dedicated Mentorship Program" },
        { icon: Clock, text: "Flexible Working Hours" },
        { icon: Zap, text: "Hardware & Software Stipend" },
        { icon: HeartPulse, text: "Health & Wellness Benefits" }
      ]
    },
    "video-editor": {
      title: "Video and Trailer Editor",
      department: "Marketing / Media",
      location: "Remote",
      type: "Contractor",
      salary: "Project-Based / Hourly",
      description: "Assist in presenting our projects to a global audience. We are seeking a skilled Video Editor to compose distinguished promotional content, devlogs, and polished trailers. If you possess an exceptional sense of pacing and visual composition, we invite you to apply.",
      responsibilities: [
        "Edit raw capture footage into exceptional, high-fidelity promotional trailers.",
        "Compose sophisticated short-form media for our digital platforms.",
        "Synchronize audio, music, and sound design to elevate the visual narrative.",
        "Coordinate closely with the marketing division to ensure brand alignment."
      ],
      requirements: [
        "Demonstrated proficiency with professional editing software (Premiere Pro, DaVinci Resolve, etc.).",
        "An exceptional eye for pacing, rhythm, and visual storytelling.",
        "A comprehensive understanding of industry-standard promotional aesthetics.",
        "A polished portfolio demonstrating exceptional editing capability."
      ],
      benefits: [
        { icon: Clock, text: "Set Your Own Hours" },
        { icon: Zap, text: "Creative Freedom" },
        { icon: Users, text: "Collaborative Team Environment" },
        { icon: Gamepad2, text: "Access to Development Builds" }
      ]
    },
    "sfx-audio-artist": {
      title: "SFX and Audio Artist",
      department: "Audio",
      location: "Remote",
      type: "Contractor",
      salary: "Project-Based / Hourly",
      description: "Elevate our immersive environments through sophisticated sound design. We are seeking a dedicated SFX and Audio Artist to engineer rich audioscapes and implement refined audio assets that meet exceptional AAA standards.",
      responsibilities: [
        "Design and integrate original audio assets for interactive events, interfaces, and environments.",
        "Edit and mix audio to guarantee optimal clarity across diverse hardware configurations.",
        "Coordinate with engineering teams to seamlessly implement audio into the engine.",
        "Oversee the sourcing and administration of audio libraries and vocal recordings."
      ],
      requirements: [
        "Proficiency with industry-standard DAWs (Reaper, Pro Tools, Ableton, etc.).",
        "A refined ear for how sophisticated audio enhances interactive media.",
        "Familiarity or willingness to master audio implementation middleware (FMOD, Wwise).",
        "A distinguished portfolio exhibiting advanced sound design capabilities."
      ],
      benefits: [
        { icon: Clock, text: "Flexible Contract Work" },
        { icon: Sparkles, text: "Credit on Shipped Titles" },
        { icon: Users, text: "Direct Collaboration with Devs" },
        { icon: Gamepad2, text: "Access to Development Builds" }
      ]
    },
    "photo-thumbnail-editor": {
      title: "Photo and Game Thumbnail Editor",
      department: "Art / Media",
      location: "Remote",
      type: "Contractor",
      salary: "Project-Based / Hourly",
      description: "Capture compelling visual assets. We require a talented editor to compose and edit outstanding in-game photography and promotional media. Your work will directly represent the quality of our studio across global platforms.",
      responsibilities: [
        "Capture sophisticated, high-fidelity visuals from within active development builds.",
        "Design and refine engaging promotional assets for social channels and storefronts.",
        "Execute advanced retouching and color-grading to maintain rigorous brand standards.",
        "Coordinate effectively with marketing personnel to meet strict deployment schedules."
      ],
      requirements: [
        "Advanced proficiency in digital editing software (Photoshop, Affinity Photo, etc.).",
        "An exceptional understanding of composition, color theory, and typographic design.",
        "Demonstrated familiarity with successful interactive media presentation.",
        "A comprehensive portfolio illustrating graphic design excellence."
      ],
      benefits: [
        { icon: Clock, text: "Flexible Contract Work" },
        { icon: Zap, text: "Creative Freedom" },
        { icon: Users, text: "Collaborative Team Environment" },
        { icon: Gamepad2, text: "Access to Development Builds" }
      ]
    },
    "community-manager": {
      title: "Community and Social Media Manager",
      department: "Community",
      location: "Remote",
      type: "Permanent",
      salary: "Competitive Entry-Level",
      description: "Serve as the primary liaison for our studio. We are searching for an articulate, professional Community Manager to cultivate our digital presence, moderate our platforms, and engage thoughtfully with our global audience.",
      responsibilities: [
        "Administer and expand our presence across major social media platforms.",
        "Draft professional and engaging public communications, devlogs, and announcements.",
        "Interact constructively with the audience, addressing inquiries and analyzing feedback.",
        "Coordinate organized community events and structured playtesting sessions."
      ],
      requirements: [
        "Extensive experience administering professional social media accounts.",
        "Exceptional written communication skills with a refined, professional tone.",
        "A comprehensive understanding of the interactive entertainment industry.",
        "Demonstrated ability to process feedback with professionalism and grace."
      ],
      benefits: [
        { icon: HeartPulse, text: "Health & Wellness Benefits" },
        { icon: Clock, text: "Flexible Working Hours" },
        { icon: Zap, text: "Hardware & Software Stipend" },
        { icon: Sparkles, text: "Career Growth Opportunities" }
      ]
    },
    "qa-playtester": {
      title: "QA Playtester",
      department: "Quality Assurance",
      location: "Remote",
      type: "Contract to Permanent",
      salary: "Hourly / Entry-Level",
      description: "Help us ensure our products are exceptionally polished. We are seeking detail-oriented Quality Assurance professionals to meticulously evaluate new builds, identify issues, and provide critical feedback to refine the user experience.",
      responsibilities: [
        "Methodically evaluate daily builds to identify defects, logical errors, and progression issues.",
        "Draft precise, articulate documentation to facilitate efficient engineering resolution.",
        "Provide structured feedback concerning product pacing, difficulty, and engagement.",
        "Conduct rigorous verification procedures on resolved defects."
      ],
      requirements: [
        "A profound dedication to the quality of interactive media.",
        "Exceptional analytical skills and meticulous attention to detail.",
        "The discipline to execute repetitive testing procedures effectively.",
        "Clear, professional communication skills for defect documentation."
      ],
      benefits: [
        { icon: Sparkles, text: "Entry into Professional Game Dev" },
        { icon: Clock, text: "Flexible Testing Hours" },
        { icon: Users, text: "Direct Impact on the Final Product" },
        { icon: Gamepad2, text: "Access to Development Builds" }
      ]
    }
  };

  const job = jobsData[jobId];

  // If job doesn't exist, redirect to careers page
  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  return (
    <>
      <PageMeta
          title={`${job.title} - Careers | Cheristral Studio`}
          description={`${job.title} at Cheristral Studio. ${job.location ?? ''} ${job.type ?? ''}`.trim()}
        />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Header */}
          <div className="bg-secondary/40 border-b border-border/50 pt-24 pb-16 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
              <Link to="/careers" className="inline-flex items-center text-primary hover:text-white font-bold tracking-widest uppercase mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Open Positions
              </Link>
              
              <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 mb-6 text-sm uppercase px-4 py-1 font-bold">
                  {job.department}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 text-glow">{job.title}</h1>
                
                <div className="flex flex-wrap gap-6 text-sm md:text-base text-foreground/80 font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> {job.location}</div>
                  <div className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> {job.type}</div>
                  <div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> {job.salary}</div>
                </div>
              </m.div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* Job Details Left */}
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-black uppercase tracking-wider mb-6 text-primary border-b border-border/50 pb-4">About the Role</h2>
                  <p className="text-lg text-foreground/80 leading-relaxed font-medium">{job.description}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-black uppercase tracking-wider mb-6 text-primary border-b border-border/50 pb-4">Key Responsibilities</h2>
                  <ul className="space-y-4">
                    {job.responsibilities.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/30">
                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                        <span className="font-medium text-foreground/90">{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-black uppercase tracking-wider mb-6 text-primary border-b border-border/50 pb-4">Qualifications</h2>
                  <ul className="space-y-4 text-foreground/80 font-medium list-disc list-inside px-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="marker:text-primary leading-relaxed">{req}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-black uppercase tracking-wider mb-6 text-primary border-b border-border/50 pb-4">Perks & Benefits</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {job.benefits.map((ben, idx) => {
                      const Icon = ben.icon;
                      return (
                        <div key={idx} className="flex items-center gap-4 bg-primary/5 border border-primary/20 p-4 rounded-xl">
                          <Icon className="h-6 w-6 text-primary" />
                          <span className="font-bold text-sm uppercase tracking-wide">{ben.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Application Form Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-card p-8 rounded-2xl border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                  
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-8 text-glow relative z-10">Submit Application</h3>

                  <div className="space-y-6 relative z-10">
                    <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                      Ready to join the team? Get in touch about <span className="text-primary font-bold">{job.title}</span> and share your details, CV and portfolio.
                    </p>

                    <FormCTAButton
                      url={APPLICATION_FORM_URL}
                      label="Apply Now"
                      icon={ArrowUpRight}
                      mailSubject={`Application: ${job.title}`}
                      mailBody={
                        `Role: ${job.title}\n\n` +
                        `Name:\n` +
                        `Portfolio or showreel:\n` +
                        `Relevant experience:\n` +
                        `Availability:\n\n` +
                        `(Attach your CV to this email.)`
                      }
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default JobDetailPage;
