import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  BookOpen, 
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Download
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PERFORMANCE_DATA = [
  { name: 'Problem Solving', score: 85, avg: 65 },
  { name: 'Creativity', score: 65, avg: 70 },
  { name: 'Communication', score: 90, avg: 75 },
  { name: 'Technical', score: 75, avg: 60 },
];

export default function ParentReport() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 p-6 lg:p-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3 h-3" />
                Validated Path
              </div>
              <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Parent Confidence Report</h1>
              <p className="text-slate-500 dark:text-slate-400">Evidence-based insights for Jane's career discovery journey.</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Download PDF Summary
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* The Bottom Line */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 relative z-10">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                The Bottom Line
              </h2>
              
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 mb-8 relative z-10">
                <p className="text-lg text-emerald-900 dark:text-emerald-100 font-medium leading-relaxed">
                  Jane shows exceptional aptitude and sustained interest in <strong className="font-bold">Software Engineering</strong>. Her performance in technical problem-solving missions ranks in the top 15% of her peer group, and she remains highly engaged even when exposed to the challenging realities of the profession.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Why this fits Jane
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 shrink-0"></div>
                      She excels at breaking down complex problems logically.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 shrink-0"></div>
                      She enjoys focused, deep work environments.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 shrink-0"></div>
                      She demonstrates high resilience when facing technical bugs.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    Areas to support
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0"></div>
                      Encourage participation in team-based coding projects to build collaboration skills.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0"></div>
                      Discuss the importance of balancing screen time with physical activity.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Performance vs Peers */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Performance vs. Peer Average
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Based on data from 12 completed Trial Missions, comparing Jane's scores to the national average for 10th graders.
              </p>
              
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    <Bar dataKey="score" name="Jane's Score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar dataKey="avg" name="Peer Average" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Engagement Metrics */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Engagement Metrics
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Missions Completed</span>
                    <span className="font-bold text-slate-900 dark:text-white">12 / 15</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[80%]"></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Highly active. Completes missions ahead of schedule.</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Reality Page Time</span>
                    <span className="font-bold text-slate-900 dark:text-white">High</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 w-[90%]"></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Spends significant time reading "Day in the Life" details.</p>
                </div>
              </div>
            </div>

            {/* Conversation Starters */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-800/50">
              <h2 className="text-xl font-display font-bold text-indigo-900 dark:text-indigo-100 mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Conversation Starters
              </h2>
              
              <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-6">
                Use these prompts to discuss Jane's progress constructively:
              </p>
              
              <ul className="space-y-4">
                <li className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800/50 text-sm text-slate-700 dark:text-slate-300 font-medium shadow-sm">
                  "I saw you scored really high on the Frontend Fixer mission. What did you enjoy most about solving that bug?"
                </li>
                <li className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800/50 text-sm text-slate-700 dark:text-slate-300 font-medium shadow-sm">
                  "The report mentioned you might not like the sedentary nature of coding. How do you think you could balance that?"
                </li>
                <li className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800/50 text-sm text-slate-700 dark:text-slate-300 font-medium shadow-sm">
                  "You seem to be losing interest in Product Management. Was there a specific mission that changed your mind?"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
