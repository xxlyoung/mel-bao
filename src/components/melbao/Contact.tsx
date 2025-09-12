import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
const Contact = () => {
  const {
    toast
  } = useToast();
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
      const {
        error
      } = await supabase.from('contact_messages').insert([{
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      }]);
      if (error) throw error;
      toast({
        title: "Thanks!",
        description: "We received your message and will get back to you soon."
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
      const {
        error
      } = await supabase.from('newsletter_subscribers').insert([{
        email: email.trim()
      }]);
      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already on our newsletter list."
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
  return <section id="contact" className="container h-full flex items-center py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Get in touch</h2>
          <p className="mt-2 text-muted-foreground">Questions or orders? Send us a note below.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4 max-w-md">
            <Input name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" aria-label="Your name" required />
            <Input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" aria-label="Email" required />
            <Textarea name="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message" aria-label="Your message" required />
            <Button type="submit" variant="playful" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>

          <div className="mt-10 max-w-md">
            
            
            
          </div>

          <div className="mt-8 text-sm">
            <p>Pickup: Los Altos, CA. Local delivery only available when inquired.</p>
            <div className="flex gap-4 mt-2">
              <a className="underline" href="https://www.instagram.com/mel__bao/" target="_blank" rel="noopener noreferrer">Instagram</a>
              
            </div>
          </div>
        </div>
        
      </div>
    </section>;
};
export default Contact;