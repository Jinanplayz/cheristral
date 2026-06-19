
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';

const DiscordIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M11.3 2.1c-1.8-.3-3.6.1-5.1 1.1-2.5 1.7-4.1 4.6-4.2 7.6v1.5c0 3.1 1.6 6 4.2 7.6 1.5 1 3.3 1.4 5.1 1.1 1.8.3 3.6-.1 5.1-1.1 2.5-1.7 4.1-4.6 4.2-7.6v-1.5c0-3.1-1.6-6-4.2-7.6-1.5-1-3.3-1.4-5.1-1.1z" />
  </svg>
));
DiscordIcon.displayName = 'DiscordIcon';

const TikTokIcon = memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
));
TikTokIcon.displayName = 'TikTokIcon';

const Footer = memo(() => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' }
  ];

  const socialLinks = [
    { name: 'Discord', icon: DiscordIcon, url: 'https://discord.gg/cheristralstudio' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/cheristral-studio' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/cheristralstudio' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://tiktok.com/@cheristralstudio' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/cheristralstudio' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@cheristralstudio' }
  ];

  return (
    <footer className="border-t border-border/50 bg-card text-card-foreground relative overflow-hidden will-change-transform">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-primary rounded-lg shadow-[0_0_15px_hsl(var(--primary)/0.5)] flex items-center justify-center">
                <span className="text-white font-black text-xl font-rajdhani">C</span>
              </div>
              <span className="text-2xl font-black uppercase tracking-widest text-glow">Cheristral Studio</span>
            </div>
            <p className="text-base text-card-foreground/70 max-w-md font-medium leading-relaxed">
              Crafting exceptional interactive experiences that push the boundaries of modern entertainment. We engineer sophisticated, immersive worlds that redefine industry standards.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="text-sm font-black tracking-widest uppercase mb-6 block text-primary">
              Navigation
            </span>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-base font-medium text-card-foreground/80 hover:text-primary transition-colors duration-200 flex items-center group py-1 min-h-[44px]">
                    <span className="w-0 h-px bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-sm font-black tracking-widest uppercase mb-6 block text-primary">
              Connect With Us
            </span>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center text-card-foreground/80 hover:text-primary hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-1 transition-all duration-300 will-change-transform gpu-accelerated">
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm font-medium text-card-foreground/50 uppercase tracking-wider">
              © {new Date().getFullYear()} Cheristral Studio. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link to="#" className="text-sm font-bold uppercase tracking-wider text-card-foreground/50 hover:text-primary transition-colors duration-200 min-h-[44px] flex items-center">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm font-bold uppercase tracking-wider text-card-foreground/50 hover:text-primary transition-colors duration-200 min-h-[44px] flex items-center">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
