
import { useState } from "react";
import { PlusCircle, Clock, Calendar, Edit, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

type Reminder = {
  id: string;
  name: string;
  time: string;
  dosage: string;
  days: string[];
};

const ReminderSection = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      name: "Amoxicillin",
      time: "08:00",
      dosage: "1 capsule",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    {
      id: "2",
      name: "Lisinopril",
      time: "12:30",
      dosage: "1 tablet",
      days: ["Mon", "Wed", "Fri"],
    },
    {
      id: "3",
      name: "Vitamin D",
      time: "19:00",
      dosage: "1 capsule",
      days: ["Mon", "Thu", "Sun"],
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingReminder, setEditingReminder] = useState<string | null>(null);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    name: "",
    time: "",
    dosage: "",
    days: [],
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleAddReminder = () => {
    if (newReminder.name && newReminder.time && newReminder.dosage && newReminder.days?.length) {
      const reminderToAdd = {
        id: Date.now().toString(),
        name: newReminder.name,
        time: newReminder.time,
        dosage: newReminder.dosage,
        days: newReminder.days,
      };
      
      setReminders([...reminders, reminderToAdd]);
      setNewReminder({ name: "", time: "", dosage: "", days: [] });
      setIsAddingNew(false);
      
      toast({
        title: "Reminder added",
        description: `${reminderToAdd.name} has been added to your reminders`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields and select at least one day",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDeleteReminder = (id: string) => {
    const reminderToDelete = reminders.find(r => r.id === id);
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    toast({
      title: "Reminder deleted",
      description: `${reminderToDelete?.name} has been removed from your reminders`,
      duration: 3000,
    });
  };

  const handleEditReminder = (id: string) => {
    const reminderToEdit = reminders.find(r => r.id === id);
    if (reminderToEdit) {
      setEditingReminder(id);
      setNewReminder({
        name: reminderToEdit.name,
        time: reminderToEdit.time,
        dosage: reminderToEdit.dosage,
        days: [...reminderToEdit.days],
      });
      setIsAddingNew(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingReminder && newReminder.name && newReminder.time && newReminder.dosage && newReminder.days?.length) {
      setReminders(reminders.map(reminder => 
        reminder.id === editingReminder 
          ? {
              ...reminder,
              name: newReminder.name || reminder.name,
              time: newReminder.time || reminder.time,
              dosage: newReminder.dosage || reminder.dosage,
              days: newReminder.days || reminder.days,
            }
          : reminder
      ));
      
      setNewReminder({ name: "", time: "", dosage: "", days: [] });
      setIsAddingNew(false);
      setEditingReminder(null);
      
      toast({
        title: "Reminder updated",
        description: `${newReminder.name} has been updated`,
        duration: 3000,
      });
    }
  };

  const toggleDay = (day: string) => {
    if (!newReminder.days) return;
    
    if (newReminder.days.includes(day)) {
      setNewReminder({
        ...newReminder,
        days: newReminder.days.filter(d => d !== day)
      });
    } else {
      setNewReminder({
        ...newReminder,
        days: [...newReminder.days, day]
      });
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingReminder(null);
    setNewReminder({ name: "", time: "", dosage: "", days: [] });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Medicine Reminders</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Keep track of your medications and never miss a dose with our smart reminder system.
            </p>
          </div>

          <div className="bg-secondary rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Your Reminders</h3>
              <button 
                onClick={() => setIsAddingNew(true)}
                className="flex items-center space-x-2 text-brand-500 hover:text-brand-600 transition-colors"
              >
                <PlusCircle size={18} />
                <span>Add New Reminder</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Reminders List */}
              {reminders.map((reminder) => (
                <div 
                  key={reminder.id}
                  className="glass-card p-4 transition-all hover:shadow-md animate-fade-in"
                >
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 flex-shrink-0 rounded-full bg-brand-100 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-brand-500"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{reminder.name}</h4>
                        <p className="text-sm text-gray-600">{reminder.dosage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3 md:mt-0">
                      <div className="flex items-center space-x-1 mr-4">
                        <Clock size={16} className="text-brand-400" />
                        <span className="text-sm font-medium">{reminder.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 mr-4">
                        <Calendar size={16} className="text-brand-400" />
                        <div className="text-xs">
                          {reminder.days.map((day, i) => (
                            <span 
                              key={day}
                              className={cn(
                                "inline-block w-6 text-center font-medium",
                                reminder.days.includes(day) 
                                  ? "text-brand-500" 
                                  : "text-gray-400"
                              )}
                            >
                              {day}
                              {i < reminder.days.length - 1 && ","}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1 ml-2">
                        <button 
                          className="p-1.5 text-gray-400 hover:text-brand-500 transition-colors rounded-full hover:bg-gray-100"
                          onClick={() => handleEditReminder(reminder.id)}
                          aria-label="Edit reminder"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100"
                          onClick={() => handleDeleteReminder(reminder.id)}
                          aria-label="Delete reminder"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* No Reminders State */}
              {reminders.length === 0 && !isAddingNew && (
                <div className="text-center py-8">
                  <p className="text-gray-500">You don't have any reminders yet.</p>
                  <button 
                    onClick={() => setIsAddingNew(true)}
                    className="mt-4 btn-primary"
                  >
                    Add Your First Reminder
                  </button>
                </div>
              )}

              {/* Add New Reminder Form */}
              {isAddingNew && (
                <div className="glass-card-lg p-5 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-900">
                      {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
                    </h4>
                    <button 
                      onClick={handleCancel}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medicine Name
                      </label>
                      <input
                        type="text"
                        className="input-primary"
                        placeholder="e.g., Amoxicillin"
                        value={newReminder.name}
                        onChange={(e) => setNewReminder({ ...newReminder, name: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        className="input-primary"
                        value={newReminder.time}
                        onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dosage
                      </label>
                      <input
                        type="text"
                        className="input-primary"
                        placeholder="e.g., 1 tablet"
                        value={newReminder.dosage}
                        onChange={(e) => setNewReminder({ ...newReminder, dosage: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Days
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {daysOfWeek.map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                              newReminder.days?.includes(day)
                                ? "bg-brand-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            )}
                          >
                            {day.charAt(0)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-2">
                    <button 
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={editingReminder ? handleSaveEdit : handleAddReminder}
                      className="flex items-center space-x-1 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                    >
                      <Check size={18} />
                      <span>{editingReminder ? 'Save Changes' : 'Save Reminder'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReminderSection;
