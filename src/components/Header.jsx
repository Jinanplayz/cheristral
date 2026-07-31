
import React, { useState, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Header = memo(() => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
  ];

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  const handlePrefetch = useCallback((path) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)] will-change-transform gpu-accelerated">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          <Link to="/" className="flex items-center space-x-3 group min-h-[44px]">
            <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 rounded-xl overflow-hidden border border-primary/30 shadow-[0_0_10px_hsl(var(--primary)/0.2)] bg-black/50 will-change-transform">
               {logoFailed ? (
                 // Falls back to a monogram rather than a broken-image icon.
                 <span className="text-2xl font-black text-primary" aria-hidden="true">C</span>
               ) : (
                 <img
                   src="/logo.png"
                   alt="Cheristral Studio Logo"
                   width="48"
                   height="48"
                   loading="eager"
                   decoding="sync"
                   onError={() => setLogoFailed(true)}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                 />
               )}
            </div>
            <span className="text-xl md:text-2xl font-black uppercase tracking-[0.1em] text-glow transition-colors duration-300 group-hover:text-primary hidden sm:block">
              Cheristral Studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => handlePrefetch(link.path)}
                className={`px-5 py-3 min-h-[44px] min-w-[44px] flex items-center text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-sm relative overflow-hidden group ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full will-change-transform" />
                {link.name}
              </Link>
            ))}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary transition-colors min-h-[44px] min-w-[44px]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-border/50 bg-background/95 backdrop-blur-xl">
              <div className="flex flex-col h-full mt-10">
                <div className="mb-10 pl-4 border-l-2 border-primary">
                   <span className="text-sm font-black text-primary tracking-[0.2em] uppercase">Navigation</span>
                </div>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      className={`px-4 py-4 min-h-[44px] flex items-center text-lg font-black uppercase tracking-widest transition-colors duration-200 rounded-md border-l-2 ${
                        isActive(link.path)
                          ? 'text-primary border-primary bg-primary/10 pl-6'
                          : 'text-foreground/80 border-transparent hover:text-primary hover:bg-primary/5 hover:pl-6 hover:border-primary/50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
