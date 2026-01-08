
import React, { useState, useEffect } from 'react';
import { Users, Plus, Phone, Heart, Trash2, CheckCircle2 } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { EmergencyContact } from '../types';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', relationship: '' });

  useEffect(() => {
    mockApi.getContacts().then(setContacts);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = await mockApi.addContact(formData);
    setContacts(prev => [...prev, newContact]);
    setIsAdding(false);
    setFormData({ name: '', phone: '', relationship: '' });
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Emergency Circle</h2>
          <p className="text-slate-400">Trusted people who will be notified in an emergency.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-2xl font-bold transition-all"
        >
          <Plus size={20} />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map(contact => (
          <div key={contact.id} className="glass-morphism p-6 rounded-3xl border border-white/5 space-y-4 hover:border-rose-500/30 transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{contact.name}</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{contact.relationship}</p>
                </div>
              </div>
              {contact.isVerified && (
                <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-bold uppercase">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg flex-1">
                <Phone size={14} />
                <span className="text-sm font-mono">{contact.phone}</span>
              </div>
              <button className="p-2 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {contacts.length === 0 && !isAdding && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-600 border border-slate-800">
              <Heart size={32} />
            </div>
            <p className="text-slate-500 italic">No emergency contacts yet. Add your first trusted person.</p>
          </div>
        )}

        {isAdding && (
          <div className="glass-morphism p-6 rounded-3xl border-2 border-dashed border-rose-500/50">
            <form onSubmit={handleAdd} className="space-y-4">
              <h4 className="font-bold mb-4">Add New Contact</h4>
              <input 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500"
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <input 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500"
                placeholder="Phone Number (e.g. +1 234 567 8900)"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
              <select 
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500"
                value={formData.relationship}
                onChange={e => setFormData({ ...formData, relationship: e.target.value })}
              >
                <option value="">Relationship</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Partner">Partner</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
              <div className="flex space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-400"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-rose-600 rounded-xl font-bold text-sm hover:bg-rose-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
