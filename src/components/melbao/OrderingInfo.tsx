import OrderForm from "./OrderForm";

const OrderingInfo = () => {
  return (
    <section id="order" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl md:text-4xl">Checkout</h2>
        <p className="text-muted-foreground mt-2">
          Review your order, fill in your details, and pay securely with Stripe.
        </p>
      </div>
      <OrderForm />
    </section>
  );
};

export default OrderingInfo;
