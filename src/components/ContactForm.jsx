import React, { memo } from 'react';
import { Send } from 'lucide-react';
import FormCTAButton from '@/components/FormCTAButton.jsx';
import { CONTACT_FORM_URL } from '@/lib/formLinks.js';

// Contact "form" is now a CTA that opens an external Google Form.
// Edit the link in src/lib/formLinks.js (CONTACT_FORM_URL).
const ContactForm = memo(() => {
  return (
    <div className="bg-card p-8 md:p-10 rounded-2xl border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.15)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-6 text-center">
        <p className="text-base text-foreground/70 font-medium">
          Click below to open our secure contact form. We aim to respond within 24-48 hours.
        </p>

        <FormCTAButton
          url={CONTACT_FORM_URL}
          label="Open Contact Form"
          icon={Send}
        />
      </div>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
