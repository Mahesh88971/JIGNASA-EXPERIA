import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Eye, 
  DollarSign, 
  Building2, 
  Clock, 
  FileText,
  MapPin,
  X,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { ConfirmedBooking, Experience } from '../types';
import { EXPERIENCES_DATA } from '../data/experiences';
import { formatINR } from '../utils/pricing';
import { Language } from '../data/translations';
import { publicUrl } from '../utils/publicUrl';

interface AdminPageProps {
  currentLang: Language;
  bookings: ConfirmedBooking[];
  onUpdateBookingStatus: (bookingId: string, newStatus: any) => void;
  onOpenInvoice: (booking: ConfirmedBooking) => void;
  initialExperiences?: Experience[];
  initialBlockedDates?: string[];
  onSaveContent?: (experiences: Experience[], blockedDates: string[]) => Promise<void>;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  currentLang,
  bookings,
  onUpdateBookingStatus,
  onOpenInvoice,
  initialExperiences = EXPERIENCES_DATA,
  initialBlockedDates = [],
  onSaveContent,
}) => {
  // Navigation tabs in Admin
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'experiences' | 'calendar' | 'groups'>('overview');

  // Filter States
  const [filterExperience, setFilterExperience] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Customer Detail Drawer State
  const [selectedBookingForDrawer, setSelectedBookingForDrawer] = useState<ConfirmedBooking | null>(null);

  // Experience Editor State
  const [experiencesList, setExperiencesList] = useState<Experience[]>(initialExperiences);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  // Group Requests (min 25+ or bespoke charter)
  const [groupRequests, setGroupRequests] = useState([
    {
      id: 'grp-01',
      organization: 'Silicon Valley Telugu Heritage Foundation (SVTHF)',
      coordinator: 'Dr. Suresh Babu Kancherla',
      phone: '+1 408 890 1204',
      email: 'suresh@svthf.org',
      groupSize: 34,
      experience: 'Handloom Heritage & Amaravati Mahachaitya',
      requestedDate: '2026-12-22',
      status: 'Pending Review',
      notes: 'Bespoke charter requiring 2 luxury AC coach buses and bilingual English/Telugu Vedic epigraphists.',
    },
    {
      id: 'grp-02',
      organization: 'National Institute of Design (NID) Textile Department',
      coordinator: 'Prof. Anindita Sen',
      phone: '+91 98250 44321',
      email: 'anindita.sen@nid.edu',
      groupSize: 28,
      experience: 'Mangalagiri Pit Looms & Kondapalli Woodcarving',
      requestedDate: '2027-01-14',
      status: 'Pending Review',
      notes: 'Curriculum field study; requesting master weaver interaction certificates.',
    },
  ]);

  // Calendar blocked dates
  const [blockedDates, setBlockedDates] = useState<string[]>(initialBlockedDates);
  const [newDateToBlock, setNewDateToBlock] = useState('');

  // Key KPI stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.pricing.totalAmount : 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Modified').length;
  const avgBookingValue = Math.round(totalRevenue / Math.max(1, bookings.length));

  // Filtered Bookings Table
  const filteredBookings = bookings.filter((b) => {
    if (filterExperience !== 'all' && b.experience.id !== filterExperience) return false;
    if (filterLocation !== 'all' && b.experience.location !== filterLocation) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.customer.fullName.toLowerCase().includes(q);
      const matchCode = b.bookingCode.toLowerCase().includes(q);
      const matchPhone = b.customer.phone.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchPhone) return false;
    }
    return true;
  });

  const handleApproveGroup = (id: string) => {
    setGroupRequests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: 'Approved' } : g))
    );
  };

  const handleAddBlockedDate = async () => {
    if (newDateToBlock && !blockedDates.includes(newDateToBlock)) {
      const next = [...blockedDates, newDateToBlock];
      setBlockedDates(next);
      setNewDateToBlock('');
      try {
        await onSaveContent?.(experiencesList, next);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Unable to save changes');
      }
    }
  };

  return (
    <div className="bg-[#FFF8EA] min-h-screen py-10 text-[#211915]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9D4B2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A52B23]">
              <ShieldCheck className="w-4 h-4 text-[#966000]" />
              <span>AP TOURISM Cultural Operations Desk</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#211915] mt-1">
              Admin & Stewardship Console
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#66574A] bg-white px-3 py-1.5 rounded-full border border-[#CFB48C]">
              Live Server: Active
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-1 border-b border-[#E9D4B2] no-scrollbar text-xs font-semibold">
          {[
            { key: 'overview', label: 'Revenue & Metrics' },
            { key: 'bookings', label: `Bookings (${bookings.length})` },
            { key: 'experiences', label: `Manage Experiences (${experiencesList.length})` },
            { key: 'calendar', label: 'Availability & Slots' },
            { key: 'groups', label: `Group Requests (${groupRequests.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-[#A52B23] text-white shadow-xs font-bold'
                  : 'bg-white text-[#66574A] hover:text-[#211915] border border-[#E9D4B2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & REVENUE DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#766452] block mb-1">
                  Total Cultural Revenue
                </span>
                <div className="font-serif text-3xl font-bold text-[#A52B23]">
                  {formatINR(totalRevenue)}
                </div>
                <div className="mt-2 text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last lunar cycle</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#766452] block mb-1">
                  Active Confirmed Bookings
                </span>
                <div className="font-serif text-3xl font-bold text-[#211915]">
                  {confirmedCount}
                </div>
                <div className="mt-2 text-xs text-[#66574A]">
                  Across 8 Andhra cultural hubs
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#766452] block mb-1">
                  Average Journey Value
                </span>
                <div className="font-serif text-3xl font-bold text-[#966000]">
                  {formatINR(avgBookingValue)}
                </div>
                <div className="mt-2 text-xs text-[#66574A]">
                  Includes private chauffeur & add-ons
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#766452] block mb-1">
                  Assigned Facilitators
                </span>
                <div className="font-serif text-3xl font-bold text-[#211915]">
                  12
                </div>
                <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% On-time sanctum clearance</span>
                </div>
              </div>
            </div>

            {/* Revenue Velocity & Recent Bookings preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5E6CA]">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#211915]">
                      Monthly Pilgrim Inflow & Revenue
                    </h3>
                    <p className="text-xs text-[#66574A]">
                      Tracking high-season temple festivals & winter weaving tours
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#A52B23]">Q4 2026 Peak</span>
                </div>

                {/* Simulated Visual Bar Chart */}
                <div className="h-48 flex items-end gap-6 pt-6 px-4">
                  {[
                    { month: 'Jul', val: 40, amt: '₹4.2L' },
                    { month: 'Aug', val: 55, amt: '₹5.8L' },
                    { month: 'Sep', val: 70, amt: '₹7.5L' },
                    { month: 'Oct', val: 85, amt: '₹9.4L' },
                    { month: 'Nov', val: 100, amt: '₹14.8L' },
                    { month: 'Dec (Proj)', val: 95, amt: '₹13.2L' },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] font-bold text-[#A52B23]">{bar.amt}</span>
                      <div
                        style={{ height: `${bar.val}%` }}
                        className="w-full bg-gradient-to-t from-[#A52B23] to-[#966000] rounded-t-lg transition-all"
                      />
                      <span className="text-xs text-[#66574A] font-medium">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Operational Alerts */}
              <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#211915]">
                  Facilitator Operational Desk
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#FFF8EA] rounded-xl border border-[#E9D4B2] space-y-1">
                    <div className="flex justify-between font-bold text-[#211915]">
                      <span>Mangalagiri Dawn Slot</span>
                      <span className="text-emerald-700">Ready</span>
                    </div>
                    <p className="text-[#66574A]">Acharya Srinivas confirmed panakam vessels & loom passes.</p>
                  </div>

                  <div className="p-3 bg-[#FFF8EA] rounded-xl border border-[#E9D4B2] space-y-1">
                    <div className="flex justify-between font-bold text-[#211915]">
                      <span>Amaravati Chef Annapurna</span>
                      <span className="text-emerald-700">Stocked</span>
                    </div>
                    <p className="text-[#66574A]">Organic Gongura and Guntur chillies sourced from riverbed farm.</p>
                  </div>

                  <div className="p-3 bg-[#FFF8EA] rounded-xl border border-[#E9D4B2] space-y-1">
                    <div className="flex justify-between font-bold text-[#211915]">
                      <span>Govindaraja Tirupati Tour</span>
                      <span className="text-emerald-700">Archana cleared</span>
                    </div>
                    <p className="text-[#66574A]">Pandit Raghunatha Deekshitulu has issued 16 VIP prasadam tokens.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ALL BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural space-y-6">
            {/* Table Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#211915] mb-1">Search Patron / Code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Name, AD-2026-..., phone..."
                    className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-xl pl-8 pr-3 py-2 text-xs"
                  />
                  <Search className="w-3.5 h-3.5 text-[#766452] absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#211915] mb-1">Filter Experience</label>
                <select
                  value={filterExperience}
                  onChange={(e) => setFilterExperience(e.target.value)}
                  className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-xl px-3 py-2 text-xs"
                >
                  <option value="all">All Experiences</option>
                  {EXPERIENCES_DATA.map((e) => (
                    <option key={e.id} value={e.id}>{e.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#211915] mb-1">Filter Location</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-xl px-3 py-2 text-xs"
                >
                  <option value="all">All Locations</option>
                  <option value="Amaravati – Vijayawada">Amaravati – Vijayawada</option>
                  <option value="Guntur">Guntur</option>
                  <option value="Tirupati">Tirupati</option>
                  <option value="Vizag">Vizag</option>
                </select>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto border border-[#E9D4B2] rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FFF8EA] border-b border-[#E9D4B2] text-[#766452] text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Booking ID</th>
                    <th className="py-3 px-4 font-semibold">Patron Details</th>
                    <th className="py-3 px-4 font-semibold">Experience & Date</th>
                    <th className="py-3 px-4 font-semibold">Guests</th>
                    <th className="py-3 px-4 font-semibold">Total Paid</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5E6CA]">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FFF8EA]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#A52B23]">
                        {b.bookingCode}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#211915]">{b.customer.fullName}</div>
                        <div className="text-[11px] text-[#766452]">{b.customer.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#211915]">{b.experience.title}</div>
                        <div className="text-[11px] text-[#66574A]">{b.date} • {b.timeSlot}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#66574A]">
                        {b.adults}A, {b.kids}K
                        <span className="text-[10px] block uppercase font-bold text-[#A52B23]">
                          {b.experienceType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-serif font-bold text-[#211915]">
                        {formatINR(b.pricing.totalAmount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value)}
                          className="bg-[#FFF8EA] border border-[#CFB48C] rounded px-2 py-1 text-[11px] font-semibold text-[#211915]"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Modified">Modified</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedBookingForDrawer(b)}
                          className="p-1.5 rounded-lg bg-[#FFF8EA] hover:bg-[#A52B23] text-[#A52B23] hover:text-white transition-colors"
                          title="View Patron Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenInvoice(b)}
                          className="p-1.5 rounded-lg bg-[#FFF8EA] hover:bg-[#211915] text-[#211915] hover:text-white transition-colors"
                          title="Print / View Invoice"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F5E6CA]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#211915]">
                  Curated Experience Catalog
                </h3>
                <p className="text-xs text-[#66574A]">
                  Add new cultural trails or modify pricing, capacity, and facilitators.
                </p>
              </div>

              <button
                onClick={() =>
                  alert('New Experience creation form activated. You can add Title, Category, Location, Pricing, and Facilitator.')
                }
                className="px-4 py-2 bg-[#A52B23] hover:bg-[#791F1A] text-white rounded-full text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Cultural Immersion</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiencesList.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-[#FFF8EA] rounded-xl p-4 border border-[#E9D4B2] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <img
                      src={publicUrl(exp.heroImage)}
                      alt={exp.title}
                      className="w-full h-36 object-cover rounded-lg"
                    />
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#A52B23]">
                      <span>{exp.category}</span>
                      <span>{exp.location}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#211915]">
                      {exp.title}
                    </h4>
                    <p className="text-xs text-[#66574A] line-clamp-2">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E9D4B2] flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-[#211915]">
                      From {formatINR(exp.startingPrice)}
                    </span>
                    <button
                      onClick={() => setEditingExp(exp)}
                      className="px-3 py-1 bg-white hover:bg-[#A52B23] text-[#A52B23] hover:text-white border border-[#CFB48C] rounded-lg font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AVAILABILITY & CAPACITY CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#211915]">
                Availability & Temple Blackout Calendar
              </h3>
              <p className="text-xs text-[#66574A]">
                Block dates during temple Brahmotsavams, eclipses, or private royal events.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#FFF8EA] p-4 rounded-xl border border-[#E9D4B2]">
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-[#211915] mb-1">
                  Block New Date
                </label>
                <input
                  type="date"
                  value={newDateToBlock}
                  onChange={(e) => setNewDateToBlock(e.target.value)}
                  className="w-full bg-white border border-[#CFB48C] rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <button
                onClick={handleAddBlockedDate}
                className="mt-4 sm:mt-5 px-5 py-2.5 bg-[#A52B23] hover:bg-[#791F1A] text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                Mark Date Unavailable
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#766452] mb-3">
                Currently Blocked Sanctuary Dates
              </h4>
              <div className="flex flex-wrap gap-2">
                {blockedDates.map((d) => (
                  <div
                    key={d}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-800 rounded-lg border border-red-200 text-xs font-medium"
                  >
                    <span>{d}</span>
                    <button
                      onClick={async () => {
                        const next = blockedDates.filter((x) => x !== d);
                        setBlockedDates(next);
                        try {
                          await onSaveContent?.(experiencesList, next);
                        } catch (error) {
                          alert(error instanceof Error ? error.message : 'Unable to save changes');
                        }
                      }}
                      className="text-red-600 hover:text-red-900 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GROUP BOOKINGS APPROVAL DESK (25+ Guests) */}
        {activeTab === 'groups' && (
          <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#211915]">
                Large Delegation & Group Charter Approvals (25+ Guests)
              </h3>
              <p className="text-xs text-[#66574A]">
                Review custom charters requested by universities, NRI cultural trusts, and extended family reunions.
              </p>
            </div>

            <div className="space-y-4">
              {groupRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#FFF8EA] rounded-xl p-6 border border-[#E9D4B2] flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#A52B23] uppercase text-[10px] tracking-wider bg-white px-2 py-0.5 rounded border border-[#E9D4B2]">
                        {req.groupSize} Guests
                      </span>
                      <span className="font-semibold text-[#211915]">Date: {req.requestedDate}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#211915]">
                      {req.organization}
                    </h4>

                    <p className="text-[#66574A]">
                      <strong>Coordinator:</strong> {req.coordinator} ({req.phone} • {req.email})
                    </p>

                    <p className="text-[#524033] bg-white p-3 rounded-lg border border-[#E9D4B2]">
                      <strong>Notes:</strong> {req.notes}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-between gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>

                    {req.status !== 'Approved' && (
                      <button
                        onClick={() => handleApproveGroup(req.id)}
                        className="px-5 py-2 rounded-full bg-[#A52B23] hover:bg-[#791F1A] text-white text-xs font-semibold shadow-xs"
                      >
                        Approve & Allocate Chauffeurs
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Customer Details Drawer Modal */}
      {selectedBookingForDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#966000] p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9D4B2]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#211915]">Patron Dossier</h3>
                <span className="text-[#A52B23] font-mono font-bold">{selectedBookingForDrawer.bookingCode}</span>
              </div>
              <button
                onClick={() => setSelectedBookingForDrawer(null)}
                className="text-[#766452] hover:text-[#211915]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#766452] block">Full Name</span>
                <span className="font-serif text-sm font-bold text-[#211915]">
                  {selectedBookingForDrawer.customer.fullName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#766452] block">Phone / WhatsApp</span>
                  <span className="text-[#211915]">{selectedBookingForDrawer.customer.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#766452] block">Email</span>
                  <span className="text-[#211915]">{selectedBookingForDrawer.customer.email}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#766452] block">Experience & Date</span>
                <span className="text-[#A52B23] font-medium block">
                  {selectedBookingForDrawer.experience.title}
                </span>
                <span className="text-[#66574A]">
                  {selectedBookingForDrawer.date} at {selectedBookingForDrawer.timeSlot}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#766452] block">Special Notes & Dietary</span>
                <p className="bg-[#FFF8EA] p-2.5 rounded-lg border border-[#E9D4B2] text-[#66574A]">
                  {selectedBookingForDrawer.customer.specialNotes || 'No special dietary requests logged.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F5E6CA]">
                <button
                  onClick={() => {
                    onOpenInvoice(selectedBookingForDrawer);
                    setSelectedBookingForDrawer(null);
                  }}
                  className="w-full py-2.5 bg-[#A52B23] text-white rounded-full font-semibold"
                >
                  Generate Tax Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Editor Drawer Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-[#966000] space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9D4B2]">
              <h3 className="font-serif text-lg font-bold text-[#211915]">
                Edit Experience: {editingExp.title}
              </h3>
              <button onClick={() => setEditingExp(null)}>✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#211915] mb-1">Title</label>
                <input
                  type="text"
                  value={editingExp.title}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#211915] mb-1">Starting Price (₹)</label>
                <input
                  type="number"
                  value={editingExp.startingPrice}
                  onChange={(e) => setEditingExp({ ...editingExp, startingPrice: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#211915] mb-1">Description</label>
                <textarea
                  rows={4}
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-lg p-2 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 border rounded-full font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const next = experiencesList.map((x) => (x.id === editingExp.id ? editingExp : x));
                    setExperiencesList(next);
                    setEditingExp(null);
                    try {
                      await onSaveContent?.(next, blockedDates);
                    } catch (error) {
                      alert(error instanceof Error ? error.message : 'Unable to save changes');
                    }
                  }}
                  className="px-5 py-2 bg-[#A52B23] text-white rounded-full font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
