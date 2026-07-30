
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import { Target, Users, Zap, ShieldAlert } from 'lucide-react';
import { heroes } from '@/lib/images';

const AboutPage = () => {

  const values = [{
    icon: Target,
    title: 'Player-Centric Design',
    description: 'Every experience we create is designed with the player in mind. We develop sophisticated mechanics that respect our audience\'s time and reward deep engagement.'
  }, {
    icon: Users,
    title: 'Collaborative Excellence',
    description: 'Outstanding achievements stem from unified teams. We cultivate an environment that prioritizes creative excellence and open collaboration over corporate hierarchy.'
  }, {
    icon: Zap,
    title: 'Continuous Innovation',
    description: 'We continuously push the boundaries of the medium, leveraging emerging technologies to deliver remarkably fresh and engaging experiences.'
  }, {
    icon: ShieldAlert,
    title: 'Uncompromising Quality',
    description: 'Our releases meet rigorous standards of excellence. Meticulous polish and exceptional attention to detail are the signatures of our studio.'
  }];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Helmet>
        <title>Intel - Cheristral Studio</title>
        <meta name="description" content="Learn about Cheristral Studio's mission, values, and commitment to creating exceptional gaming experiences." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <HeroSection 
            backgroundImage={heroes.about} 
            title="OUR STUDIO" 
            subtitle="Architecting the future of interactive entertainment through distinguished design and technical excellence." 
          />

          {/* Studio Story */}
          <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.7 }} 
                  className="bg-card/50 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                  <h2 className="text-4xl md:text-5xl font-black mb-10 uppercase text-glow">Our History</h2>
                  
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-8 text-lg text-foreground/80 leading-relaxed font-medium"
                  >
                    {/* Founder Introduction */}
                    <motion.div variants={itemVariants} className="relative pl-6 border-l-2 border-primary/50">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider mb-2">Foundation</h3>
                      <p>
                        Established in January 2025, Cheristral Studio was founded by Ahnaf Saleque Jinan, serving as CEO and Lead Producer. Driven by a distinct vision to elevate interactive entertainment, he collaborated with Abdullah Al-Nahian and Abdullah Ibn Mahmud to form the core architectural team dedicated to developing exceptionally sophisticated titles.
                      </p>
                    </motion.div>

                    {/* Team Expansion */}
                    <motion.div variants={itemVariants} className="relative pl-6 border-l-2 border-primary/50">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider mb-2">Operational Expansion</h3>
                      <p>
                        By May 2025, the studio advanced into active development. To reinforce our infrastructure and guarantee exceptional quality, the organization expanded to welcome Arashuzzaman Khan managing Public Relations, alongside Al-Hasin Mahtab driving Quality Assurance. This strategic growth established a rigorous foundation for future developments.
                      </p>
                    </motion.div>

                    {/* Mission Statement */}
                    <motion.div variants={itemVariants} className="relative pl-6 border-l-2 border-primary/50">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider mb-2">Core Mission</h3>
                      <p>
                        Our mission remains absolute: to engineer distinguished, highly engaging interactive experiences that deeply resonate with our audience. We are committed to pushing creative boundaries, integrating sophisticated mechanics, and delivering outstanding quality that establishes a lasting legacy.
                      </p>
                    </motion.div>

                    {/* Ambitious Goals */}
                    <motion.div variants={itemVariants} className="relative pl-6 border-l-2 border-primary/50">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider mb-2">Future Trajectory</h3>
                      <p>
                        Looking forward, our strategic trajectory is focused on significant global impact. We are committed to establishing Cheristral Studio as an acclaimed, progressive force within the international interactive entertainment industry.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="py-24 bg-secondary/30 border-y border-border/30 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-glow">Operating Directives</h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-medium">
                  The strict parameters that dictate our internal methodology, from sophisticated architecture to a collaborative team environment.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 30 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 0.5, delay: index * 0.1 }} 
                      className="group bg-card rounded-2xl p-8 border border-border/50 hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
                    >
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                            <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">{value.title}</h3>
                          <p className="text-base text-card-foreground/70 font-medium leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-32 relative overflow-hidden">
            {/* Stable Background Container */}
            {/* Faint texture at 5% opacity. Lazy-loaded, so it costs nothing
                up front and needs no JavaScript to appear. */}
            <img
              src={heroes.texture}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-5 mix-blend-screen pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-glow">Get In Touch</h2>
                  <p className="text-lg text-foreground/70 font-medium">
                    Have an inquiry? Contact our team through the secure channel below. We aim to respond within 24-48 hours.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.2 }}
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
