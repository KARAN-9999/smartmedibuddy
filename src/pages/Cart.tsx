
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// Simulated order processing function
const processOrder = async (orderDetails: any): Promise<boolean> => {
  // Simulate API call to process order
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful order processing
      resolve(true);
    }, 2000);
  });
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Paracetamol",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      quantity: 2,
    },
    {
      id: "2",
      name: "Vitamin C",
      price: 12.49,
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      quantity: 1,
    },
  ]);
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    
    toast({
      title: "Cart updated",
      description: "Item quantity has been updated",
      duration: 2000,
    });
  };

  const removeItem = (id: string) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: `${itemToRemove?.name} has been removed from your cart`,
      duration: 3000,
    });
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // Prepare order details
      const orderDetails = {
        items: cartItems,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        date: new Date().toISOString(),
      };
      
      // Process the order
      const success = await processOrder(orderDetails);
      
      if (success) {
        setOrderComplete(true);
        
        // Clear cart after successful order
        setTimeout(() => {
          setCartItems([]);
          setIsCheckingOut(false);
          setOrderComplete(false);
          
          toast({
            title: "Order placed successfully!",
            description: "Thank you for your purchase. Your order has been confirmed.",
            duration: 5000,
          });
          
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setIsCheckingOut(false);
      toast({
        title: "Checkout failed",
        description: "There was an issue processing your order. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="glass-card-lg p-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h2 className="font-semibold text-lg">Shopping Cart ({cartItems.length} items)</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="sm:w-20 h-20 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6 bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">30 tablets</p>
                          <div className="mt-2 flex justify-between sm:hidden">
                            <span className="font-medium text-brand-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4 sm:mt-0 sm:ml-6">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-3 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="hidden sm:block text-right font-medium text-brand-600 ml-6">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 mt-4 sm:mt-0 sm:ml-4"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    <Link to="/pharmacy" className="text-brand-600 hover:text-brand-700 font-medium flex items-center">
                      <ShoppingBag size={16} className="mr-2" />
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card-lg p-6 sticky top-20">
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <span className="text-brand-600 font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="btn-primary w-full mt-6 flex items-center justify-center"
                  >
                    {isCheckingOut ? (
                      <>
                        <CheckCircle size={16} className="mr-2 animate-pulse" />
                        <span>{orderComplete ? "Order Complete!" : "Processing..."}</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                  
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Secure payment processing with encryption
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card-lg p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any medicines to your cart yet.</p>
              <Link to="/pharmacy" className="btn-primary inline-flex items-center justify-center">
                <ShoppingBag size={18} className="mr-2" />
                <span>Browse Pharmacy</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
