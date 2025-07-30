import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Globe, Zap, X, Mail, User, Phone, FileText, Calendar, MessageSquare } from "lucide-react";

const CallToAction = () => {
  const [showFreeAuditModal, setShowFreeAuditModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [freeAuditForm, setFreeAuditForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    experience: "",
    targetRole: ""
  });

  const [expertForm, setExpertForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    experience: "",
    targetRole: "",
    budget: "",
    timeline: "",
    additionalInfo: ""
  });

  const handleFreeAuditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send to your backend API
      // For now, we'll simulate the email sending
      const emailData = {
        type: "Free Audit Request",
        ...freeAuditForm,
        timestamp: new Date().toISOString()
      };
      
      console.log("Free Audit Form Data:", emailData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("Thank you! We'll review your information and get back to you within 24 hours.");
      setShowFreeAuditModal(false);
      setFreeAuditForm({
        name: "",
        email: "",
        phone: "",
        currentRole: "",
        experience: "",
        targetRole: ""
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExpertSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData = {
        type: "Expert Session Request",
        ...expertForm,
        timestamp: new Date().toISOString()
      };
      
      console.log("Expert Session Form Data:", emailData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("Thank you! Our expert will contact you within 2 business hours to schedule your session.");
      setShowExpertModal(false);
      setExpertForm({
        name: "",
        email: "",
        phone: "",
        currentRole: "",
        experience: "",
        targetRole: "",
        budget: "",
        timeline: "",
        additionalInfo: ""
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6">
          {/* Main CTA */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready for a resume that<br />
              <span className="text-blue-400">works as hard as you do?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Start with a free review. Upgrade with expert-crafted clarity.<br />
              <span className="text-green-400">Your global career starts here.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {/* <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Free Review
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
                See Success Examples
              </Button> */}
            </div>
          </div>

          {/* Option Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Start Free</h3>
                <p className="text-gray-300">Get your resume reviewed and receive actionable feedback</p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Comprehensive resume audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>ATS compatibility check</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Improvement recommendations</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setShowFreeAuditModal(true)}
                >
                  Get Free Audit
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Expert Upgrade</h3>
                <p className="text-gray-300">Let our hiring experts craft your perfect career materials</p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Professional resume rewrite</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>LinkedIn optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Personal career coaching</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowExpertModal(true)}
                >
                  Book Expert Session
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Global Reach */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Globe className="w-5 h-5 text-blue-400" />
              <span>Serving tech professionals worldwide</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
              <span className="bg-white/10 px-4 py-2 rounded-full">🇦🇺 Australia</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">🇺🇸 United States</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">🇬🇧 United Kingdom</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">🇨🇦 Canada</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">🇸🇬 Singapore</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">🇮🇳 India</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">🇳🇵 Nepal</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">🇵🇭 Philippines</span>
            </div>
          </div>

          {/* Trust Elements */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm mb-4">Trusted by professionals at</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <span className="text-lg font-semibold">Dell</span>
              <span className="text-lg font-semibold">Wipro</span>
              <span className="text-lg font-semibold">Salesforce</span>
              <span className="text-lg font-semibold">HCL</span>
              <span className="text-lg font-semibold">Accenture</span>
              <span className="text-lg font-semibold">Fujitsu</span>
              <span className="text-lg font-semibold">Tech Mahindra</span>
              <span className="text-lg font-semibold">Qiagen</span>
              <span className="text-lg font-semibold">Essilor</span>
              <span className="text-lg font-semibold">Caspo</span>
              <span className="text-lg font-semibold">Kuehne + Nagel</span>
              <span className="text-lg font-semibold">Ncell</span>
              <span className="text-lg font-semibold">Daraz</span>
              <span className="text-lg font-semibold">Golyan Group</span>
              <span className="text-lg font-semibold">BizBazar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Audit Modal */}
      <Modal
        isOpen={showFreeAuditModal}
        onClose={() => setShowFreeAuditModal(false)}
        title="Get Your Free Resume Audit"
      >
        <form onSubmit={handleFreeAuditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              required
              value={freeAuditForm.name}
              onChange={(e) => setFreeAuditForm({ ...freeAuditForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              required
              value={freeAuditForm.email}
              onChange={(e) => setFreeAuditForm({ ...freeAuditForm, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={freeAuditForm.phone}
              onChange={(e) => setFreeAuditForm({ ...freeAuditForm, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Current Role *
            </label>
            <input
              type="text"
              required
              value={freeAuditForm.currentRole}
              onChange={(e) => setFreeAuditForm({ ...freeAuditForm, currentRole: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Software Engineer, Product Manager"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience *
            </label>
            <select
              required
              value={freeAuditForm.experience}
              onChange={(e) => setFreeAuditForm({ ...freeAuditForm, experience: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select experience level</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Role
            </label>
            <input
              type="text"
              value={freeAuditForm.targetRole}
              onChange={(e) => setFreeAuditForm({ ...freeAuditForm, targetRole: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Role you're targeting (optional)"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
          >
            {isSubmitting ? "Submitting..." : "Get Free Audit"}
          </Button>
        </form>
      </Modal>

      {/* Expert Session Modal */}
      <Modal
        isOpen={showExpertModal}
        onClose={() => setShowExpertModal(false)}
        title="Book Your Expert Session"
      >
        <form onSubmit={handleExpertSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              required
              value={expertForm.name}
              onChange={(e) => setExpertForm({ ...expertForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              required
              value={expertForm.email}
              onChange={(e) => setExpertForm({ ...expertForm, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={expertForm.phone}
              onChange={(e) => setExpertForm({ ...expertForm, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Current Role *
            </label>
            <input
              type="text"
              required
              value={expertForm.currentRole}
              onChange={(e) => setExpertForm({ ...expertForm, currentRole: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Software Engineer, Product Manager"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience *
            </label>
            <select
              required
              value={expertForm.experience}
              onChange={(e) => setExpertForm({ ...expertForm, experience: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select experience level</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Role *
            </label>
            <input
              type="text"
              required
              value={expertForm.targetRole}
              onChange={(e) => setExpertForm({ ...expertForm, targetRole: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Role you're targeting"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              value={expertForm.budget}
              onChange={(e) => setExpertForm({ ...expertForm, budget: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select budget range</option>
              <option value="$200-500">$200 - $500</option>
              <option value="$500-1000">$500 - $1,000</option>
              <option value="$1000-2000">$1,000 - $2,000</option>
              <option value="$2000+">$2,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Timeline
            </label>
            <select
              value={expertForm.timeline}
              onChange={(e) => setExpertForm({ ...expertForm, timeline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">When do you need this completed?</option>
              <option value="ASAP">ASAP (within 1 week)</option>
              <option value="2-weeks">Within 2 weeks</option>
              <option value="1-month">Within 1 month</option>
              <option value="flexible">Flexible timeline</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Additional Information
            </label>
            <textarea
              value={expertForm.additionalInfo}
              onChange={(e) => setExpertForm({ ...expertForm, additionalInfo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Any specific requirements or questions?"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            {isSubmitting ? "Submitting..." : "Book Expert Session"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CallToAction;