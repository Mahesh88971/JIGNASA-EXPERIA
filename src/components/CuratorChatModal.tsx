import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Bot, 
  User, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { Language } from '../data/translations';

interface CuratorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSelectExperience: (slug: string) => void;
}

interface Message {
  id: string;
  sender: 'curator' | 'user';
  text: string;
  timestamp: string;
  actionSlug?: string;
  actionText?: string;
}

export const CuratorChatModal: React.FC<CuratorChatModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectExperience,
}) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'curator',
      text: currentLang === 'en'
        ? 'Namaskaram! I am Acharya Srinivas Sharma, Principal Cultural Curator at Jignasa Experia. Are you seeking sacred temple darshans, handloom pit-loom masterclasses, or planning an intergenerational family pilgrimage?'
        : 'నమస్కారం! నేను ఆచార్య శ్రీనివాస్ శర్మ, జిజ్ఞాస ఎక్స్‌పీరియా ప్రధాన సాంస్కృతిక క్యూరేటర్‌ని. పవిత్ర దర్శనాలు, చేనేత మగ్గాల పరిశీలన లేదా కుటుంబ యాత్రల రూపకల్పనలో మీకు ఎలా సహాయపడగలను?',
      timestamp: 'Just now',
    },
  ]);

  const quickPrompts = currentLang === 'en'
    ? [
        { label: 'Visiting with elderly parents for temple darshan', slug: 'mangalagiri-sacred-hill-handloom' },
        { label: 'We want hands-on pit loom weaving and zari learning', slug: 'mangalagiri-sacred-hill-handloom' },
        { label: 'How does private chauffeur pickup work?', slug: '' },
        { label: 'Can we book a custom family delegation?', slug: '' },
      ]
    : [
        { label: 'వృద్ధ తల్లిదండ్రులతో దేవాలయ దర్శనం', slug: 'lakshmi-narasimha-temple-experience' },
        { label: 'మంగళగిరి చేనేత మగ్గంపై ప్రత్యక్ష అనుభవం', slug: 'mangalagiri-sacred-hill-handloom' },
        { label: 'విజయవాడ / గుంటూరు నుండి ప్రైవేట్ క్యాబ్ సౌకర్యం', slug: '' },
      ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate smart curated responses
    setTimeout(() => {
      let curatorReply = '';
      let targetSlug = '';
      let actionTitle = '';

      const lower = text.toLowerCase();
      if (lower.includes('parent') || lower.includes('elderly') || lower.includes('mother') || lower.includes('తల్లిదండ్రు')) {
        curatorReply = currentLang === 'en'
          ? 'For families with elders, we arrange dedicated non-climbing priority sanctum access, shaded seating, and personalized archakas. Our "Lakshmi Narasimha Temple Experience" and "Handloom Heritage – Mangalagiri" provide complete wheelchair and hand-rail support throughout.'
          : 'వయోవృద్ధుల కోసం ప్రత్యేక వీల్‌చైర్, మెట్లు ఎక్కే శ్రమ లేని VIP గర్భాలయ దర్శనం మరియు శాంతయుత వాతావరణాన్ని మా సాంస్కృతిక గురువులు ఏర్పాటు చేస్తారు.';
        targetSlug = 'lakshmi-narasimha-temple-experience';
        actionTitle = currentLang === 'en' ? 'View Lakshmi Narasimha Experience' : 'లక్ష్మీ నరసింహ అనుభవాన్ని చూడండి';
      } else if (lower.includes('loom') || lower.includes('handloom') || lower.includes('weav') || lower.includes('చేనేత')) {
        curatorReply = currentLang === 'en'
          ? 'Wonderful! In our Mangalagiri Handloom Immersion, Master Weaver Mallikarjuna Rao opens his 120-year-old courtyard. You sit right inside the pit-loom, cast the shuttle, and weave a piece of genuine Nizam zari border to take home.'
          : 'మా మంగళగిరి నేత అనుభవంలో మీరు నేరుగా గుంటూరు నేత కళాకారుల ఇళ్ళలోకి అడుగుపెట్టి, చేనేత మగ్గంపై జరీ నేయడం నేర్చుకోవచ్చు.';
        targetSlug = 'mangalagiri-sacred-hill-handloom';
        actionTitle = currentLang === 'en' ? 'View Handloom Heritage – Mangalagiri' : 'చేనేత అనుభవాన్ని చూడండి';
      } else if (lower.includes('pickup') || lower.includes('cab') || lower.includes('car') || lower.includes('క్యాబ్')) {
        curatorReply = currentLang === 'en'
          ? 'Our private sanitized AC vehicles pick you up directly from any hotel or residence in Vijayawada (₹1,800/3 guests) or Guntur (₹2,300/3 guests). Our chauffeurs are trained in temple protocols and wait for you throughout the immersion.'
          : 'విజయవాడ లేదా గుంటూరులోని మీ హోటల్ నుండి మా సురక్షిత ఏసీ వాహనం మిమ్మల్ని తీసుకువెళ్ళి, తిరిగి సురక్షితంగా చేరుస్తుంది.';
      } else {
        curatorReply = currentLang === 'en'
          ? 'Every Jignasa Experia journey is privately hosted by generational custodians with zero commercial hurry. May I guide you to explore our flagship sacred experiences?'
          : 'జిజ్ఞాస ఎక్స్‌పీరియా ప్రతి పర్యటనను అత్యున్నత భక్తి శ్రద్ధలతో, ప్రత్యేక సాంస్కృతిక గురువుల సమక్షంలో నిర్వహిస్తుంది.';
        targetSlug = 'mangalagiri-sacred-hill-handloom';
        actionTitle = currentLang === 'en' ? 'Explore Flagship Immersion' : 'ముఖ్య అనుభవాన్ని వీక్షించండి';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'curator',
          text: curatorReply,
          timestamp: 'Just now',
          actionSlug: targetSlug,
          actionText: actionTitle,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF8EA] w-full max-w-lg rounded-2xl shadow-2xl border border-[#966000] overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#A52B23] text-[#FFF8EA] px-6 py-4 flex items-center justify-between border-b-2 border-[#966000]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Acharya Srinivas Sharma"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#966000]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#A52B23] rounded-full" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#FFF8EA]">
                Acharya Srinivas Sharma
              </h3>
              <p className="text-xs text-[#F0B323] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Lead Cultural Curator & Historian</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#FFF8EA]/80 hover:text-white p-1 rounded-full hover:bg-black/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp & Instant Helpline Banner */}
        <div className="bg-[#F8ECD5] px-4 py-2 border-b border-[#F0DDBA] flex items-center justify-between text-xs text-[#66574A]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
            Live Cultural Desk Active
          </span>
          <a
            href="https://wa.me/919440122899"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A52B23] hover:underline font-bold flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>WhatsApp Curator</span>
          </a>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#A52B23] text-white rounded-tr-none'
                    : 'bg-white text-[#211915] border border-[#E9D4B2] rounded-tl-none'
                }`}
              >
                {m.text}

                {/* Direct Action button if suggested */}
                {m.actionSlug && (
                  <button
                    onClick={() => {
                      onSelectExperience(m.actionSlug!);
                      onClose();
                    }}
                    className="mt-3 w-full py-1.5 px-3 bg-[#FFF8EA] hover:bg-[#A52B23] text-[#A52B23] hover:text-white border border-[#A52B23] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>{m.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-[#95806B] px-1 mt-1">{m.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-[#F7EEDC] border-t border-[#F0DDBA] flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.label)}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-[#FFF8EA] text-[#66574A] hover:text-[#A52B23] px-2.5 py-1 rounded-full border border-[#CFB48C] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#FFF8EA] border-t border-[#F0DDBA] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={currentLang === 'en' ? 'Ask Acharya Srinivas anything...' : 'మీ సందేహాన్ని అడగండి...'}
            className="flex-1 bg-white border border-[#CFB48C] rounded-xl px-3.5 py-2 text-xs text-[#211915] focus:outline-none focus:border-[#A52B23]"
          />
          <button
            onClick={() => handleSend()}
            className="bg-[#A52B23] hover:bg-[#791F1A] text-white p-2.5 rounded-xl transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
