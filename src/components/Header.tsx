
import { useState } from "react";
import { Search, ShoppingCart, Menu, User, Bell, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // In a real app, this would navigate to search results page
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
        duration: 3000,
      });
      
      // For demo purposes, navigate to pharmacy with the search term
      navigate(`/pharmacy?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2 text-brand-500 transition-transform hover:scale-105"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <span className="text-xl md:text-2xl font-bold hidden sm:inline-block">MediBuddy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={cn(
                "nav-link",
                isActive("/") && "nav-link-active"
              )}
            >
              Home
            </Link>
            <Link 
              to="/reminders" 
              className={cn(
                "nav-link",
                isActive("/reminders") && "nav-link-active"
              )}
            >
              Reminders
            </Link>
            <Link 
              to="/pharmacy" 
              className={cn(
                "nav-link",
                isActive("/pharmacy") && "nav-link-active"
              )}
            >
              Pharmacy
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "nav-link",
                isActive("/contact") && "nav-link-active"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex max-w-sm w-full mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search medicines, supplements..."
                className="input-primary pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-500 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-1">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-brand-500"
              aria-label="Notifications"
              onClick={() => {
                toast({
                  title: "Notifications",
                  description: "Use the notification bell in the bottom right corner to see your notifications",
                  duration: 3000,
                });
              }}
            >
              <Bell size={20} />
            </button>
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-brand-500 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-medicalpink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>
            <Link 
              to="/profile" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-brand-500 hidden sm:flex"
              aria-label="User Profile"
            >
              <User size={20} />
            </Link>
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search - Always visible below header on mobile */}
        <div className="md:hidden py-2 px-1">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search medicines..."
              className="input-primary pr-10 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out pt-16",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="absolute top-4 right-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-4 p-6">
          <Link 
            to="/" 
            className={cn(
              "text-lg font-medium p-2 hover:bg-gray-50 rounded-lg",
              isActive("/") && "text-brand-500 bg-brand-50"
            )}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/reminders" 
            className={cn(
              "text-lg font-medium p-2 hover:bg-gray-50 rounded-lg",
              isActive("/reminders") && "text-brand-500 bg-brand-50"
            )}
            onClick={toggleMenu}
          >
            Reminders
          </Link>
          <Link 
            to="/pharmacy" 
            className={cn(
              "text-lg font-medium p-2 hover:bg-gray-50 rounded-lg",
              isActive("/pharmacy") && "text-brand-500 bg-brand-50"
            )}
            onClick={toggleMenu}
          >
            Pharmacy
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-lg font-medium p-2 hover:bg-gray-50 rounded-lg",
              isActive("/contact") && "text-brand-500 bg-brand-50"
            )}
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link 
            to="/profile" 
            className={cn(
              "text-lg font-medium p-2 hover:bg-gray-50 rounded-lg",
              isActive("/profile") && "text-brand-500 bg-brand-50"
            )}
            onClick={toggleMenu}
          >
            My Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
