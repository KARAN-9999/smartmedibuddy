
import { useState } from "react";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, CheckCircle, ChevronLeft, Calendar, CreditCardIcon, User, Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsComplete(true);
      
      // Simulate redirect after payment success
      setTimeout(() => {
        navigate("/");
        toast({
          title: "Payment successful!",
          description: "Your order has been confirmed and will be shipped soon.",
          duration: 5000,
        });
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/cart" className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-4">
                <ChevronLeft size={16} className="mr-1" />
                <span>Back to cart</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>
            
            {isComplete ? (
              <div className="glass-card-lg p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your order has been confirmed and will be shipped soon. Thank you for your purchase!
                </p>
                <Link to="/" className="btn-primary inline-flex items-center justify-center">
                  Return to Home
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Methods */}
                <div className="lg:col-span-2">
                  <div className="glass-card-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    
                    <div className="flex space-x-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 py-3 px-4 rounded-lg border ${
                          paymentMethod === 'card' 
                            ? 'border-brand-500 bg-brand-50 text-brand-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        } transition-colors flex items-center justify-center`}
                      >
                        <CreditCardIcon size={20} className="mr-2" />
                        <span>Credit Card</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`flex-1 py-3 px-4 rounded-lg border ${
                          paymentMethod === 'paypal' 
                            ? 'border-brand-500 bg-brand-50 text-brand-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        } transition-colors flex items-center justify-center`}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.0667 8.66667C20.0667 12.3067 17.3067 15.0667 13.6667 15.0667H11.2C10.8 15.0667 10.4667 15.4 10.4667 15.8V19.8667C10.4667 20.2667 10.1333 20.6 9.73333 20.6H7.26667C6.86667 20.6 6.53333 20.2667 6.53333 19.8667V4.13333C6.53333 3.73333 6.86667 3.4 7.26667 3.4H13.6667C17.3067 3.4 20.0667 6.16 20.0667 8.66667Z" fill="#0070E0"/>
                          <path d="M7.26667 20.6H9.73333C10.1333 20.6 10.4667 20.2667 10.4667 19.8667V15.8C10.4667 15.4 10.8 15.0667 11.2 15.0667H13.6667C17.3067 15.0667 20.0667 12.3067 20.0667 8.66667C20.0667 6.16 18.2 3.4 14.5333 3.4" stroke="#003087" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                        </svg>
                        <span>PayPal</span>
                      </button>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard size={18} className="text-gray-400" />
                            </div>
                            <input
                              id="cardNumber"
                              name="cardNumber"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              className="input-primary w-full pl-10"
                              maxLength={19}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User size={18} className="text-gray-400" />
                            </div>
                            <input
                              id="cardName"
                              name="cardName"
                              type="text"
                              placeholder="John Doe"
                              value={formData.cardName}
                              onChange={handleChange}
                              className="input-primary w-full pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar size={18} className="text-gray-400" />
                              </div>
                              <input
                                id="expiryDate"
                                name="expiryDate"
                                type="text"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={handleExpiryDateChange}
                                className="input-primary w-full pl-10"
                                maxLength={5}
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              id="cvv"
                              name="cvv"
                              type="text"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleChange}
                              className="input-primary w-full"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="saveCard"
                            name="saveCard"
                            type="checkbox"
                            checked={formData.saveCard}
                            onChange={handleChange}
                            className="h-4 w-4 text-brand-600 border-gray-300 rounded"
                          />
                          <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                            Save this card for future purchases
                          </label>
                        </div>
                        
                        <div className="pt-4">
                          <button 
                            type="submit" 
                            disabled={isProcessing}
                            className="btn-primary w-full flex items-center justify-center"
                          >
                            {isProcessing ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing Payment...
                              </>
                            ) : (
                              <>
                                <span>Complete Payment</span>
                              </>
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                          <Shield size={16} className="mr-1" />
                          <span>Your payment information is secure and encrypted</span>
                        </div>
                      </form>
                    )}
                    
                    {paymentMethod === 'paypal' && (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-6">
                          You will be redirected to PayPal to complete your payment securely.
                        </p>
                        <button 
                          onClick={handleSubmit}
                          disabled={isProcessing}
                          className="btn-primary w-full max-w-md mx-auto flex items-center justify-center"
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <span>Continue to PayPal</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="glass-card-lg p-6 sticky top-20">
                    <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">$21.48</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">$5.99</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">$1.50</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between">
                        <span className="text-gray-900 font-semibold">Total</span>
                        <span className="text-brand-600 font-bold">$28.97</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
