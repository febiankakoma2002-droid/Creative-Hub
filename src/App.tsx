/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderKanban, 
  Users, 
  MoreHorizontal, 
  Plus, 
  ChevronRight, 
  Search, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowLeft,
  Settings,
  LogOut,
  Facebook,
  Instagram,
  BarChart3,
  Calculator,
  FileText,
  Truck,
  Palette,
  CheckCircle2,
  Lock,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

type Tab = 'home' | 'learn' | 'projects' | 'crm' | 'more';
type SubTab = 'dashboard' | 'modules' | 'lesson' | 'services' | 'tshirt' | 'social' | 'ads' | 'contact' | 'pricing' | 'client-profile' | 'invoice' | 'suppliers' | 'profile';

// --- Mock Data ---

const PROJECTS = [
  { id: 1, title: '10 Corporate Tees for A&G Finance', client: 'A&G Finance', status: 'Design Approved', statusColor: 'text-blue-400', deadline: '2026-04-20' },
  { id: 2, title: 'School Uniform T-Shirts', client: 'Kabwe Secondary', status: 'In Printing', statusColor: 'text-orange-400', deadline: '2026-04-22' },
  { id: 3, title: 'Event Merch for Creative Workshop', client: 'Local Workshop', status: 'Ready for Delivery', statusColor: 'text-green-400', deadline: '2026-04-18' },
];

const CLIENTS = [
  { id: 1, name: 'A&G Finance', contact: 'Brad Johnson', phone: '+260 771 123 456', lastProject: 'Company Profile & T-Shirts', status: 'Design Approved', followUp: 'Tomorrow', value: 'K12,500' },
  { id: 2, name: 'Kabwe Secondary School', contact: 'Principal Mwape', phone: '+260 772 234 567', lastProject: 'School Uniform T-Shirts', status: 'In Printing', followUp: 'Next Week', value: 'K4,850' },
  { id: 3, name: 'Creative Workshop Client', contact: 'Sarah Phiri', phone: '+260 773 345 678', lastProject: 'Glass Award', status: 'Delivered', followUp: 'None', value: 'K1,200' },
];

const LEARN_MODULES = [
  { id: 'canva', title: 'Canva Mastery', progress: 85, icon: Smartphone, color: 'bg-blue-500' },
  { id: 'logo', title: 'Logo Design Secrets', progress: 45, icon: Palette, color: 'bg-orange-500' },
  { id: 'printing', title: 'Printing Techniques in Zambia', progress: 30, icon: Truck, color: 'bg-yellow-500' },
  { id: 'gifts', title: 'Gifts & Awards Mastery', progress: 15, icon: Lock, color: 'bg-blue-600' },
];

const SERVICES = [
  'Logo Design', 'Business Card Design', 'Flyers & Posters', 'Social Media Graphics', 
  'Book Cover Design', 'Banner Design', 'Branding & Visual Identity', 
  'T-Shirt Branding & Printing', 'Photo Shoot and Editing', 
  'Invitation & Card Design', 'Wedding Poster'
];

// --- Components ---

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#F27D26] via-[#F7971E] to-[#FFD200] rounded-xl overflow-hidden shrink-0 shadow-lg">
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="relative text-[#050B1F] font-black text-2xl leading-none z-10">CH</div>
      <div className="absolute -top-1 -right-1 w-8 h-8 border-[3px] border-transparent border-t-[#0052D4] rounded-full transform rotate-45"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-white font-bold text-lg tracking-tight leading-none">Creative Hub</span>
      <span className="text-[#F7971E] text-[10px] font-bold uppercase tracking-widest mt-0.5">Manager Edition</span>
    </div>
  </div>
);

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center gap-1 w-full relative h-full transition-all duration-300",
      active ? "text-[#F7971E]" : "text-[#94A3B8] opacity-60"
    )}
  >
    <Icon size={20} />
    {active && (
      <motion.div 
        layoutId="nav-indicator" 
        className="w-1.5 h-1.5 bg-[#F7971E] rounded-full mt-1" 
      />
    )}
  </button>
);

const SectionHeader = ({ title, showBack, onBack }: { title: string, showBack?: boolean, onBack?: () => void }) => (
  <div className="flex items-center gap-4 py-4 px-6 border-b border-white/5 sticky top-0 bg-[#050B1F]/95 backdrop-blur-xl z-30">
    {showBack && (
      <button onClick={onBack} className="text-white hover:text-[#F7971E] transition-colors p-1">
        <ArrowLeft size={22} />
      </button>
    )}
    <h1 className="text-lg font-bold text-white flex-1 tracking-tight">{title}</h1>
    <Logo className="scale-75 origin-right" />
  </div>
);

const Card = ({ children, className, onClick, key }: { children: React.ReactNode, className?: string, onClick?: () => void, key?: any }) => (
  <div 
    key={key}
    onClick={onClick}
    className={cn("bg-[#0E1A3D] rounded-[20px] p-5 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] border border-white/5", className)}
  >
    {children}
  </div>
);

const ActionButton = ({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-3 p-4 bg-[#0E1A3D] border border-white/10 rounded-2xl group w-full transition-all hover:scale-[1.02] active:scale-95"
  >
    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg", color)}>
      <Icon size={20} className="text-white" />
    </div>
    <span className="text-[10px] text-center text-white font-bold leading-none uppercase tracking-wider">{label}</span>
  </button>
);

// --- Screen Views ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('dashboard');
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const navigateTo = (sub: SubTab) => setActiveSubTab(sub);

  const currentView = useMemo(() => {
    switch (activeSubTab) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-sm text-gray-400 font-medium">Welcome back,</h2>
                <h1 className="text-2xl font-bold text-white">Creative Manager</h1>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                <img 
                  src="https://picsum.photos/seed/designer/200/200" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-[#4364F7]">
                <div className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-1">Active Projects</div>
                <div className="text-2xl font-black text-white">12</div>
              </Card>
              <Card className="border-l-4 border-l-[#F7971E] bg-gradient-to-br from-[#0E1A3D] to-[#F27D26]/10">
                <div className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-1">New Clients</div>
                <div className="text-2xl font-black text-white">5</div>
              </Card>
              <Card className="border-l-4 border-l-[#4364F7]">
                <div className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-1">Social Reach</div>
                <div className="text-2xl font-black text-white">1.2K</div>
              </Card>
              <Card className="border-l-4 border-l-[#4364F7]">
                <div className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-1">Monthly Revenue</div>
                <div className="text-2xl font-black text-white">K8,450</div>
              </Card>
            </div>

            <div className="relative overflow-hidden rounded-[20px] p-5 bg-gradient-to-br from-[#0052D4] via-[#4364F7] to-[#6FB1FC] shadow-xl">
              <div className="relative z-10 flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-lg leading-tight">T-Shirt Mastery</h3>
                  <p className="text-white/80 text-[10px] font-medium tracking-wide">Printing Techniques Course</p>
                </div>
                <div className="text-2xl font-black text-white tracking-tighter">75%</div>
              </div>
              <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-4">
                <ActionButton icon={Plus} label="New Project" color="bg-blue-600" onClick={() => navigateTo('services')} />
                <ActionButton icon={BookOpen} label="Academy" color="bg-orange-500" onClick={() => setActiveTab('learn')} />
                <ActionButton icon={BarChart3} label="Ads" color="bg-blue-500" onClick={() => navigateTo('ads')} />
                <ActionButton icon={Calculator} label="Pricing" color="bg-yellow-500" onClick={() => navigateTo('pricing')} />
              </div>
            </div>

            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-bold text-white">Recent Projects</h3>
                <button onClick={() => setActiveTab('projects')} className="text-orange-500 text-xs font-bold uppercase">View All</button>
              </div>
              <div className="divide-y divide-gray-800">
                {PROJECTS.map(p => (
                  <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-800/40 transition-colors">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">{p.title}</div>
                      <div className="text-xs text-gray-400">{p.client}</div>
                    </div>
                    <div className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900", p.statusColor)}>
                      {p.status}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'modules':
        return (
          <div className="p-6 space-y-6">
            <div className="relative overflow-hidden rounded-[20px] p-6 bg-gradient-to-br from-[#0052D4] via-[#4364F7] to-[#6FB1FC] shadow-lg">
              <div className="relative z-10 space-y-2">
                <h2 className="text-blue-100 uppercase text-[10px] font-black tracking-[0.2em] opacity-80">Learning Academy</h2>
                <h1 className="text-2xl font-bold text-white tracking-tight">Master Graphic Design & Printing</h1>
              </div>
              <Logo className="absolute -right-4 -bottom-4 opacity-20 scale-150 rotate-12" />
            </div>

            <div className="space-y-4">
              {LEARN_MODULES.map(m => (
                <Card 
                  key={m.id} 
                  className="flex items-center gap-4 cursor-pointer hover:border-orange-500 transition-all"
                  onClick={() => navigateTo('lesson')}
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", m.color)}>
                    <m.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-white">{m.title}</h3>
                      <span className="text-[10px] font-bold text-orange-500">{m.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.progress}%` }}
                        className="h-full bg-orange-500" 
                      />
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-500" />
                </Card>
              ))}
            </div>

            <Card className="from-orange-500/10 to-transparent bg-gradient-to-t border-orange-500/30">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-3 rounded-full">
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold">Free Resources Library</h3>
                  <p className="text-xs text-gray-400">Download templates and design guides.</p>
                </div>
                <button className="ml-auto bg-orange-500 text-white p-2 rounded-lg">
                  <ArrowLeft className="rotate-180" size={16} />
                </button>
              </div>
            </Card>
          </div>
        );

      case 'lesson':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-orange-500 uppercase tracking-widest">T-Shirt Printing & Branding</h2>
              <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-orange-500" />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: 'T-Shirt Design Fundamentals', icon: Smartphone, dur: '15 mins' },
                { title: 'Mockup Generator Guide', icon: BarChart3, dur: '20 mins' },
                { title: 'Printing Techniques (DTF, Screen)', icon: Truck, dur: '45 mins' },
                { title: 'Pricing & Costs in Zambia', icon: Calculator, dur: '30 mins' },
                { title: 'Branding for Clients', icon: Users, dur: '25 mins' }
              ].map((l, i) => (
                <Card key={i} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                      <l.icon size={20} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">{i + 1}. {l.title}</h4>
                      <p className="text-xs text-gray-400">{l.dur}</p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
                    Start Lesson
                  </button>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">Our Services</h1>
              <p className="text-sm text-gray-400">Professional branding & creative solutions.</p>
            </div>

            <div className="space-y-2">
              {SERVICES.map((s, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-4 rounded-xl flex items-center justify-between border transition-all cursor-pointer",
                    s === 'T-Shirt Branding & Printing' 
                      ? "bg-blue-600/20 border-blue-500" 
                      : "bg-[#112240] border-gray-800 hover:border-gray-700"
                  )}
                  onClick={() => s === 'T-Shirt Branding & Printing' && navigateTo('tshirt')}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", s === 'T-Shirt Branding & Printing' ? "bg-orange-500" : "bg-gray-800")}>
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                    <span className={cn("text-sm font-medium", s === 'T-Shirt Branding & Printing' ? "text-white" : "text-gray-300")}>{s}</span>
                  </div>
                  {s === 'T-Shirt Branding & Printing' && (
                    <span className="text-[10px] font-bold text-orange-400 animate-pulse">POPULAR</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'tshirt':
        return (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-3 p-4 bg-[#112240] border border-gray-800 rounded-2xl hover:border-orange-500 transition-all">
                <Palette className="text-blue-400" size={32} />
                <span className="text-white text-xs font-bold">Templates</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-4 bg-[#112240] border border-gray-800 rounded-2xl hover:border-orange-500 transition-all">
                <Smartphone className="text-orange-500" size={32} />
                <span className="text-white text-xs font-bold">Mockups</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-4 bg-[#112240] border border-gray-800 rounded-2xl hover:border-orange-500 transition-all">
                <Calculator className="text-yellow-500" size={32} />
                <span className="text-white text-xs font-bold">Pricing</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-4 bg-[#112240] border border-gray-800 rounded-2xl hover:border-orange-500 transition-all">
                <Truck className="text-green-500" size={32} />
                <span className="text-white text-xs font-bold">Track Order</span>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Sample Mockups</h3>
              <div className="grid grid-cols-2 gap-4">
                {['white', 'gray', 'blue', 'black'].map((color, i) => (
                  <div key={i} className="aspect-square bg-white rounded-2xl p-4 flex items-center justify-center relative group overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/tshirt-${color}/300/300`} 
                      alt="Mockup" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center p-0.5">
                      <Logo className="scale-[0.2] origin-left" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold hover:shadow-lg transition-all active:scale-[0.98]">
                Create New Design
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-2xl border border-blue-500 text-blue-400 text-xs font-bold">Mockup Generator</button>
                <button className="py-3 rounded-2xl border border-blue-500 text-blue-400 text-xs font-bold">Pricing Guide</button>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="p-6 space-y-6">
            <div className="flex p-1 bg-gray-900 rounded-2xl mb-4">
              <button className="flex-1 py-2 text-xs font-bold rounded-xl bg-orange-500 text-white">T-Shirt</button>
              <button className="flex-1 py-2 text-xs font-bold rounded-xl text-gray-500">Glass</button>
              <button className="flex-1 py-2 text-xs font-bold rounded-xl text-gray-500">Wood</button>
            </div>

            <Card className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quantity</label>
                  <input type="range" className="w-full accent-orange-500" defaultValue={50} />
                  <div className="flex justify-between text-xs text-white font-bold">
                    <span>1</span>
                    <span>50 Units</span>
                    <span>500+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Printing</label>
                    <select className="w-full bg-gray-900 text-white p-3 rounded-xl text-sm border-none ring-1 ring-gray-800">
                      <option>DTF Printing</option>
                      <option>Screen Printing</option>
                      <option>HTV</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Material</label>
                    <select className="w-full bg-gray-900 text-white p-3 rounded-xl text-sm border-none ring-1 ring-gray-800">
                      <option>Cotton Premium</option>
                      <option>Polyester</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Material Cost</span>
                  <span className="text-white font-bold">K450.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Printing Cost</span>
                  <span className="text-white font-bold">K320.00</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total Cost</span>
                  <span className="text-orange-500 text-lg font-black">K770.00</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Suggested Sale</span>
                  <span className="text-blue-400 text-lg font-black">K1,200.00</span>
                </div>
              </div>

              <button className="w-full py-4 rounded-xl bg-orange-500 text-white font-bold">
                Save Quote & Create Project
              </button>
            </Card>
          </div>
        );

      case 'crm':
        return (
          <div className="p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={20} />
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="w-full bg-[#0E1A3D] border border-white/5 rounded-[20px] py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-[#F7971E] transition-all shadow-xl"
              />
            </div>

            <div className="flex gap-2">
              {['All Clients', 'Active', 'Past'].map(t => (
                <button key={t} className={cn("px-4 py-2 rounded-full text-xs font-bold", t === 'All Clients' ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400")}>
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {CLIENTS.map(c => (
                <Card 
                  key={c.id} 
                  className="space-y-4 cursor-pointer hover:border-gray-600 transition-all group"
                  onClick={() => {
                    setSelectedClientId(c.id);
                    navigateTo('client-profile');
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                      {c.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{c.name}</h3>
                      <p className="text-xs text-gray-500">{c.contact}</p>
                    </div>
                    <div className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border",
                      c.status.includes('Approved') ? "text-blue-400 border-blue-900" : "text-orange-400 border-orange-900"
                    )}>
                      {c.status}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-xl space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <span>Last Project</span>
                      <span>Value</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-300">{c.lastProject}</span>
                      <span className="text-orange-500 font-bold">{c.value}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-gray-800 text-white text-xs font-bold hover:bg-gray-700">Message</button>
                    <button className="flex-1 py-2 rounded-lg bg-orange-500 text-white text-xs font-bold hover:bg-orange-600">View Details</button>
                  </div>
                </Card>
              ))}
            </div>

            <button className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40">
              <Plus size={32} />
            </button>
          </div>
        );

      case 'client-profile':
        const client = CLIENTS.find(c => c.id === selectedClientId) || CLIENTS[0];
        return (
          <div className="space-y-6">
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#112240] to-[#0A192F] rounded-3xl border border-gray-800 shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-orange-500 flex items-center justify-center text-white font-black text-4xl shadow-lg">
                  {client.name[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{client.name}</h2>
                  <p className="text-gray-400 font-medium">Head of Operations: {client.contact}</p>
                </div>
              </div>

              <div className="flex p-1 bg-gray-900 rounded-2xl">
                {['Overview', 'Projects', 'Notes', 'Invoices'].map(t => (
                  <button key={t} className={cn("flex-1 py-2.5 text-xs font-bold rounded-xl transition-all", t === 'Projects' ? "bg-orange-500 text-white shadow-lg" : "text-gray-500")}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recent Activity</h3>
                  {PROJECTS.filter(p => p.client === client.name).map(p => (
                    <Card key={p.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white">{p.title}</div>
                        <div className="text-xs text-gray-500">K{Math.floor(Math.random() * 5000 + 1000)} • March 2026</div>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 bg-green-500/10 text-green-500 border border-green-900 rounded">
                        COMPLETED
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="bg-yellow-500/5 border-yellow-500/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-yellow-500">
                    <BarChart3 size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">Business Insights</span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed italic">
                    "Prefers DTF printing for t-shirts. Always requests premium glass on wood bases for awards. Follow-up frequency: Monthly."
                  </p>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-4 rounded-2xl bg-blue-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg">New Project</button>
                <button 
                  className="py-4 rounded-2xl bg-orange-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg"
                  onClick={() => navigateTo('invoice')}
                >
                  Send Invoice
                </button>
              </div>
            </div>
          </div>
        );

      case 'invoice':
        return (
          <div className="p-6 space-y-6">
            <Card className="space-y-6">
              <div className="flex justify-between items-start">
                <Logo className="scale-110" />
                <div className="text-right">
                  <div className="text-xl font-black text-white">INVOICE</div>
                  <div className="text-xs text-gray-500">#INV-2026-042</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Client</label>
                  <div className="p-3 bg-gray-900 rounded-xl text-white font-bold flex justify-between items-center">
                    <span>A&G Finance</span>
                    <ChevronRight size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Items</label>
                  <div className="space-y-2">
                    {[
                      { item: '50 Custom T-Shirts (DTF)', qty: 50, price: 'K3,250' },
                      { item: '10 Engraved Glass Awards', qty: 10, price: 'K4,800' },
                      { item: 'Design Fee', qty: 1, price: 'K850' }
                    ].map((it, i) => (
                      <div key={i} className="flex justify-between p-3 bg-gray-900/50 rounded-xl text-xs">
                        <span className="text-gray-300">{it.item}</span>
                        <span className="text-white font-bold">{it.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-3xl space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-white font-bold">K8,900.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax (0%)</span>
                  <span className="text-white font-bold">K0.00</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total Amount</span>
                  <span className="text-orange-500 text-2xl font-black tracking-tight">K8,900.00</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold transition-all hover:bg-orange-600 active:scale-95 shadow-xl">
                  Generate & Send via WhatsApp
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 rounded-2xl border border-blue-500 text-blue-400 text-xs font-bold bg-transparent">Preview PDF</button>
                  <button className="py-3 rounded-2xl border border-blue-500 text-blue-400 text-xs font-bold bg-transparent">Mark as Paid</button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'contact':
        return (
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center gap-4 text-center mt-4">
              <Logo className="scale-125 pb-2" />
              <p className="text-gray-400 text-sm max-w-[280px]">We're here to help you scale your creative business.</p>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-green-600/10 border border-green-500/30 rounded-2xl text-green-400 hover:bg-green-600/20 transition-all">
                <div className="flex items-center gap-3">
                  <MessageCircle size={24} />
                  <div className="text-left">
                    <div className="text-xs font-bold uppercase tracking-widest text-green-300">WhatsApp Support</div>
                    <div className="text-sm font-black">+260 774 292 082</div>
                  </div>
                </div>
                <ExternalLink size={20} />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-blue-600/10 border border-blue-500/30 rounded-2xl text-blue-400 hover:bg-blue-600/20 transition-all">
                <div className="flex items-center gap-3">
                  <Mail size={24} />
                  <div className="text-left">
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-300">Email Us</div>
                    <div className="text-xs font-black">creativehubandservices@gmail.com</div>
                  </div>
                </div>
                <ExternalLink size={20} />
              </button>
            </div>

            <Card className="flex items-start gap-4 p-5 bg-[#112240] border-gray-800">
              <div className="bg-blue-600 p-3 rounded-2xl shrink-0">
                <MapPin size={24} className="text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-bold">Kabwe, Zambia</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Central Province Headquarters & Creative Production Lab.</p>
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <div className="flex items-center gap-3 text-orange-500">
                <Clock size={20} />
                <h3 className="font-bold text-white uppercase text-xs tracking-widest">Business Hours</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Weekdays</div>
                  <div className="text-white font-bold text-sm">8:00 AM - 6:00 PM</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Saturdays</div>
                  <div className="text-white font-bold text-sm">9:00 AM - 2:00 PM</div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest px-1">Send us a message</h3>
              <Card className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-orange-500 outline-none" />
                <input type="text" placeholder="Service Needed" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-orange-500 outline-none" />
                <textarea placeholder="Tell us about your project..." rows={3} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-orange-500 outline-none resize-none" />
                <button className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg hover:bg-orange-600 transition-all">Send Message</button>
              </Card>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">Social Media Manager</h1>
              <p className="text-sm text-[#94A3B8]">Connected accounts and pages.</p>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Facebook Page', label: 'Creative Hub', icon: Facebook, color: 'text-blue-500' },
                { name: 'TikTok', label: 'creativehub.zm', icon: Smartphone, color: 'text-pink-500' },
                { name: 'Instagram', label: '@creativehub_zm', icon: Instagram, color: 'text-orange-500' }
              ].map((acc, i) => (
                <Card key={i} className="flex items-center gap-4">
                  <div className="p-3 bg-[#050B1F] rounded-xl border border-white/5">
                    <acc.icon className={acc.color} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm">{acc.name}</h3>
                    <p className="text-xs text-[#0052D4] font-medium">{acc.label}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Live</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl shadow-xl hover:scale-[1.02] transition-transform">
                <BarChart3 className="text-white" size={32} />
                <span className="text-white font-bold text-xs uppercase tracking-widest">Schedule Post</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-pink-600 to-orange-500 rounded-3xl shadow-xl hover:scale-[1.02] transition-transform">
                <Plus className="text-white" size={32} />
                <span className="text-white font-bold text-xs uppercase tracking-widest">Create Reel</span>
              </button>
            </div>

            <Card className="overflow-hidden p-0 relative h-48 bg-gray-900 group">
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black z-10">
                <h4 className="text-white font-bold text-sm">Join us for an exclusive event!</h4>
                <p className="text-xs text-gray-400">Published on Facebook • 2 hours ago</p>
              </div>
              <img 
                src="https://picsum.photos/seed/flyer/600/400" 
                alt="Post Preview" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </Card>
          </div>
        );

      case 'ads':
        return (
          <div className="p-6 space-y-6">
            <div className="p-6 rounded-[20px] bg-gradient-to-br from-[#0052D4] via-[#4364F7] to-[#6FB1FC] relative overflow-hidden shadow-xl">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-[#050B1F] opacity-60 mb-1 leading-none">PROMOTION TOOL</h2>
                  <h1 className="text-2xl font-black text-white tracking-tight">AD CREATOR</h1>
                </div>
                <Facebook className="text-white opacity-20 scale-[3] absolute -right-4 -bottom-4" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">Select Ad Template</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {['Service Flyer Ad', 'Client Testimonial', 'New Logo Reveal'].map((t, i) => (
                  <div key={i} className="min-w-[160px] aspect-[4/5] bg-[#0E1A3D] rounded-[20px] border border-white/5 p-4 flex flex-col justify-end space-y-2 relative group overflow-hidden shrink-0 shadow-lg">
                    <img src={`https://picsum.photos/seed/ad-${i}/300/400`} alt="Template" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                    <div className="relative z-10 px-2 py-2 bg-[#F27D26]/20 backdrop-blur rounded-lg border border-[#F7971E]/50">
                      <span className="text-white font-black text-[10px] uppercase leading-none tracking-wide">{t}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-[0.98] transition-transform">
              Generate Ad Creative
            </button>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-2xl hover:border-blue-500 transition-all">
                <span className="text-gray-300 text-sm font-bold">Schedule Free Organic Post</span>
                <ChevronRight size={16} className="text-gray-500" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl group transition-all">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 text-sm font-black">Launch Paid Boost</span>
                  <span className="text-[10px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full">FROM K50</span>
                </div>
                <ExternalLink size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="p-6 space-y-8">
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-orange-500 shadow-2xl">
                  <img src="https://picsum.photos/seed/designer/300/300" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 border-4 border-[#0A192F] flex items-center justify-center">
                  <Settings size={14} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-black text-white">Creative Hub</h2>
                <p className="text-sm text-gray-500">Graphic & Branding Solutions • Kabwe</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Learning Progress</h3>
                <div className="space-y-4">
                  {[
                    { label: 'T-Shirt Mastery', val: 75, color: 'from-orange-500 to-orange-700' },
                    { label: 'Gifts & Awards', val: 45, color: 'from-blue-500 to-indigo-600' },
                    { label: 'Glass Etching', val: 60, color: 'from-purple-500 to-purple-800' }
                  ].map((p, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-gray-300">
                        <span>{p.label}</span>
                        <span>{p.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${p.val}%` }}
                          className={cn("h-full bg-gradient-to-r", p.color)} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Business Information', icon: FolderKanban },
                  { label: 'Connected Accounts', icon: Facebook },
                  { label: 'App Preferences', icon: Settings },
                  { label: 'Backup & Export Data', icon: BarChart3 }
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 bg-[#112240] border border-gray-800 rounded-2xl hover:border-gray-700 transition-all">
                    <div className="flex items-center gap-3">
                      <item.icon className="text-blue-400" size={20} />
                      <span className="text-white text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="text-gray-600" size={16} />
                  </button>
                ))}
              </div>

              <button className="w-full py-4 rounded-2xl bg-gray-900 border border-red-900 text-red-500 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-900/10 transition-all">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        );

      case 'suppliers':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">Suppliers & Resources</h1>
              <p className="text-sm text-gray-400">Trusted vendors for your creative supplies.</p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'T-Shirt Suppliers', desc: 'Cotton blanks in Kabwe/Lusaka.', contact: '+260 977 121 212', bg: 'from-blue-600/20 to-transparent' },
                { title: 'Glass Blanks', desc: 'Premium etching glass sheets.', contact: '+260 966 343 434', bg: 'from-orange-500/20 to-transparent' },
                { title: 'Wood Engraving', desc: 'Hardwood and Laser services.', contact: '+260 955 565 656', bg: 'from-indigo-600/20 to-transparent' },
              ].map((s, i) => (
                <Card key={i} className={cn("bg-gradient-to-r border-gray-800 p-5 group hover:border-orange-500 transition-all", s.bg)}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h3 className="font-black text-white text-lg tracking-tight">{s.title}</h3>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-orange-500">
                      <Truck size={20} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-blue-400">
                      <MessageCircle size={16} />
                      <span className="text-xs font-bold">{s.contact}</span>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-orange-500 border border-orange-900 px-3 py-1.5 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-all">
                      Message
                    </button>
                  </div>
                </Card>
              ))}

              <div className="mt-8 space-y-4">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Free Design Resources</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Canva Templates', 'Price Guides', 'Stencil Packs', 'Fonts (OTF)'].map((r, i) => (
                    <button key={i} className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col items-center gap-2 hover:border-blue-500 transition-all group">
                      <BarChart3 className="text-blue-500 group-hover:scale-110 transition-transform" size={24} />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{r}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-6 text-white">View not implemented yet.</div>;
    }
  }, [activeSubTab, selectedClientId]);

  // Handle Tab Navigation logic
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home': setActiveSubTab('dashboard'); break;
      case 'learn': setActiveSubTab('modules'); break;
      case 'projects': setActiveSubTab('dashboard'); break; // Actually should show a projects list
      case 'crm': setActiveSubTab('crm'); break;
      case 'more': setActiveSubTab('profile'); break;
    }
  };

  const getTitle = () => {
    switch (activeSubTab) {
      case 'dashboard': return 'Dashboard';
      case 'modules': return 'Academy';
      case 'lesson': return 'Learning';
      case 'services': return 'Services';
      case 'pricing': return 'Pricing';
      case 'crm': return 'Clients';
      case 'client-profile': return 'Profile';
      case 'invoice': return 'Invoice';
      case 'contact': return 'Support';
      case 'social': return 'Social';
      case 'ads': return 'Ads';
      case 'profile': return 'Account';
      case 'suppliers': return 'Suppliers';
      default: return 'Creative Hub';
    }
  }

  return (
    <div id="app-root" className="min-h-screen bg-[#020617] font-sans selection:bg-[#F7971E] selection:text-white flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Dynamic Header */}
      <SectionHeader 
        title={getTitle()} 
        showBack={activeSubTab !== 'dashboard' && activeSubTab !== 'modules' && activeSubTab !== 'crm' && activeSubTab !== 'profile'}
        onBack={() => {
          if (activeSubTab === 'lesson') setActiveSubTab('modules');
          else if (activeSubTab === 'client-profile') setActiveSubTab('crm');
          else if (activeSubTab === 'invoice') setActiveSubTab('client-profile');
          else if (activeSubTab === 'services' || activeSubTab === 'pricing' || activeSubTab === 'social' || activeSubTab === 'ads' || activeSubTab === 'contact' || activeSubTab === 'suppliers') setActiveSubTab('dashboard');
          else handleTabChange('home');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-44 no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentView}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Controls (for Home/Dashboard only) */}
      {activeTab === 'home' && activeSubTab === 'dashboard' && (
        <div className="px-6 py-4 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none absolute bottom-20 inset-x-0">
          <button 
            onClick={() => setActiveSubTab('contact')}
            className="w-full py-4 bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] pointer-events-auto text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            Contact Specialist
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav id="bottom-nav" className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0E1A3D]/95 backdrop-blur-xl border-t border-white/5 h-20 flex px-2 pb-2 z-50">
        <NavItem icon={LayoutDashboard} label="Home" active={activeTab === 'home'} onClick={() => handleTabChange('home')} />
        <NavItem icon={BookOpen} label="Learn" active={activeTab === 'learn'} onClick={() => handleTabChange('learn')} />
        <NavItem icon={FolderKanban} label="Projects" active={activeTab === 'projects'} onClick={() => handleTabChange('home')} />
        <NavItem icon={Users} label="CRM" active={activeTab === 'crm'} onClick={() => handleTabChange('crm')} />
        <NavItem icon={MoreHorizontal} label="Menu" active={activeTab === 'more'} onClick={() => setActiveSubTab('profile')} />
      </nav>

      {/* Global Gradient Overlays */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0052D4] via-[#F7971E] to-[#0052D4] opacity-50 z-[100]" />
      <div className="fixed top-0 left-0 w-64 h-64 bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-orange-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
    </div>
  );
}
