
import { useState } from "react";
import { Calendar, Clock, BellRing, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Hero = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Newsletter subscription successful",
      description: `Thank you for subscribing with ${email}!`,
      duration: 5000,
    });
    console.log("Email submitted:", email);
    setEmail("");
  };

  const handleViewAll = () => {
    navigate("/reminders");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/50 pt-16 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-100 opacity-50 blur-3xl"></div>
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-medicalpink-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl space-y-8 animate-fade-in">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
                Never Miss Your Medication Again
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                Your Smart <span className="text-brand-500">Medicine Reminder</span> & Personal Pharmacy
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Experience the future of healthcare management with AI-powered reminders and a seamless online pharmacy experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/reminders" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                <BellRing size={18} />
                <span>Set Reminders</span>
              </Link>
              <Link 
                to="/pharmacy" 
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <span>Shop Medicines</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="p-1.5 rounded-full bg-brand-100">
                  <Clock size={16} className="text-brand-600" />
                </div>
                <span className="text-sm font-medium">Timely Reminders</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="p-1.5 rounded-full bg-brand-100">
                  <Calendar size={16} className="text-brand-600" />
                </div>
                <span className="text-sm font-medium">Medication Tracking</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="p-1.5 rounded-full bg-brand-100">
                  <BellRing size={16} className="text-brand-600" />
                </div>
                <span className="text-sm font-medium">Smart Notifications</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md animate-scale-in">
              <div className="glass-card-lg overflow-hidden shadow-glass-lg p-6 relative">
                <div className="absolute top-2 left-2 flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-medicalpink-400"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                
                <h3 className="text-center font-semibold text-lg text-gray-800 mb-4 mt-2">Today's Medicine</h3>
                
                <div className="space-y-3">
                  {/* First Reminder */}
                  <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-brand-500 animate-pulse-gentle"></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-medium text-gray-900">Amoxicillin</h4>
                        <p className="text-sm text-gray-500">1 capsule with water</p>
                      </div>
                      <div className="bg-brand-50 px-2.5 py-1 rounded-lg text-sm font-medium text-brand-600">
                        8:00 AM
                      </div>
                    </div>
                  </div>
                  
                  {/* Second Reminder */}
                  <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-medicalpink-100 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-medicalpink-400 animate-pulse-gentle"></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-medium text-gray-900">Lisinopril</h4>
                        <p className="text-sm text-gray-500">1 tablet after meal</p>
                      </div>
                      <div className="bg-medicalpink-50 px-2.5 py-1 rounded-lg text-sm font-medium text-medicalpink-500">
                        12:30 PM
                      </div>
                    </div>
                  </div>
                  
                  {/* Third Reminder */}
                  <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-blue-400 animate-pulse-gentle"></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-medium text-gray-900">Vitamin D</h4>
                        <p className="text-sm text-gray-500">1 capsule with meal</p>
                      </div>
                      <div className="bg-blue-50 px-2.5 py-1 rounded-lg text-sm font-medium text-blue-600">
                        7:00 PM
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Upcoming: <span className="text-gray-700 font-medium">3 medicines</span>
                  </div>
                  <button 
                    onClick={handleViewAll}
                    className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                  >
                    View All
                  </button>
                </div>
              </div>

              {/* Animated Pill */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-medicalpink-200 flex items-center justify-center shadow-lg animate-float">
                <div className="w-8 h-8 bg-medicalpink-400 rounded-full"></div>
              </div>
              
              {/* Animated Pill 2 */}
              <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center shadow-md animate-float" style={{ animationDelay: "2s" }}>
                <div className="w-6 h-6 bg-brand-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
