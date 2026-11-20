import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, Calendar, MapPin, Users, HeartHandshake } from 'lucide-react';
import { Language } from '../data/translations';

interface PlanPrivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const PlanPrivateModal: React.FC<PlanPrivateModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Amaravati – Vijayawada',
    guestsCount: 4,
    preferredDate: '',
    interests: ['Temples & Spirituality', 'Handlooms & Handicrafts'],
    specialRequests: '',
  });

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF8EA] w-full max-w-xl rounded-2xl shadow-2xl border border-[#966000] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#A52B23] text-[#FFF8EA] px-6 py-4 flex items-center justify-between border-b-2 border-[#966000]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#F0B323]" />
            <div>
              <h3 className="font-serif text-lg font-bold">
                {currentLang === 'en' ? 'Curate a Private Experience' : 'ప్రత్యేక సాంస్కృతిక ప్రయాణ రూపకల్పన'}
              </h3>
              <p className="text-xs text-[#EDE0C7]">
                {currentLang === 'en' ? 'Bespoke itineraries, private facilitators & private transport' : 'మీ కుటుంబానికి సరిపోయే విధంగా ప్రత్యేక రూపకల్పన'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:text-white hover:bg-black/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center border-2 border-emerald-500">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#211915]">
                {currentLang === 'en' ? 'Bespoke Request Received' : 'మీ అభ్యర్థన విజయవంతంగా చేరింది'}
              </h4>
              <p className="text-sm text-[#66574A] max-w-md mx-auto leading-relaxed">
                {currentLang === 'en'
                  ? `Thank you, ${formData.fullName}. Acharya Srinivas Sharma or our Senior Cultural Concierge will reach out via WhatsApp/Phone at ${formData.phone} within 4 business hours with a custom itinerary & sacred darshan protocol.`
                  : `ధన్యవాదాలు ${formData.fullName}. మా సాంస్కృతిక క్యూరేటర్ త్వరలోనే మీతో సంప్రదిస్తారు.`}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#A52B23] text-white rounded-full text-xs font-semibold hover:bg-[#791F1A] transition-all"
                >
                  {currentLang === 'en' ? 'Close Window' : 'ముగించు'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    {currentLang === 'en' ? 'Full Name *' : 'పూర్తి పేరు *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Radhika Reddy"
                    className="w-full bg-white border border-[#CFB48C] rounded-xl px-3 py-2 focus:outline-none focus:border-[#A52B23]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    {currentLang === 'en' ? 'Email Address *' : 'ఈమెయిల్ *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="radhika@example.com"
                    className="w-full bg-white border border-[#CFB48C] rounded-xl px-3 py-2 focus:outline-none focus:border-[#A52B23]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    {currentLang === 'en' ? 'WhatsApp / Phone *' : 'ఫోన్ / వాట్సాప్ *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210 / +1..."
                    className="w-full bg-white border border-[#CFB48C] rounded-xl px-3 py-2 focus:outline-none focus:border-[#A52B23]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    {currentLang === 'en' ? 'Preferred Location' : 'ప్రాంతం'}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-[#CFB48C] rounded-xl px-3 py-2 focus:outline-none focus:border-[#A52B23]"
                  >
                    <option value="Amaravati – Vijayawada">Amaravati – Vijayawada</option>
                    <option value="Guntur">Guntur & Mangalagiri</option>
                    <option value="Tirupati">Tirupati & Chandragiri</option>
                    <option value="Vizag">Vizag & Araku Coast</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    {currentLang === 'en' ? 'Tentative Date' : 'తేదీ'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-white border border-[#CFB48C] rounded-xl px-3 py-2 focus:outline-none focus:border-[#A52B23]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    {currentLang === 'en' ? 'Estimated Guests' : 'యాత్రికుల సంఖ్య'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white border border-[#CFB48C] rounded-xl px-3 py-2 focus:outline-none focus:border-[#A52B23]"
                  />
                </div>
              </div>

              {/* Cultural Interests Checkbox Chips */}
              <div>
                <label className="block font-medium text-[#211915] mb-1.5">
                  {currentLang === 'en' ? 'Cultural Interests (Select All That Apply)' : 'మీ ఆసక్తులు'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Temples & Sacred Rituals',
                    'Handlooms & Pit Looms',
                    'Traditional Andhra Feasts',
                    'Medieval Forts & History',
                    'Krishna River Sunset Boat',
                    'Kondapalli Wood Carving',
                  ].map((interest) => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
                          isSelected
                            ? 'bg-[#A52B23] text-white border-[#A52B23]'
                            : 'bg-white text-[#66574A] border-[#CFB48C] hover:border-[#A52B23]'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#211915] mb-1">
                  {currentLang === 'en' ? 'Special Notes (Elderly Assistance, Dietary, etc.)' : 'ప్రత్యేక అవసరాలు / సూచనలు'}
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder={currentLang === 'en' ? 'e.g. Traveling with grandmother aged 82; request minimal walking and strictly Sattvic onion/garlic-free lunch.' : 'ఉదాహరణకు వృద్ధుల సహకారం లేదా ప్రత్యేక భోజనం...'}
                  className="w-full bg-white border border-[#CFB48C] rounded-xl p-3 focus:outline-none focus:border-[#A52B23]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#A52B23] hover:bg-[#791F1A] text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? 'Dispatch to Cultural Curator' : 'క్యూరేటర్‌కు పంపండి'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
