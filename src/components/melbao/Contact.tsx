import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: name.trim(),
            email: email.trim(),
            message: message.trim()
          }
        ]);

      if (error) throw error;

      toast({
        title: "Thanks!",
        description: "We received your message and will get back to you soon.",
      });
      
      // Clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error('Error saving contact message:', error);
      toast({
        title: "Oops!",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.trim()
          }
        ]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already on our newsletter list.",
          });
        } else {
          throw error;
        }
      } else {
        toast({ 
          title: "Subscribed", 
          description: "You're on the list for menu updates." 
        });
      }
      
      setEmail("");
    } catch (error) {
      console.error('Error saving newsletter subscription:', error);
      toast({
        title: "Oops!",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubscribing(false);
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
            <Button 
              type="submit" 
              variant="hero" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>

          <div className="mt-10 max-w-md">
            <h3 className="font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Get menu updates and special offers.</p>
            <form onSubmit={onNewsletter} className="mt-3 flex gap-2">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" aria-label="Your email" />
              <Button 
                type="submit" 
                variant="secondary"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Joining..." : "Join"}
              </Button>
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
