const faqs = [
  { question: "Which course should I pick?", answer: <>Ages 10-16 → Tech Ready Kids<br />Graduating → Ready Before Your Batch<br />Job hunting → Resume Optimization<br />Want deeper mastery → 2-Month Certification</> },
  { question: "Can I move between courses?", answer: "Yes. Start with one and upgrade anytime. We guide you through the next step." },
  { question: "Are these live or recorded?", answer: "A mix of both, depending on the course, with flexibility for your schedule." },
];

const AcademyFaq = () => (
  <section id="faq" className="bg-background py-16 md:py-24">
    <div className="container mx-auto grid gap-10 px-5 md:grid-cols-[0.7fr_1.3fr]">
      <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Common questions</p><h2 className="font-editorial text-3xl font-semibold md:text-4xl">Choose with confidence.</h2></div>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none font-display text-lg font-semibold">{faq.question}<span className="float-right text-primary group-open:rotate-45">+</span></summary><div className="pt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</div></details>)}
      </div>
    </div>
  </section>
);

export default AcademyFaq;