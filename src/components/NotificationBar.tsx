
import { useState, useEffect } from "react";
import { Bell, X, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "reminder" | "order" | "info";
  link?: string;
}

const NotificationBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Medicine Reminder",
      message: "Time to take your Amoxicillin (1 capsule)",
      time: "Now",
      type: "reminder",
      link: "/reminders"
    },
    {
      id: "2",
      title: "Order Shipped",
      message: "Your order #12345 has been shipped and will arrive tomorrow",
      time: "10 mins ago",
      type: "order",
      link: "/profile"
    },
    {
      id: "3",
      title: "Refill Reminder",
      message: "Your Lisinopril prescription is due for refill in 3 days",
      time: "1 hour ago",
      type: "info",
      link: "/pharmacy"
    }
  ]);

  // Auto-close notification bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('#notification-panel') && !target.closest('#notification-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const dismissNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const notificationToRemove = notifications.find(n => n.id === id);
    setNotifications(notifications.filter(notification => notification.id !== id));
    
    toast({
      title: "Notification dismissed",
      description: `"${notificationToRemove?.title}" has been removed`,
      duration: 3000,
    });
  };

  const handleNotificationAction = (notification: Notification) => {
    setIsOpen(false);
    if (notification.link) {
      navigate(notification.link);
    }
    
    if (notification.type === "reminder") {
      toast({
        title: "Reminder acknowledged",
        description: "This medication has been marked as taken",
        duration: 3000,
      });
    }
  };

  const markAllAsRead = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "All notifications have been marked as read",
      duration: 3000,
    });
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "reminder":
        return "bg-brand-100 text-brand-700 border-brand-200";
      case "order":
        return "bg-green-100 text-green-700 border-green-200";
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      {/* Notification Toggle Button (Fixed Position) */}
      <button
        id="notification-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg",
          "flex items-center justify-center transition-colors",
          "bg-brand-500 text-white hover:bg-brand-600"
        )}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-medicalpink-500 text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <div
        id="notification-panel"
        className={cn(
          "fixed bottom-20 right-6 z-40 w-80 sm:w-96 max-h-[70vh] overflow-auto",
          "bg-white rounded-2xl shadow-glass-lg border border-gray-100",
          "transform transition-all duration-300 ease-in-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationAction(notification)}
                className="p-4 hover:bg-gray-50 transition-colors relative animate-fade-in cursor-pointer"
              >
                <button
                  onClick={(e) => dismissNotification(notification.id, e)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X size={14} />
                </button>
                
                <div className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2",
                  getNotificationColor(notification.type)
                )}>
                  {notification.type === "reminder" && "Medicine Reminder"}
                  {notification.type === "order" && "Order Update"}
                  {notification.type === "info" && "Information"}
                </div>
                
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1 pr-5">{notification.message}</p>
                
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>{notification.time}</span>
                </div>

                {notification.type === "reminder" && (
                  <button className="mt-2 flex items-center text-xs text-brand-600 font-medium">
                    <CheckCircle size={14} className="mr-1" />
                    <span>Mark as taken</span>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No new notifications</p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-gray-100">
            <button 
              onClick={markAllAsRead}
              className="text-sm text-center w-full text-brand-500 hover:text-brand-600"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationBar;
