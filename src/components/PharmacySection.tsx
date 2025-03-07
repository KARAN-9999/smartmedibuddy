
import { useState } from "react";
import { ShoppingCart, Filter, Plus, Search, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Define medicine product type
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
};

const PharmacySection = () => {
  const navigate = useNavigate();
  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Paracetamol",
      description: "Pain reliever and fever reducer",
      price: 8.99,
      image: "https://cdn.pixabay.com/photo/2016/12/05/19/49/pill-1884775_1280.jpg",
      rating: 4.5,
      category: "Pain Relief"
    },
    {
      id: "2",
      name: "Vitamin C",
      description: "Immune system support supplement",
      price: 12.49,
      image: "https://cdn.pixabay.com/photo/2017/06/19/15/40/strawberry-2419023_1280.jpg",
      rating: 4.8,
      category: "Vitamins"
    },
    {
      id: "3",
      name: "Ibuprofen",
      description: "Anti-inflammatory and pain relief",
      price: 7.99,
      image: "https://cdn.pixabay.com/photo/2016/12/08/15/59/pill-1892168_1280.jpg",
      rating: 4.2,
      category: "Pain Relief"
    },
    {
      id: "4",
      name: "First Aid Kit",
      description: "Essential medical supplies for emergencies",
      price: 24.99,
      image: "https://cdn.pixabay.com/photo/2014/12/10/21/01/first-aid-kit-563170_1280.jpg",
      rating: 4.9,
      category: "First Aid"
    },
    {
      id: "5",
      name: "Multivitamin",
      description: "Daily essential vitamins and minerals",
      price: 15.49,
      image: "https://cdn.pixabay.com/photo/2018/07/30/09/38/pharmacy-3572037_1280.jpg",
      rating: 4.7,
      category: "Vitamins"
    },
    {
      id: "6",
      name: "Hand Sanitizer",
      description: "Kills 99.9% of germs without water",
      price: 4.99,
      image: "https://cdn.pixabay.com/photo/2020/04/28/05/06/disinfection-5102086_1280.jpg",
      rating: 4.6,
      category: "Personal Care"
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  // All available categories including "All"
  const categories = ["All", ...Array.from(new Set(products.map(product => product.category)))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add product to cart
  const addToCart = (productId: string) => {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
      duration: 3000,
    });
  };

  // Handle view cart
  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Online Pharmacy</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of medicines, supplements, and health essentials.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search medicines..."
              className="input-primary pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-gray-600 flex items-center">
              <Filter size={16} className="mr-2" />
              <span>Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-brand-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:translate-y-[-5px] animate-fade-in"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
                  <Star size={14} className="text-yellow-400 mr-1" fill="#FBBF24" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
                <div className="absolute top-3 left-3 bg-brand-100 text-brand-700 rounded-full px-2.5 py-1 text-xs font-medium">
                  {product.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-brand-700 font-semibold">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="flex items-center space-x-1 bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span className="sr-only sm:not-sr-only sm:inline-block text-sm">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">No products found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="text-brand-500 hover:text-brand-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="glass-card-lg py-3 px-5 flex items-center space-x-3">
              <ShoppingCart size={20} className="text-brand-500" />
              <span>
                <span className="font-medium">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                <span className="text-gray-600"> items in your cart</span>
              </span>
              <button 
                onClick={handleViewCart}
                className="btn-primary text-sm py-1.5"
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PharmacySection;
