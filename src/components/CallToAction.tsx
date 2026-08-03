import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  X,
  Mail,
  User,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().min(5, "Enter a valid phone number").max(50),
  service: z.string().trim().min(1, "Tell us what you need").max(200),
  message: z.string().trim().max(5000).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const CallToAction = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ContactForm>(initialForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please check the form");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: parsed.data.service,
        message: parsed.data.message || null,
      });

      if (error) throw error;

      toast.success("Thanks! We'll reply from careers@amigoxcel.com within 24 hours.");
      setForm(initialForm);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please email careers@amigoxcel.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="py-28 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          {/* Main CTA */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Let's Build
              <span className="block bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                What's Next.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 font-light leading-relaxed">
              Whether you're starting out or scaling up, we bring the pieces together
              so your business moves forward, faster.
            </p>
          </div>

          {/* Single primary CTA card */}
          <div className="max-w-xl mx-auto mb-16">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Book a Free Strategy Call</h3>
                <p className="text-slate-300">
                  Tell us where you are. We'll show you what's possible.
                </p>
                <ul className="space-y-2 text-sm text-left max-w-sm mx-auto">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>15-minute discovery call, no pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Tailored growth recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Reply within 24 hours from careers@amigoxcel.com</span>
                  </li>
                </ul>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setShowModal(true)}
                >
                  Book Your Free Call
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Global Reach */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Serving businesses worldwide</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm opacity-80 max-w-3xl mx-auto">
              {[
                "Australia",
                "United States",
                "United Kingdom",
                "Canada",
                "Singapore",
                "India",
                "Nepal",
                "Philippines",
              ].map((c) => (
                <span
                  key={c}
                  className="bg-white/10 px-4 py-2 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-background text-foreground rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold">Book a Free Strategy Call</h2>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  maxLength={320}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={50}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Service Inquiry For *
                </label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g. Talent, Technology, Training, Media"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Your Message
                </label>
                <textarea
                  maxLength={5000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Tell us briefly what you need help with..."
                />
              </div>

              <p className="text-xs text-muted-foreground">
                We'll reply from{" "}
                <span className="font-medium text-foreground">
                  careers@amigoxcel.com
                </span>{" "}
                within 24 hours.
              </p>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send & Book Call"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CallToAction;
