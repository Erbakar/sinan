
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageSquare, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';
import { CONTACT_INFO } from '../constants';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Merhaba! Ben Side Sigorta Yapay Zeka Danışmanı. Size en uygun sigorta teklifleri ve poliçe detayları hakkında nasıl yardımcı olabilirim?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Fix: Always initialize GoogleGenAI with the API key from environment right before the call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        // Fix: Simplified contents format for single turn text prompts
        contents: userMessage,
        config: {
          systemInstruction: `Sen Side Sigorta (sidesigorta.com.tr) acentesinin resmi yapay zeka asistanısın. 
          Kullanıcılara sigorta türleri (Kasko, Trafik, DASK, Tamamlayıcı Sağlık, Konut vb.) hakkında bilgi ver. 
          Samimi, profesyonel ve güven verici bir dil kullan. 
          Eğer detaylı bir teklif isterlerse, iletişim formunu doldurmalarını veya ${CONTACT_INFO.phone} numarasını aramalarını söyle. 
          Adresimiz: ${CONTACT_INFO.address}.
          Yanıtlarını kısa ve öz tut. Sadece sigorta ile ilgili soruları yanıtla.`
        }
      });

      // Fix: Access response.text as a property, not a method
      const aiResponse = response.text || "Şu an yanıt veremiyorum, lütfen daha sonra tekrar deneyin veya bizi arayın.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Üzgünüm, bir bağlantı sorunu oluştu. Lütfen direkt olarak bizi arayın." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">AI Danışman</p>
                <p className="text-xs text-blue-100">Çevrimiçi</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-4 space-y-4 bg-slate-50"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Sorunuzu buraya yazın..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 group-hover:ml-2 font-medium whitespace-nowrap">
            Sorun Yanıtlayalım
          </span>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
