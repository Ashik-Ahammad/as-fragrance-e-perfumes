'use client';
import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "8801575606733";

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setMessage("");
    setIsOpen(false);
  };

  return (

    <div className="fixed bottom-6 right-6 z-9999 font-sans">

      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div className="mb-4 w-[320px] bg-[#171721] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300 origin-bottom-right">
          <div className="bg-[#25D366] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                <FaWhatsapp />
              </div>
              <div>
                <h4 className="font-bold text-sm">AS Fragrance</h4>
                <p className="text-[10px] opacity-90">Usually replies in minutes</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded-lg transition-colors">
              <FaTimes />
            </button>
          </div>

          <div className="p-4 h-48 bg-[#0b141a] overflow-y-auto">
            <div className="bg-[#202c33] text-gray-200 p-3 rounded-lg rounded-tl-none shadow-md text-xs max-w-[85%] border border-white/5">
              Hi there! How can I help you today?
              <div className="text-[9px] text-gray-500 mt-1 text-right">10:14 AM</div>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-[#1c1c27] flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-[#25D366] transition-all"
            />
            <button type="submit" className="bg-[#25D366] text-white p-2.5 rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg">
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center hover:cursor-pointer justify-center text-3xl text-white shadow-2xl transition-all duration-500 ${
          isOpen
            ? 'bg-gray-800 rotate-180'
            : 'bg-[#25D366] hover:bg-[#20bd5a] shadow-[#25D366]/30'
        }`}
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaWhatsapp />}
      </button>
    </div>
  );
};

export default WhatsAppWidget;