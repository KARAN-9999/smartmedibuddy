
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="inline-block p-6 bg-brand-100 rounded-full">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-brand-500 text-white text-3xl font-bold">
                404
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center justify-center"
          >
            <HomeIcon size={18} className="mr-2" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
