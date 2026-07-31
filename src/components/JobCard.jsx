
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { m, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';

const JobCard = memo(({ id = "1", title, department, description, location = "Remote", type = "Full-time" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link to={`/careers/${id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
      <m.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className="group bg-card rounded-2xl p-8 border border-border/50 hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] flex flex-col h-full relative overflow-hidden gpu-accelerated will-change-transform"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
        
        <div className="flex-1 relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{title}</h3>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-3 py-1 text-sm uppercase font-bold tracking-wider">
              {department}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 font-medium">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {type}
            </div>
          </div>
          
          <p className="text-base text-card-foreground/80 mb-8 line-clamp-3">
            {description}
          </p>
        </div>
        
        <div className="mt-auto relative z-10">
          <Button className="w-full text-lg uppercase font-bold tracking-wider group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-shadow min-h-[44px]" size="lg">
            View Details
          </Button>
        </div>
      </m.div>
    </Link>
  );
});

JobCard.displayName = 'JobCard';
export default JobCard;
