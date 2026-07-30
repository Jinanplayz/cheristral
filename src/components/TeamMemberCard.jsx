
import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';


const TeamMemberCard = memo(({ photo, name, position, description }) => {
  const shouldReduceMotion = useReducedMotion();
  const optimizedPhoto = photo;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.4 }}
      className="group bg-secondary/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/70 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)] flex flex-col items-center text-center h-full gpu-accelerated will-change-transform"
    >
      <div className="relative w-32 h-32 mb-6 shrink-0">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 group-hover:border-primary group-hover:scale-110 transition-all duration-500 will-change-transform" />
        <div className="absolute inset-2 overflow-hidden rounded-full bg-muted shadow-inner">
          {optimizedPhoto ? (
            <img 
              src={optimizedPhoto}
              width="112"
              height="112"
              alt={name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-background">
              <span className="text-5xl font-black text-primary/40">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-2xl font-black uppercase tracking-wide mb-1 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">{position}</p>
        {description && (
          <p className="text-base text-foreground/70 line-clamp-4 leading-relaxed mt-auto">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';
export default TeamMemberCard;
