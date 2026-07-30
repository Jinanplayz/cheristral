
import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Download, Star, Calendar } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cards } from '@/lib/images';

const ProjectCard = memo(({ id = "1", title, image, downloads, rating, releaseDate, description, tags }) => {
  const fallbackImage = cards.fallback;
  const [imgSrc, setImgSrc] = useState(image);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackImage);
      setHasError(true);
    }
  };


  return (
    <Link to={`/projects/${id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary transition-colors duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] relative z-10 will-change-transform gpu-accelerated"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-primary/10 to-transparent transition-opacity duration-300 pointer-events-none" />

        <div className="relative h-64 bg-muted overflow-hidden border-b border-border/50 group-hover:border-primary/50 transition-colors image-placeholder">
          <img 
            src={imgSrc}
            alt={`Screenshot of ${title} game project`} 
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform image-fade-in ${isLoaded ? 'loaded' : ''}`} 
          />
          
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-primary/50 rounded-full px-3 py-1 flex items-center gap-1 text-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
            <Star className="h-4 w-4 fill-primary" />
            <span className="font-bold">{rating}</span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 group-hover:text-primary transition-colors duration-300 uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-base text-card-foreground/70 mb-6 line-clamp-3 flex-grow">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm font-semibold text-card-foreground/80 bg-secondary/50 p-4 rounded-xl border border-border/30">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              <span className="text-lg">{downloads}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-lg">{releaseDate}</span>
            </div>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-background/50 border-primary/20 text-foreground group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
});

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;
