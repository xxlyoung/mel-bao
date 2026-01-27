import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GOOGLE_SHEETS_URL, SHEETS_ENABLED } from "@/config/sheets";

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    
    try {
      if (SHEETS_ENABLED) {
        // Submit to Google Sheets using sendBeacon for reliable cross-origin POST
        const contactData = {
          type: 'contact',
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(contactData)], { type: 'text/plain' });
        navigator.sendBeacon(GOOGLE_SHEETS_URL, blob);
      } else {
        // Demo mode
        console.log("Contact form (demo):", { name, email, message });
      }
      
      toast({
        title: "Thanks!",
        description: "We received your message and will get back to you soon."
      });

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Oops!",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Get in touch</h2>
          <p className="mt-2 text-muted-foreground">Questions or orders? Send us a note below.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4 max-w-md">
            <Input
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              required
            />
            <Input
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Email"
              required
            />
            <Textarea
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your message"
              aria-label="Your message"
              required
            />
            <Button type="submit" variant="playful" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>

          <div className="mt-8 text-sm">
            <p>Pickup: Los Altos, CA. Local delivery only available when inquired.</p>
            <div className="flex gap-4 mt-2">
              <a
                className="underline"
                href="https://www.instagram.com/mel__bao/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
