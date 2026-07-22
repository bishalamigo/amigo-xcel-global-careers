import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Use</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            These terms cover use of this website (amigoxcel.com and related preview URLs).
            Engagements for services are governed by a separate written agreement between AmigoXcel
            and the client.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Use of the site</h2>
            <p>
              You may browse this site and submit an enquiry through the contact form. Please do not
              attempt to attack, disrupt, or scrape the site, or misuse the contact form for spam.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Content</h2>
            <p>
              All text, branding, and design on this site belong to AmigoXcel. You may share links to
              our pages, but please do not republish our content as your own.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Enquiries and follow-up</h2>
            <p>
              Submitting the contact form does not create a contract. It starts a conversation. Any
              engagement between you and AmigoXcel begins only after a written scope and agreement
              are signed by both sides.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. No warranty</h2>
            <p>
              This site is provided "as is". While we take care to keep it accurate and available,
              we do not guarantee uninterrupted access or that every piece of information is current
              at all times.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Privacy</h2>
            <p>
              How we handle information you submit is described in our{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:careers@amigoxcel.com" className="text-primary hover:underline">
                careers@amigoxcel.com
              </a>.
            </p>
          </section>

          <p className="pt-4">
            <Link to="/" className="text-primary hover:underline">← Back to home</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
