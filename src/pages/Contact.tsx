
import Layout from "@/components/Layout";
import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you shortly.",
      duration: 5000,
    });
    console.log("Contact form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <Layout>
      <section className="py-16 bg-gradient-to-b from-white to-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Have questions about our medication reminders or pharmacy services? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="glass-card-lg p-8 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Us</h3>
                    <p className="text-gray-600 mt-1">support@medibuddy.com</p>
                    <p className="text-gray-600">business@medibuddy.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Call Us</h3>
                    <p className="text-gray-600 mt-1">+1 (800) MEDI-123</p>
                    <p className="text-gray-600">Mon-Fri: 8am-8pm, Sat: 9am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Visit Us</h3>
                    <p className="text-gray-600 mt-1">123 Health Avenue</p>
                    <p className="text-gray-600">Wellness City, WC 90210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Live Chat</h3>
                    <p className="text-gray-600 mt-1">Chat with our support team in real-time</p>
                    <button className="mt-2 inline-flex items-center text-brand-600 hover:text-brand-700 font-medium">
                      Start a chat <Send size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card-lg p-8 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-primary w-full"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-primary w-full"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-primary w-full"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="input-primary w-full"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  Send Message
                  <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
