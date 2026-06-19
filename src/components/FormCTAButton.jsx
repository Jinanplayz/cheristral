import React, { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isConfigured } from '@/lib/formLinks.js';

// A button that opens an external Google Form in a new tab.
// While the link is empty (not yet configured), it renders disabled with a note.
const FormCTAButton = memo(({ url, label, icon: Icon = ArrowUpRight }) => {
  const ready = isConfigured(url);

  if (!ready) {
    return (
      <div className="space-y-2">
        <Button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full text-lg uppercase font-bold tracking-widest h-14 cursor-not-allowed"
        >
          {label}
        </Button>
        <p className="text-xs text-muted-foreground text-center uppercase tracking-wider">
          Form link coming soon
        </p>
      </div>
    );
  }

  return (
    <Button
      asChild
      className="w-full text-lg uppercase font-bold tracking-widest h-14 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all group"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <span className="flex items-center justify-center">
          {label}
          <Icon className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </span>
      </a>
    </Button>
  );
});

FormCTAButton.displayName = 'FormCTAButton';

export default FormCTAButton;
