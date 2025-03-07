
import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Clock, ShoppingBag, Bell, Settings, LogOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Define profile sections as components for better organization
type ProfileSection = "profile" | "reminders" | "orders" | "notifications" | "settings";

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ProfileSection>("profile");
  const [formData, setFormData] = useState({
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1990-01-15",
    street: "123 Health Street",
    city: "Wellness City",
    state: "California",
    zipCode: "90210"
  });

  // Handle navigation to other pages
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSaveChanges = () => {
    // In a real app, you would send this data to your API
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    });
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 glass-card-lg p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                    <User size={40} className="text-brand-600" />
                  </div>
                  <h2 className="text-xl font-semibold">{formData.fullName}</h2>
                  <p className="text-gray-600 text-sm">Member since 2023</p>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                      activeSection === "profile" ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("profile")}
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </button>
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                      activeSection === "reminders" ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleNavigation("/reminders")}
                  >
                    <Clock size={18} />
                    <span>My Reminders</span>
                  </button>
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                      activeSection === "orders" ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => toast({
                      title: "Coming Soon",
                      description: "Order history will be available soon",
                    })}
                  >
                    <ShoppingBag size={18} />
                    <span>My Orders</span>
                  </button>
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                      activeSection === "notifications" ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => toast({
                      title: "Notifications",
                      description: "You have no new notifications",
                    })}
                  >
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                      activeSection === "settings" ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => toast({
                      title: "Settings",
                      description: "Account settings will be available soon",
                    })}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  <button 
                    className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 glass-card-lg p-6">
                <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          name="fullName"
                          className="input-primary w-full" 
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          className="input-primary w-full" 
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          className="input-primary w-full" 
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input 
                          type="date" 
                          name="dob"
                          className="input-primary w-full" 
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input 
                          type="text" 
                          name="street"
                          className="input-primary w-full" 
                          value={formData.street}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input 
                            type="text" 
                            name="city"
                            className="input-primary w-full" 
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input 
                            type="text" 
                            name="state"
                            className="input-primary w-full" 
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                          <input 
                            type="text" 
                            name="zipCode"
                            className="input-primary w-full" 
                            value={formData.zipCode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="btn-primary"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
