import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Users, 
  Briefcase, 
  Target, 
  BarChart3, 
  Plus, 
  Search, 
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ENGAGEMENT_DATA = [
  { name: 'Mon', active: 4000, completed: 2400 },
  { name: 'Tue', active: 3000, completed: 1398 },
  { name: 'Wed', active: 2000, completed: 9800 },
  { name: 'Thu', active: 2780, completed: 3908 },
  { name: 'Fri', active: 1890, completed: 4800 },
  { name: 'Sat', active: 2390, completed: 3800 },
  { name: 'Sun', active: 3490, completed: 4300 },
];

const MISSIONS = [
  { id: 1, title: 'Frontend Fixer', role: 'Software Engineer', status: 'Active', completions: 12450, rating: 4.8 },
  { id: 2, title: 'Wireframe Wizard', role: 'UX Designer', status: 'Active', completions: 8320, rating: 4.6 },
  { id: 3, title: 'Sprint Planning', role: 'Product Manager', status: 'Draft', completions: 0, rating: 0 },
  { id: 4, title: 'Data Pipeline', role: 'Data Engineer', status: 'Review', completions: 150, rating: 3.9 },
  { id: 5, title: 'Brand Strategy', role: 'Marketing Manager', status: 'Active', completions: 5600, rating: 4.2 },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 flex flex-col transition-colors duration-200">
      {/* Top Navigation */}
      <header className="px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white">Platform Administration</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Global Control Center</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search users, missions..." 
              className="pl-9 pr-4 py-2 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 w-64 text-slate-900 dark:text-white"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700">
            AD
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Students & Parents', icon: Users },
              { id: 'careers', label: 'Career Database', icon: Briefcase },
              { id: 'missions', label: 'Trial Missions', icon: Target },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white dark:text-slate-900' : 'text-slate-400 dark:text-slate-500'}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Global Engagement</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">7 Days</button>
                    <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white">30 Days</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Total Active Students</p>
                    <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">142,850</p>
                    <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12.5% this month</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Missions Completed</p>
                    <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">8.4M</p>
                    <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>+24.1% this month</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Parent Reports Generated</p>
                    <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">95,200</p>
                    <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>+8.2% this month</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-6">Daily Active Users vs. Mission Completions</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ENGAGEMENT_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="active" name="Active Users" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="completed" name="Missions Completed" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Missions Tab */}
            {activeTab === 'missions' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Trial Missions Management</h2>
                  <button className="px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors flex items-center gap-2 shadow-sm">
                    <Plus className="w-4 h-4" />
                    Create New Mission
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mission Title</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Target Role</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completions</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rating</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {MISSIONS.map((mission) => (
                          <tr key={mission.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-bold text-slate-900 dark:text-white">{mission.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-600 dark:text-slate-300">{mission.role}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                mission.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                mission.status === 'Draft' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' :
                                'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                              }`}>
                                {mission.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> :
                                 mission.status === 'Draft' ? <Edit2 className="w-3 h-3" /> :
                                 <AlertCircle className="w-3 h-3" />}
                                {mission.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                              {mission.completions.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{mission.rating > 0 ? mission.rating : '--'}</span>
                                <span className="text-amber-400 text-sm">★</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 5 of 24 entries</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed">Previous</button>
                      <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800">Next</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === 'users' || activeTab === 'careers') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-96 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
                  {activeTab === 'users' ? <Users className="w-10 h-10" /> : <Briefcase className="w-10 h-10" />}
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  {activeTab === 'users' ? 'User Management' : 'Career Database'}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  This module is currently under construction in the prototype.
                </p>
              </motion.div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
