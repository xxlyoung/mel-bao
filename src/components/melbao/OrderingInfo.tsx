import { Button } from "@/components/ui/button";

const OrderingInfo = () => {
  return (
    <section id="order" className="container py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Ordering & Hours</h2>
          <p className="mt-2 text-muted-foreground">
            Fresh daily in limited quantities. Pickup in Los Altos; local delivery available with insulated packaging.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Sun</h3>
              <p className="text-muted-foreground">8am–8pm (20 meals)</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Mon–Thu</h3>
              <p className="text-muted-foreground">8am–12pm (10 meals)</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Fri</h3>
              <p className="text-muted-foreground">8am–6pm (10 meals)</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Sat</h3>
              <p className="text-muted-foreground">8am–8pm (20 meals)</p>
            </div>
          </div>
          <a href="#contact" className="inline-block mt-6"><Button variant="hero">Order Now</Button></a>
        </div>
        <div className="rounded-lg border p-5 bg-card">
          <p className="text-sm text-muted-foreground">
            Compliance & Trust: Made in a Home Kitchen. Permitted by Santa Clara County Department of Environmental Health.
            Permit #: TBD
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderingInfo;
