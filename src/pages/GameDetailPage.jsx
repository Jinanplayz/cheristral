/* eslint-disable react/no-unknown-property -- lowercase fetchpriority is deliberate. */
import React from 'react';
import PageMeta from '@/components/PageMeta.jsx';
import { useParams, Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, Monitor, Gamepad2, Download, Star, Users, Globe, Settings, Terminal, Shield, Tags } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ImageGallery from '@/components/ImageGallery.jsx';
import { cards, galleries } from '@/lib/images';
import { Button } from '@/components/ui/button';

const GameDetailPage = () => {
  const { gameId } = useParams();

  const projectsData = {
    "upcoming-1": {
      title: "UPCOMING",
      tagline: "In Active Development",
      description: "A sophisticated psychological horror experience currently in development, seamlessly integrating atmospheric storytelling with intense action mechanics and compelling adventure elements.",
      coverImage: cards.game01,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Safe placeholder
      tags: ['Horror', 'Psychological', 'Action', 'Adventure'],
      stats: {
        downloads: "1K",
        rating: "5.0/5",
        players: "TBA",
        platforms: "PC, PS5, XSX",
        engine: "Unreal 5",
        release: "2026",
        metacritic: "TBA"
      },
      screenshots: galleries.game01,
      features: [
        "Advanced psychological horror design",
        "Atmospheric, tension-driven narrative structure",
        "High-fidelity environments engineered in Unreal Engine 5",
        "Sophisticated action and adventure progression"
      ],
      requirements: {
        min: { os: "Windows 10 64-bit", cpu: "Core i5-10400 / Ryzen 5 3600", ram: "16 GB", gpu: "RTX 2060 / RX 5600 XT", storage: "100 GB SSD" },
        rec: { os: "Windows 11 64-bit", cpu: "Core i7-12700K / Ryzen 7 5800X3D", ram: "32 GB", gpu: "RTX 4070 / RX 7800 XT", storage: "100 GB NVMe SSD" }
      }
    },
    "upcoming-2": {
      title: "UPCOMING",
      tagline: "In Active Development",
      description: "A gripping psychological thriller in active development, combining horror elements with fast-paced action and sophisticated adventure gameplay.",
      coverImage: cards.game02,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Safe placeholder
      tags: ['Horror', 'Psychological', 'Thriller', 'Action'],
      stats: {
        downloads: "1K",
        rating: "5.0/5",
        players: "TBA",
        platforms: "PC, PS5, XSX",
        engine: "Unreal 5",
        release: "2026",
        metacritic: "TBA"
      },
      screenshots: galleries.game02,
      features: [
        "Compelling psychological thriller narrative",
        "Refined action and sophisticated gameplay mechanics",
        "Dynamic logic that adapts to player decisions",
        "Exceptional immersive audio design"
      ],
      requirements: {
        min: { os: "Windows 10 64-bit", cpu: "Core i5-10400 / Ryzen 5 3600", ram: "16 GB", gpu: "RTX 2060 / RX 5600 XT", storage: "100 GB SSD" },
        rec: { os: "Windows 11 64-bit", cpu: "Core i7-12700K / Ryzen 7 5800X3D", ram: "32 GB", gpu: "RTX 4070 / RX 7800 XT", storage: "100 GB NVMe SSD" }
      }
    }
  };

  const game = projectsData[gameId] || projectsData["upcoming-1"];

  return (
    <>
      <PageMeta title={`${game.title} - Cheristral Studio`} description={game.description} image={game.coverImage} />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Header */}
          <div className="relative h-[70vh] w-full flex items-end pb-20 overflow-hidden">
            {/* Stable Background Container */}
            <img
              src={game.coverImage}
              alt=""
              aria-hidden="true"
              fetchpriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 z-0 w-full h-full object-cover object-center bg-[hsl(var(--image-placeholder-bg))]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-0" />
            
            <div className="container mx-auto px-4 relative z-10 w-full">
              <Link to="/projects" className="inline-flex items-center text-primary hover:text-white font-bold tracking-widest uppercase mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" /> Return to Database
              </Link>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="will-change-transform"
              >
                <m.h2 
                  className="text-3xl md:text-4xl font-black text-primary uppercase tracking-[0.15em] mt-12 mb-10" 
                  style={{ WebkitTextStroke: '1.5px black', textShadow: '3px 3px 0px #000, 0 0 20px hsl(var(--primary)/0.6)' }}
                >
                  CHERISTRAL STUDIO
                </m.h2>
                <h1 className="text-6xl md:text-8xl font-black text-white text-glow mb-4 uppercase">{game.title}</h1>
                <p className="text-2xl md:text-3xl font-bold text-primary tracking-widest uppercase">{game.tagline}</p>
              </m.div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* Main Content Left */}
              <div className="lg:col-span-2 space-y-16">
                
                {/* Trailer Embed */}
                <m.section 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "50px" }}
                  className="rounded-2xl overflow-hidden border border-border/50 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-card will-change-transform"
                >
                  <div className="aspect-video relative">
                    <iframe 
                      src={game.videoUrl} 
                      title={`${game.title} Trailer`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </m.section>

                {/* Description & Features */}
                <section className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-primary border-b border-border/50 pb-4">Project Overview</h2>
                    <p className="text-lg text-foreground/80 leading-relaxed mb-6">{game.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {game.tags.map((tag, idx) => (
                        <span key={idx} className="bg-secondary/50 border border-border/50 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-4">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {game.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-secondary/50 p-4 rounded-lg border border-border/30">
                          <Terminal className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <span className="font-medium text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Image Gallery */}
                <section>
                  <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-primary border-b border-border/50 pb-4">Media Gallery</h2>
                  <ImageGallery images={game.screenshots} />
                </section>

                {/* System Reqs */}
                <section>
                  <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-primary border-b border-border/50 pb-4">System Requirements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Min Reqs */}
                    <div className="bg-card border border-border/50 p-6 rounded-xl">
                      <h4 className="text-lg font-bold uppercase text-muted-foreground mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5" /> Minimum
                      </h4>
                      <dl className="space-y-3 text-sm">
                        {Object.entries(game.requirements.min).map(([k, v]) => (
                          <div key={k} className="flex flex-col border-b border-border/30 pb-2">
                            <dt className="uppercase text-primary/70 font-bold tracking-wider text-xs">{k}</dt>
                            <dd className="font-medium text-foreground">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    {/* Rec Reqs */}
                    <div className="bg-primary/5 border border-primary/30 p-6 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
                      <h4 className="text-lg font-bold uppercase text-primary mb-4 flex items-center gap-2">
                        <Monitor className="h-5 w-5" /> Recommended
                      </h4>
                      <dl className="space-y-3 text-sm relative z-10">
                        {Object.entries(game.requirements.rec).map(([k, v]) => (
                          <div key={k} className="flex flex-col border-b border-primary/20 pb-2">
                            <dt className="uppercase text-primary font-bold tracking-wider text-xs">{k}</dt>
                            <dd className="font-medium text-foreground">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar Stats & CTA */}
              <div className="space-y-8 lg:sticky lg:top-24 h-fit">
                
                {/* Actions */}
                <div className="bg-card p-6 rounded-2xl border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.1)] space-y-4">
                  <Button size="lg" className="w-full text-lg uppercase font-bold tracking-widest h-16 shadow-[0_0_20px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all">
                    Register for Beta Access
                  </Button>
                  <Button variant="outline" size="lg" className="w-full text-lg uppercase font-bold tracking-widest h-16 border-border/50 hover:bg-secondary">
                    Wishlist on Steam
                  </Button>
                </div>

                {/* Dashboard Stats */}
                <div className="bg-secondary/30 p-6 rounded-2xl border border-border/50">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-6 border-b border-border/50 pb-4">Project Metrics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-xl border border-border/30">
                      <Tags className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Release</p>
                      <p className="text-xl font-black text-glow">{game.stats.release}</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-border/30">
                      <Star className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">User Rating</p>
                      <p className="text-xl font-black">{game.stats.rating}</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-border/30">
                      <Download className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Downloads</p>
                      <p className="text-xl font-black">{game.stats.downloads}</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-border/30">
                      <Gamepad2 className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Platforms</p>
                      <p className="text-sm font-bold mt-1">{game.stats.platforms}</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-border/30">
                      <Settings className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Engine</p>
                      <p className="text-sm font-bold mt-1">{game.stats.engine}</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-border/30">
                      <Globe className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Metascore</p>
                      <p className="text-xl font-black text-muted-foreground">{game.stats.metacritic}</p>
                    </div>
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

export default GameDetailPage;
