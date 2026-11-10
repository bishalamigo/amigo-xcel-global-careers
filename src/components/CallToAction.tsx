import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { enquiryChoices, openCourseEnquiry, resolveCourseEnquiry } from "@/lib/academy";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().min(5, "Enter a valid phone number").max(50),
  service: z.string().trim().min(1, "Choose a course").max(200),
  message: z.string().trim().max(5000).optional(),
});
type ContactForm = z.infer<typeof contactSchema>;
const initialForm: ContactForm = { name: "", email: "", phone: "", service: "Help me choose", message: "" };
const fieldClass = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const CallToAction = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const choose = (event: Event) => {
      const course = resolveCourseEnquiry((event as CustomEvent<unknown>).detail);
      setForm((current) => ({ ...current, service: course }));
      setErrorMessage("");
      setSent(false);
      setShowModal(true);
    };
    window.addEventListener("academy:course", choose);
    return () => window.removeEventListener("academy:course", choose);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) { setErrorMessage(parsed.error.issues[0]?.message || "Please check the form."); return; }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const { error } = await supabase.from("contact_submissions").insert({ name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, service: parsed.data.service, message: parsed.data.message || null });
      if (error) throw error;
      setSent(true);
      setForm(initialForm);
      toast.success("Your course enquiry has been sent.");
    } catch {
      setErrorMessage("Your enquiry could not be sent. Please try again or email careers@amigoxcel.com.");
    } finally { setIsSubmitting(false); }
  };

  return <>
    <section id="placement" className="border-y border-border bg-background py-12 md:py-16">
      <div className="container mx-auto grid gap-8 px-5 md:grid-cols-2">
        <div><p className="text-sm font-semibold text-primary">After the course</p><h2 className="mt-3 font-editorial text-3xl md:text-4xl">Keep moving toward your next role.</h2></div>
        <div><p className="text-base leading-relaxed text-muted-foreground">Placement support is provided after class. Confirm the specific support, eligibility and time period for your chosen course before enrolling.</p><p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed">Support is not a guarantee of an interview or a job. No referrals or placement outcomes are promised here.</p></div>
      </div>
    </section>
    <section id="contact" className="bg-secondary/40 py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-5 text-center">
        <p className="text-sm font-semibold text-primary">Your next step</p>
        <h2 className="mt-3 font-editorial text-3xl md:text-4xl">Find Your Best Fit</h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">Tell us what you want to learn. Ask about the syllabus, mentors, schedule and placement support before you choose.</p>
        <Button size="lg" className="mt-6" onClick={() => openCourseEnquiry()}>Find Your Best Fit <ArrowRight className="h-4 w-4" /></Button>
        <p className="mt-4 text-sm text-muted-foreground">A course enquiry. No enrolment commitment.</p>
        <a className="mt-5 inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline" href="mailto:careers@amigoxcel.com"><Mail className="h-4 w-4" />careers@amigoxcel.com</a>
      </div>
    </section>
    <Dialog open={showModal} onOpenChange={(open) => { if (!isSubmitting) setShowModal(open); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg">
        <DialogHeader><DialogTitle>{sent ? "Enquiry sent" : "Find Your Best Fit"}</DialogTitle><DialogDescription>{sent ? "The team has your course enquiry. This is not a confirmed call booking." : "Ask about a course or get help choosing. The team will contact you using the details below."}</DialogDescription></DialogHeader>
        {sent ? <div role="status" className="py-5"><Check className="mb-4 h-8 w-8 text-primary" /><p>Thank you. For any follow-up, email <a href="mailto:careers@amigoxcel.com" className="text-primary underline">careers@amigoxcel.com</a>.</p><Button className="mt-6" onClick={() => setShowModal(false)}>Close</Button></div> :
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label htmlFor="contact-name" className="mb-2 block text-sm font-medium">Full name *</label><input id="contact-name" autoComplete="name" required maxLength={200} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} /></div>
            <div><label htmlFor="contact-email" className="mb-2 block text-sm font-medium">Email *</label><input id="contact-email" type="email" autoComplete="email" required maxLength={320} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldClass} /></div>
            <div><label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">Phone number *</label><input id="contact-phone" type="tel" autoComplete="tel" required maxLength={50} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={fieldClass} /></div>
            <div><label htmlFor="contact-service" className="mb-2 block text-sm font-medium">Course *</label><select id="contact-service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={fieldClass}>{enquiryChoices.map((course) => <option key={course} value={course}>{course}</option>)}</select></div>
            <div><label htmlFor="contact-message" className="mb-2 block text-sm font-medium">Your questions (optional)</label><textarea id="contact-message" maxLength={5000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={fieldClass} rows={3} placeholder="Your goals, preferred schedule or questions about the course" /></div>
            <p className="text-xs leading-relaxed text-muted-foreground">Your details are used to respond to this enquiry. Do not include sensitive personal information.</p>
            {errorMessage && <p role="alert" className="text-sm text-destructive">{errorMessage}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? "Sending…" : "Send Course Enquiry"}</Button>
          </form>}
      </DialogContent>
    </Dialog>
  </>;
};
export default CallToAction;
