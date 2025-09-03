import { Button } from "@/components/ui/button";

const OrderingInfo = () => {
  return (
    <section id="order" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl md:text-4xl">Order Your Buns</h2>
        <p className="text-muted-foreground mt-2">
          Fresh buns made to order. Each package contains 15 pieces for $12. Pickup available Monday-Sunday, 5-7pm.
        </p>
      </div>
    </section>
  );
};

export default OrderingInfo;