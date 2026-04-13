import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      // TODO: Add backend integration (e.g., Vercel serverless function with email service)
      console.log("Contact form submitted:", { name, email, message });

      toast({
        title: "Thanks!",
        description: "We received your message and will get back to you soon.",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Oops!",
        description:
          "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container py-16 md:py-24">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl md:text-4xl">Get in touch</h2>
        <p className="mt-2 text-muted-foreground">
          Questions about our buns or custom orders? Send us a note.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            required
          />
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            required
          />
          <Textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            aria-label="Your message"
            required
          />
          <Button type="submit" variant="playful" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </form>

        <div className="mt-8 text-sm text-muted-foreground space-y-2">
          <p>Pickup: Los Altos, CA</p>
          <a
            className="underline hover:text-foreground transition-colors"
            href="https://www.instagram.com/mel__bao/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mel__bao on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
