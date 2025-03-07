
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-500">
              <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-2xl font-bold">MediBuddy</span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Your smart companion for medicine reminders and online pharmacy shopping.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-brand-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-brand-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-brand-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-500 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/reminders" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Medicine Reminders
                </Link>
              </li>
              <li>
                <Link to="/pharmacy" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Online Pharmacy
                </Link>
              </li>
              <li>
                <Link to="/prescriptions" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Prescription Upload
                </Link>
              </li>
              <li>
                <Link to="/consultations" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Online Consultations
                </Link>
              </li>
              <li>
                <Link to="/nearest" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Find Nearest Pharmacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-brand-500 mt-0.5" />
                <span className="text-gray-600">support@medibuddy.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-brand-500 mt-0.5" />
                <span className="text-gray-600">+1 (800) MEDI-123</span>
              </li>
              <li>
                <button className="flex items-center space-x-2 mt-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full py-2 px-4 transition-colors">
                  <MessageCircle size={18} />
                  <span>Chat with Support</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MediBuddy. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/terms" className="text-gray-500 hover:text-brand-500 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-brand-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-brand-500 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
