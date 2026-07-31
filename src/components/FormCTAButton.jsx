import React, { memo } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isConfigured, buildMailto } from '@/lib/formLinks.js';

/**
 * Call-to-action button that never dead-ends.
 *
 * Order of preference:
 *   1. `url` (a Google Form), if one is configured
 *   2. a pre-addressed mailto built from CONTACT_EMAIL
 *   3. disabled, only if neither exists
 *
 * @param url           form link from formLinks.js, may be empty
 * @param label         button text
 * @param mailSubject   subject line for the email fallback
 * @param mailBody      optional pre-filled body, e.g. prompts for an applicant
 */
const FormCTAButton = memo(({
  url,
  label,
  icon: Icon = ArrowUpRight,
  mailSubject = 'Enquiry via cheristral.com',
  mailBody = '',
}) => {
  const formReady = isConfigured(url);
  const mailto = formReady ? '' : buildMailto(mailSubject, mailBody);

  const href = formReady ? url : mailto;
  const ActiveIcon = formReady ? Icon : Mail;

  if (!href) {
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
          Contact details coming soon
        </p>
      </div>
    );
  }

  // mailto: must not open in a new tab, or some browsers leave a blank window behind.
  const isMail = href.startsWith('mailto:');

  return (
    <Button
      asChild
      className="w-full text-lg uppercase font-bold tracking-widest h-14 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all group"
    >
      <a
        href={href}
        target={isMail ? undefined : '_blank'}
        rel={isMail ? undefined : 'noopener noreferrer'}
      >
        <span className="flex items-center justify-center">
          {label}
          <ActiveIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </span>
      </a>
    </Button>
  );
});

FormCTAButton.displayName = 'FormCTAButton';

export default FormCTAButton;
