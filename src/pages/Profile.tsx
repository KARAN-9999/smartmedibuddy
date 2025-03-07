
import Layout from "@/components/Layout";
import { User, Clock, ShoppingBag, Bell, Settings, LogOut } from "lucide-react";

const Profile = () => {
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
                  <h2 className="text-xl font-semibold">Jane Doe</h2>
                  <p className="text-gray-600 text-sm">Member since 2023</p>
                </div>
                
                <nav className="space-y-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-brand-50 text-brand-700 font-medium">
                    <User size={18} />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Clock size={18} />
                    <span>My Reminders</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50">
                    <ShoppingBag size={18} />
                    <span>My Orders</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50">
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
                        <input type="text" className="input-primary w-full" defaultValue="Jane Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" className="input-primary w-full" defaultValue="jane@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" className="input-primary w-full" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input type="date" className="input-primary w-full" defaultValue="1990-01-15" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input type="text" className="input-primary w-full" defaultValue="123 Health Street" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input type="text" className="input-primary w-full" defaultValue="Wellness City" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input type="text" className="input-primary w-full" defaultValue="California" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                          <input type="text" className="input-primary w-full" defaultValue="90210" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="btn-primary">Save Changes</button>
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
