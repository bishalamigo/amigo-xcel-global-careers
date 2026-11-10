const faqs = [
  { question: "Which course should I choose?", answer: "Choose AI-Powered Tech Recruitment if you want to build recruitment skills. Choose Digital Marketing if that is the field you want to explore. Ask for the syllabus and mentor details before deciding." },
  { question: "How long are the courses?", answer: "AI-Powered Tech Recruitment runs for 2 months. The Digital Marketing duration is being confirmed. Ask about the next start date, class format and weekly commitment." },
  { question: "Will I get a guaranteed job?", answer: "No. Placement support is provided after the course, but it does not guarantee an interview, job offer or employment. Ask which support activities are included for your course before enrolling." },
  { question: "Who teaches the courses?", answer: "Experienced mentors and recruiters. Request the assigned mentor’s background and relevant experience when you enquire." },
  { question: "What happens when I enquire?", answer: "Your enquiry is sent to the team so they can help with course selection and details. It is not an enrolment or a confirmed call booking." },
];

const AcademyFaq = () => (
  <section id="faq" className="bg-background py-12 md:py-16">
    <div className="container mx-auto grid gap-8 px-5 md:grid-cols-[0.7fr_1.3fr]">
      <div><p className="mb-3 text-sm font-semibold text-primary">Common questions</p><h2 className="font-editorial text-3xl md:text-4xl">Before you decide.</h2></div>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold">{faq.question}<span className="shrink-0 text-primary group-open:rotate-45">+</span></summary><p className="pt-4 text-base leading-relaxed text-muted-foreground">{faq.answer}</p></details>)}
      </div>
    </div>
  </section>
);

export default AcademyFaq;
