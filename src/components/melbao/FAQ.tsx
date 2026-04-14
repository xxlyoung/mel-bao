import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What's the best way to reheat?",
    answer:
      "We recommend steaming from frozen (approximately 8–12 minutes). You may also thaw overnight in the refrigerator and steam for 5–8 minutes.",
  },
  {
    question: "Can I microwave them?",
    answer:
      "Microwaving is possible, but results may vary. For best texture, cover with a damp paper towel. Steaming is recommended.",
  },
  {
    question: "How long do the baos last if I keep them frozen?",
    answer:
      "If kept frozen, our baos are generally best enjoyed within 1–2 months for optimal flavor and texture. Storage times are recommendations for best quality. As with any food, please use your judgment and do not consume if there are signs of spoilage.",
  },
  {
    question: "Do you freeze the baos before giving them to us?",
    answer:
      "Yes. After making each batch, we freeze the baos to help maintain freshness until you are ready to reheat and enjoy.",
  },
  {
    question: "Are your baos gluten-free?",
    answer:
      "Our baos are not gluten-free at the moment, but we make them with the highest quality organic ingredients. We may consider offering a gluten-free version in the future if there's enough interest — let us know if that's something you'd love to see!",
  },
  {
    question: "How many baos are in each pack?",
    answer:
      "Each pack includes 10 kid-sized baos. Since every bao is handmade, the size may vary slightly. Check out our IG posts for a size reference!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl md:text-4xl mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know about our baos.
        </p>
      </div>

      <div className="max-w-3xl space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-xl border overflow-hidden transition-colors ${
                isOpen ? "bg-card" : "bg-background hover:bg-card/50"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div
                  className="w-1 self-stretch rounded-full shrink-0 bg-border"
                />
                <span className="font-display text-base md:text-lg font-medium flex-1">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-10">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
