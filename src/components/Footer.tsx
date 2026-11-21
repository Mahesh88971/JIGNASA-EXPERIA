import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { usePortalContent } from '../data/portalStore';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: string, experienceSlug?: string) => void;
  onOpenCurator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate, onOpenCurator }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const { experiences } = usePortalContent();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#211915] text-[#FFF8EA] pt-20 pb-12 border-t-4 border-[#A52B23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#524033]">
          {/* Col 1: About AP TOURISM */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A52B23] border border-[#966000] flex items-center justify-center">
                <span className="font-serif font-bold text-base text-[#FFF8EA]">AT</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FFF8EA]">
                {t.brandName}
              </span>
            </div>
            <p className="text-sm text-[#C4B39B] leading-relaxed max-w-sm">
              {currentLang === 'en'
                ? 'AP TOURISM is a premium cultural tourism atelier. We curate intimate, transformative journeys led by temple scholars, master handloom weavers, and generational custodians across sacred Andhra Pradesh.'
                : 'AP TOURISM ఒక విశిష్ట సాంస్కృతిక సంస్థ. పవిత్ర క్షేత్రాలు, చేనేత కళాకారులు మరియు ప్రాచీన వారసత్వ సంపదను ప్రపంచానికి సజీవంగా అందించే విశిష్ట వేదిక.'}
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-[#A52B23]/40 border border-[#966000]/40 rounded-full text-xs text-[#F0B323] font-serif italic">
                “{t.tagline}”
              </span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-3">
              <a 
                href="#instagram" 
                className="w-9 h-9 rounded-full bg-[#422E23] hover:bg-[#A52B23] flex items-center justify-center text-[#FFF8EA] transition-colors"
                title="Instagram @APTourism"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#youtube" 
                className="w-9 h-9 rounded-full bg-[#422E23] hover:bg-[#A52B23] flex items-center justify-center text-[#FFF8EA] transition-colors"
                title="YouTube Chronicles"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <button 
                onClick={onOpenCurator} 
                className="w-9 h-9 rounded-full bg-[#966000] hover:bg-[#F6C552] flex items-center justify-center text-[#211915] transition-colors font-bold"
                title="Direct Concierge Line"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Experiences Directory */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#966000] font-bold">
              {currentLang === 'en' ? 'Curated Immersions' : 'ముఖ్య అనుభవాలు'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4B39B]">
              {experiences.slice(0, 6).map((exp) => (
                <li key={exp.id}>
                  <button
                    onClick={() => onNavigate('experience-detail', exp.slug)}
                    className="hover:text-[#FFF8EA] hover:underline text-left transition-colors"
                  >
                    {currentLang === 'en' ? exp.title : exp.teluguTitle}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="text-[#F0B323] hover:underline font-semibold flex items-center gap-1 pt-1"
                >
                  <span>{currentLang === 'en' ? 'View all 9 journeys →' : 'అన్ని 9 అనుభవాలు చూడండి →'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: FAQs & Policies */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#966000] font-bold">
              {currentLang === 'en' ? 'Guest Care & Policies' : 'సహాయం & విధానాలు'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4B39B]">
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#FFF8EA] transition-colors">
                  {currentLang === 'en' ? 'About AP TOURISM' : 'AP TOURISM నేపథ్యం'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#FFF8EA] transition-colors">
                  {currentLang === 'en' ? 'Sacred Temple Dress Codes' : 'దేవాలయ దుస్తుల నియమావళి'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#FFF8EA] transition-colors">
                  {currentLang === 'en' ? 'Cancellations & 24hr Rescheduling' : 'రద్దు మరియు మార్పు విధానం'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#FFF8EA] transition-colors">
                  {currentLang === 'en' ? 'Elderly & Wheelchair Accessibility' : 'వయోవృద్ధుల ప్రత్యేక సౌకర్యాలు'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#FFF8EA] transition-colors">
                  {currentLang === 'en' ? 'Group Charters (25+ Guests)' : 'సమూహ చార్టర్ సదుపాయాలు'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#966000] font-bold">
              {currentLang === 'en' ? 'Cultural Concierge' : 'కార్యాలయ చిరునామా'}
            </h4>
            <div className="space-y-2 text-xs text-[#C4B39B]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#966000] shrink-0 mt-0.5" />
                <span>AP TOURISM Cultural Pavilion, Mangalagiri Ghat Road, Amaravati Belt 522503</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#966000] shrink-0" />
                <span>+91 866 248 9800 / +91 94401 22899</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#966000] shrink-0" />
                <span>concierge@aptourism.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-2">
              <h5 className="text-[11px] font-semibold text-[#FFF8EA] mb-1.5">
                {currentLang === 'en' ? 'The AP TOURISM Cultural Chronicle' : 'AP TOURISM సాంస్కృతిక పత్రిక'}
              </h5>
              <p className="text-[11px] text-[#95806B] mb-2">
                {currentLang === 'en' ? 'Curated essays, temple festival calendars & seasonal rituals.' : 'ప్రత్యేక పండుగల వివరాలు మరియు సంప్రదాయ వైభవం.'}
              </p>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-xs text-[#F0B323] bg-[#A52B23]/30 p-2 rounded border border-[#966000]/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? 'Welcome to our cultural fraternity.' : 'మా సాంస్కృతిక పరివారంలోకి స్వాగతం.'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#422E23] border border-[#5D4534] rounded px-3 py-1.5 text-xs text-white placeholder-[#95806B] focus:outline-none focus:border-[#966000]"
                  />
                  <button
                    type="submit"
                    className="bg-[#A52B23] hover:bg-[#C44A3D] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#95806B] gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 {t.brandName}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer" onClick={() => onNavigate('faq')}>Privacy Policy</span>
            <span className="hover:underline cursor-pointer" onClick={() => onNavigate('faq')}>Terms of Cultural Stewardship</span>
            <span className="hover:underline cursor-pointer" onClick={() => onNavigate('faq')}>Authenticity Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
