/* eslint-disable react/no-unknown-property --
   fetchpriority must be lowercase: react-dom 18 does not know the camelCase
   version and silently drops it. */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import { heroes } from '@/lib/images';

const HeroSection = memo(({
  backgroundImage,
  title,
  subtitle,
  ctaText,
  ctaLink,
  superTitle = "CHERISTRAL STUDIO",
  // Set priority on the first hero of a page so the browser fetches it
  // immediately instead of treating it as a lazy, low-priority image.
  priority = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const src = backgroundImage || heroes.team;

  const animationProps = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.4 }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden gpu-accelerated">
      {/*
        A real <img>, not a CSS background applied by JavaScript.
        The old version waited for the JS bundle to load, React to mount, and an
        effect to run before the image request even started. This version is
        visible to the browser as soon as the markup exists.
      */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        fetchpriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center bg-[hsl(var(--image-placeholder-bg))]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {superTitle && (
            <motion.h2
              {...animationProps}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-[0.15em] mt-12 mb-10 will-change-transform"
              style={{
                WebkitTextStroke: '2px black',
                textShadow: '4px 4px 0px #000, 0 0 30px hsl(var(--primary)/0.6)'
              }}
            >
              {superTitle}
            </motion.h2>
          )}

          <motion.h1
            {...animationProps}
            transition={{ ...animationProps.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] will-change-transform"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              {...animationProps}
              transition={{ ...animationProps.transition, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="text-lg md:text-xl text-foreground/90 mb-8 mx-auto font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] max-w-2xl will-change-transform"
            >
              {subtitle}
            </motion.p>
          )}

          {ctaText && ctaLink && (
            <motion.div
              {...animationProps}
              transition={{ ...animationProps.transition, delay: shouldReduceMotion ? 0 : 0.3 }}
              className="will-change-transform"
            >
              <Button asChild size="lg" className="text-lg font-bold tracking-widest uppercase rounded-none border-2 border-primary bg-primary/20 text-white hover:bg-primary hover:text-white transition-colors shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] h-14 min-w-[44px] px-10 backdrop-blur-sm">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
