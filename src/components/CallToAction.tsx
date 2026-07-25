import { useState } from "react";
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
  MessageSquare,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const CallToAction = () => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "e19ddb87-5689-4122-9b38-8b05b380c881");
    formData.append("subject", "New Enquiry from AmigoXcel Website");
    formData.append("from_name", "AmigoXcel Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <section
        id="contact"
        className="py-28 bg-background text-foreground relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Let's Build
              <span className="block gradient-text">What's Next.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Tell us what you need. We'll reply from careers@amigoxcel.com within 24 hours.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-16">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Book a Free Strategy Call</h3>
                <p className="text-muted-foreground">
                  A 15-minute call. No slides, no pressure, just a straight answer on whether we can help.
                </p>
                <ul className="space-y-2 text-sm text-left max-w-sm mx-auto text-foreground/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>15-minute discovery call over Zoom or Google Meet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>A short written plan sent after the call</span>
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
                  Book My Free Call
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">Working with clients in 8 countries</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground max-w-3xl mx-auto">
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
                  className="bg-card border border-border px-4 py-2 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowModal(false);
            setStatus("idle");
            setErrorMsg("");
          }}
        >
          <div
            className="bg-background text-foreground rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold">Book a Free Strategy Call</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setStatus("idle");
                  setErrorMsg("");
                }}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={200}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={320}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength={50}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+977 98XXXXXXXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us about your enquiry..."
                />
              </div>

              {/* Honeypot */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <p className="text-xs text-muted-foreground">
                We'll reply from{" "}
                <span className="font-medium text-foreground">careers@amigoxcel.com</span>{" "}
                within 24 hours.
              </p>

              <Button type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Sending..." : "Send Enquiry"}
              </Button>

              {status === "success" && (
                <p className="text-green-600 text-sm text-center">
                  Thanks! Your enquiry has been sent, we'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-destructive text-sm text-center">{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CallToAction;
