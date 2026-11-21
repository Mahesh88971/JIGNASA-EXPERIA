import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle, Shield, HeartHandshake } from 'lucide-react';
import { Language } from '../data/translations';

interface FAQPageProps {
  currentLang: Language;
  onOpenCurator: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ currentLang, onOpenCurator }) => {
  const [activeCategory, setActiveCategory] = useState<string>('about');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const faqData = [
    {
      category: 'about',
      categoryLabel: currentLang === 'en' ? 'About AP TOURISM' : 'AP TOURISM నేపథ్యం',
      items: [
        {
          id: 'faq-1',
          question: currentLang === 'en'
            ? 'What makes AP TOURISM different from ordinary tourism companies?'
            : 'సాధారణ పర్యాటక సంస్థలతో పోలిస్తే AP TOURISM ప్రత్యేకత ఏమిటి?',
          answer: currentLang === 'en'
            ? 'We do not run hurried bus tours or commercial sightseeing. AP TOURISM is a cultural conservancy. Every immersion is slow, participatory, and led by living custodians—Vedic temple epigraphists, 4th-generation master weavers, and culinary ethnographers. You don’t just watch; you weave on pit-looms, pound Gongura on granite stones, and receive blessed temple darshans without long queues.'
            : 'మేము హడావుడి బస్సు టూర్లు నిర్వహించము. మాది ఒక సాంస్కృతిక సంస్థ. పండితులు, చేనేత శిల్పులు మరియు పాకశాస్త్రజ్ఞుల సమక్షంలో ప్రత్యక్ష అనుభవాలను అందిస్తాము.',
        },
        {
          id: 'faq-2',
          question: currentLang === 'en'
            ? 'Who are the Cultural Facilitators?'
            : 'సాంస్కృతిక మార్గదర్శకులు (ఫెసిలిటేటర్స్) ఎవరు?',
          answer: currentLang === 'en'
            ? 'Our facilitators are scholars, authors, and master artisans native to their regions. For example, Acharya Srinivas Sharma has spent 18 years studying Krishna delta loom math, while Dr. Gayatri Devi is an ethnographer restoring Satavahana recipes.'
            : 'మా ఫెసిలిటేటర్లు ఆయా రంగాలలో దశాబ్దాల అనుభవం కలిగిన పండితులు, పరిశోధకులు మరియు జాతీయ అవార్డు గ్రహీతలు.',
        },
      ],
    },
    {
      category: 'booking',
      categoryLabel: currentLang === 'en' ? 'Booking & Cancellation Policy' : 'బుకింగ్ మరియు రద్దు విధానం',
      items: [
        {
          id: 'faq-3',
          question: currentLang === 'en'
            ? 'What is your cancellation and rescheduling policy?'
            : 'రద్దు మరియు మార్పు నిబంధనలు ఏమిటి?',
          answer: currentLang === 'en'
            ? 'We offer 100% free cancellations and full refunds up to 24 hours prior to your scheduled immersion time. You can also edit your add-ons (chauffeured pickup, puja tickets, souvenir kits) directly in your Patron Dashboard up to 24 hours before start time.'
            : 'అనుభవం ప్రారంభ సమయానికి 24 గంటల ముందు వరకు ఎటువంటి రుసుము లేకుండా 100% పూర్తి వాపసుతో రద్దు చేసుకోవచ్చు.',
        },
        {
          id: 'faq-4',
          question: currentLang === 'en'
            ? 'Can I transfer my booking to a family member?'
            : 'బుకింగ్‌ను కుటుంబ సభ్యుల పేరు మీదకు మార్చవచ్చా?',
          answer: currentLang === 'en'
            ? 'Yes. Simply notify our Cultural Concierge on WhatsApp or update the customer details in your portal at least 12 hours prior to the experience.'
            : 'అవును, క్యూరేటర్‌కు వాట్సాప్ ద్వారా లేదా పోర్టల్‌లో సమాచారం ఇచ్చి సులభంగా మార్చుకోవచ్చు.',
        },
      ],
    },
    {
      category: 'dresscode',
      categoryLabel: currentLang === 'en' ? 'Dress Code & Sacred Etiquette' : 'దుస్తుల నియమావళి & పద్ధతులు',
      items: [
        {
          id: 'faq-5',
          question: currentLang === 'en'
            ? 'What is the required dress code for temple darshans (Mangalagiri & Tirupati)?'
            : 'దేవాలయ దర్శనాల సమయంలో ధరించాల్సిన దుస్తులు ఏమిటి?',
          answer: currentLang === 'en'
            ? 'Traditional Indian attire is respectful and mandatory for inner sanctum entry. For Men: Dhoti with Angavastram or Kurta-Pyjama. For Women: Saree, Half-Saree, or Salwar Kameez with Dupatta. We provide blessed handloom angavastrams as part of your welcome kit.'
            : 'పురుషులకు ధోతి లేదా కుర్తా-పైజామా, స్త్రీలకు చీర లేదా పంజాబీ డ్రెస్ అనుకూలం. మేము ప్రత్యేక చేనేత ఉత్తరీయాలను అందిస్తాము.',
        },
        {
          id: 'faq-6',
          question: currentLang === 'en'
            ? 'Are mobile phones and photography permitted inside temple sanctums?'
            : 'గర్భాలయాల్లో ఫోటోగ్రఫీ అనుమతిస్తుందా?',
          answer: currentLang === 'en'
            ? 'In accordance with temple Agamic traditions, cameras and mobile devices are kept safely in authorized sanctum deposit counters. External temple architecture and courtyard photography are permitted.'
            : 'ఆగమ సంప్రదాయాల ప్రకారం గర్భాలయం వెలుపల మాత్రమే ఫోటోగ్రఫీకి అనుమతి ఉంటుంది.',
        },
      ],
    },
    {
      category: 'safety',
      categoryLabel: currentLang === 'en' ? 'Safety & Accessibility' : 'రక్షణ & వయోవృద్ధుల సౌకర్యాలు',
      items: [
        {
          id: 'faq-7',
          question: currentLang === 'en'
            ? 'Is the experience feasible for senior citizens and elderly grandparents?'
            : 'వృద్ధ తల్లిదండ్రులకు ఈ ప్రయాణం అనుకూలమేనా?',
          answer: currentLang === 'en'
            ? 'Absolutely. We specialize in intergenerational journeys. At Mangalagiri and Tirupati, our facilitators coordinate special non-climbing ramps, battery car transfers where available, and shaded resting pavilions with cool drinking water.'
            : 'తప్పకుండా. వయోవృద్ధుల కోసం ప్రత్యేక ర్యాంపులు, తక్కువ నడక మరియు విశ్రాంతి ప్రదేశాలు అందుబాటులో ఉంటాయి.',
        },
        {
          id: 'faq-8',
          question: currentLang === 'en'
            ? 'What medical and hygiene standards are followed?'
            : 'ఆరోగ్య మరియు పరిశుభ్రత ప్రమాణాలు ఎలా ఉంటాయి?',
          answer: currentLang === 'en'
            ? 'All private chauffeurs maintain first-aid and hydration kits. Meals served are prepared in hygienic, verified generational kitchens following Sattvic culinary principles.'
            : 'ప్రతి వాహనంలో ప్రథమ చికిత్స కిట్లు ఉంటాయి. భోజనం అత్యంత పరిశుభ్రమైన వాతావరణంలో తయారుచేయబడుతుంది.',
        },
      ],
    },
    {
      category: 'payments',
      categoryLabel: currentLang === 'en' ? 'Payments & GST Refunds' : 'చెల్లింపులు & జీఎస్టీ ఇన్వాయిస్',
      items: [
        {
          id: 'faq-9',
          question: currentLang === 'en'
            ? 'Do you provide official GST invoices for corporate or institutional reimbursements?'
            : 'కార్పొరేట్ మరియు జీఎస్టీ ఇన్వాయిస్ లభిస్తుందా?',
          answer: currentLang === 'en'
            ? 'Yes! Every booking immediately generates an official tax invoice with GSTIN (SAC Code: 998555 - Cultural Tourism & Conservancy Services). You can print or download the PDF anytime from your Patron Dashboard.'
            : 'అవును, ప్రతి బుకింగ్‌కు అధికారిక జీఎస్టీ ఇన్వాయిస్ తక్షణమే లభిస్తుంది.',
        },
        {
          id: 'faq-10',
          question: currentLang === 'en'
            ? 'Can international guests pay using overseas cards without Indian OTP?'
            : 'విదేశీ క్రెడిట్ కార్డులతో చెల్లించవచ్చా?',
          answer: currentLang === 'en'
            ? 'Yes. Our Stripe international checkout accepts US, UK, Singapore, Australia, UAE, and Canadian credit/debit cards seamlessly with 3D-secure fraud protection.'
            : 'అవును, అంతర్జాతీయ స్ట్రైప్ గేట్‌వే ద్వారా విదేశీ కార్డులు సులభంగా ఆమోదించబడతాయి.',
        },
      ],
    },
    {
      category: 'groups',
      categoryLabel: currentLang === 'en' ? 'Group Charters & VIP Delegations' : 'సమూహ బుకింగ్‌లు & ప్రత్యేక చార్టర్లు',
      items: [
        {
          id: 'faq-11',
          question: currentLang === 'en'
            ? 'How do group bookings (10 to 25+ guests) work?'
            : '10 నుండి 25+ మంది సమూహ బుకింగ్ ఎలా పనిచేస్తుంది?',
          answer: currentLang === 'en'
            ? 'For groups of 10–17 guests, special discounted rates of ₹2,200/adult apply. For 18–25 guests, rates reduce to ₹2,000/adult. For delegations larger than 25 guests (extended weddings, NRI trusts, university study tours), our VIP desk arranges bespoke luxury coaches, customized banquets, and dedicated scholars.'
            : '10 మంది కంటే ఎక్కువ ఉన్న సమూహాలకు ప్రత్యేక రాయితీలు మరియు 25 కంటే ఎక్కువ ఉన్న బృందాలకు ప్రత్యేక లగ్జరీ బస్సు సౌకర్యాలు కల్పిస్తాము.',
        },
      ],
    },
  ];

  const currentCategoryData = faqData.find((c) => c.category === activeCategory) || faqData[0];

  return (
    <div className="bg-[#FFF8EA] min-h-screen py-16 text-[#211915]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A52B23]">
            <HelpCircle className="w-3.5 h-3.5 text-[#966000]" />
            <span>{currentLang === 'en' ? 'Patron Guide & Clarity' : 'సందేహాలు & సమాధానాలు'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211915]">
            Frequently Answered Questions
          </h1>
          <p className="text-sm text-[#66574A] max-w-xl mx-auto font-light">
            Everything you need to know about preparing for your cultural immersion, sacred temple protocols, and booking flexibility.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {faqData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.category
                  ? 'bg-[#A52B23] text-white shadow-xs'
                  : 'bg-white text-[#66574A] hover:text-[#211915] border border-[#E9D4B2]'
              }`}
            >
              {cat.categoryLabel}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9D4B2] shadow-cultural space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#211915] pb-3 border-b border-[#F5E6CA]">
            {currentCategoryData.categoryLabel}
          </h2>

          <div className="divide-y divide-[#F5E6CA]">
            {currentCategoryData.items.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div key={item.id} className="py-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-serif text-base font-bold text-[#211915] group-hover:text-[#A52B23] transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A52B23] shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-3 text-xs sm:text-sm text-[#66574A] leading-relaxed animate-fadeIn pl-1">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Need bespoke answers? */}
        <div className="bg-[#F7EEDC] rounded-2xl p-8 border border-[#E9D4B2] text-center space-y-4">
          <Sparkles className="w-6 h-6 text-[#966000] mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#211915]">
            Have a unique ritual or travel requirement?
          </h3>
          <p className="text-xs text-[#66574A] max-w-md mx-auto">
            Our Senior Cultural Facilitators can accommodate special nakshatra pujas, bespoke dietary restrictions, and wheelchair escorts.
          </p>
          <button
            onClick={onOpenCurator}
            className="px-6 py-2.5 rounded-full bg-[#A52B23] hover:bg-[#791F1A] text-white text-xs font-semibold shadow-xs"
          >
            Speak with an Experience Curator
          </button>
        </div>
      </div>
    </div>
  );
};
