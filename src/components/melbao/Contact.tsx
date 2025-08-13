import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks!",
      description: "We received your message and will get back to you soon.",
    });
  };

  const onNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "Subscribed", description: "You're on the list for menu updates." });
    setEmail("");
  };

  return (
    <section id="contact" className="container py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Get in touch</h2>
          <p className="mt-2 text-muted-foreground">Questions or orders? Send us a note below.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4 max-w-md">
            <Input placeholder="Your name" aria-label="Your name" required />
            <Input type="email" placeholder="Email" aria-label="Email" required />
            <Textarea placeholder="Your message" aria-label="Your message" required />
            <Button type="submit" variant="hero">Send</Button>
          </form>

          <div className="mt-10 max-w-md">
            <h3 className="font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Get menu updates and special offers.</p>
            <form onSubmit={onNewsletter} className="mt-3 flex gap-2">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" aria-label="Your email" />
              <Button type="submit" variant="secondary">Join</Button>
            </form>
          </div>

          <div className="mt-8 text-sm">
            <p>
              Pickup: Los Altos, CA. Local delivery available.
            </p>
            <div className="flex gap-4 mt-2">
              <a className="underline" href="#">Instagram</a>
              <a className="underline" href="#">Facebook</a>
            </div>
          </div>
        </div>
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted">
            <iframe
              title="Map of Los Altos"
              src="https://www.google.com/maps?q=Los%20Altos%2C%20CA&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
