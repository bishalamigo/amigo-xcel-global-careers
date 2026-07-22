import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>
            This page is maintained by AmigoXcel to explain what information we collect through this
            website and how we handle it. If you have questions, email{" "}
            <a href="mailto:careers@amigoxcel.com" className="text-primary hover:underline">
              careers@amigoxcel.com
            </a>.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. What we collect</h2>
            <p>
              When you submit the contact form on this site, we collect the fields you fill in:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number</li>
              <li>The service you are enquiring about</li>
              <li>Any message you choose to include</li>
            </ul>
            <p>We do not use tracking cookies or advertising trackers on this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Why we collect it</h2>
            <p>
              We use this information for one purpose only: to reply to your enquiry, understand what
              you need, and follow up about working together. We do not sell or share your details
              with third parties for marketing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Where it is stored</h2>
            <p>
              Contact form submissions are stored in a managed Postgres database hosted on Supabase.
              Access is restricted to authorised AmigoXcel team members via role-based access
              controls. Data is encrypted in transit (HTTPS) and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. How long we keep it</h2>
            <p>
              We keep enquiry data for as long as it is useful to serve you, and then remove it on
              request. To request deletion of your data, email{" "}
              <a href="mailto:careers@amigoxcel.com" className="text-primary hover:underline">
                careers@amigoxcel.com
              </a>{" "}
              from the address you originally used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Your rights</h2>
            <p>
              You can ask us at any time to access, correct, or delete the information you submitted
              through this site. We will respond within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Changes to this policy</h2>
            <p>
              If we change how we handle your information, we will update this page and refresh the
              "Last updated" date above.
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

export default Privacy;
