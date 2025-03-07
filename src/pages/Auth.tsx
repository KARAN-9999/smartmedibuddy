
import { useState } from "react";
import Layout from "@/components/Layout";
import { User, Key, Mail, Lock, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success handling
      toast({
        title: isLogin ? "Login successful" : "Registration successful",
        description: isLogin ? "Welcome back!" : "Your account has been created",
      });
      
      // Redirect to profile or home page
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <div className="glass-card-lg p-8 md:p-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                  <User size={30} className="text-brand-600" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-center mb-6">
                {isLogin ? "Log In to Your Account" : "Create an Account"}
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-primary w-full pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.name}
                      </p>
                    )}
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-primary w-full pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`input-primary w-full pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.password}
                    </p>
                  )}
                </div>
                
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`input-primary w-full pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-brand-600 hover:text-brand-800">
                      Forgot password?
                    </button>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </button>
                
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-brand-600 hover:text-brand-800"
                  >
                    {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
