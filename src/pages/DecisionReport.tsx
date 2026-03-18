import { motion } from 'framer-motion';
import { 
  FileCheck, 
  Target, 
  TrendingUp, 
  BrainCircuit, 
  Award, 
  CheckCircle2,
  Download,
  Share2,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const INTEREST_DATA = [
  { name: 'Week 1', se: 65, ux: 80, pm: 70 },
  { name: 'Week 2', se: 75, ux: 78, pm: 65 },
  { name: 'Week 3', se: 85, ux: 75, pm: 60 },
  { name: 'Week 4', se: 92, ux: 72, pm: 55 },
];

export default function DecisionReport() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 p-6 lg:p-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3 h-3" />
                High Confidence (92%)
              </div>
              <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Decision Confidence Report</h1>
              <p className="text-slate-500 dark:text-slate-400">Synthesized analysis of your 4-week discovery journey.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Primary Recommendation */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-brand-200 dark:border-brand-900/50 shadow-lg shadow-brand-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 dark:bg-brand-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2 relative z-10">Primary Recommendation</h2>
              <div className="flex items-end gap-4 mb-6 relative z-10">
                <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Software Engineering</h3>
                <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 mb-1">92% Match</span>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 relative z-10">
                Based on your consistent high performance in technical problem-solving missions, sustained interest over 4 weeks, and alignment with your initial psychometric profile, Software Engineering is your strongest career path.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white">Strengths</h4>
                  </div>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Logical decomposition</li>
                    <li>• High frustration tolerance</li>
                    <li>• Self-directed learning</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white">Growth Areas</h4>
                  </div>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Cross-functional communication</li>
                    <li>• UI/UX empathy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Interest Consistency Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Interest Consistency Over Time
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Tracking your self-reported interest levels after completing various trial missions. Notice the steady climb in Software Engineering compared to the decline in Product Management.
              </p>
              
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={INTEREST_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSE" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorUX" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="se" name="Software Eng" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSE)" />
                    <Area type="monotone" dataKey="ux" name="UX Design" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUX)" />
                    <Area type="monotone" dataKey="pm" name="Product Mgmt" stroke="#f59e0b" strokeWidth={3} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Evidence Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                The Evidence
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Mission Performance</span>
                    <span className="font-bold text-slate-900 dark:text-white">Top 15%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 w-[85%]"></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Consistently scored high on analytical tasks.</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Reality Check Alignment</span>
                    <span className="font-bold text-slate-900 dark:text-white">High</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[90%]"></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Unfazed by the "unglamorous" aspects of the job.</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Psychometric Match</span>
                    <span className="font-bold text-slate-900 dark:text-white">Strong</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[88%]"></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Matches your preference for focused, logical work.</p>
                </div>
              </div>
            </div>

            {/* Secondary Options */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-lg">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-400" />
                Alternative Paths
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">UX Design</h3>
                    <span className="text-emerald-400 font-bold text-sm">72% Match</span>
                  </div>
                  <p className="text-xs text-slate-400">Strong creative performance, but lower sustained interest over time.</p>
                </div>
                
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 opacity-75">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">Data Science</h3>
                    <span className="text-amber-400 font-bold text-sm">65% Match</span>
                  </div>
                  <p className="text-xs text-slate-400">High analytical skills, but requires more advanced math exposure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
