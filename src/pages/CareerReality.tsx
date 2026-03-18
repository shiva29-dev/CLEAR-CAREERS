import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Wrench, 
  GraduationCap, 
  MessageSquare, 
  Target,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CareerReality() {
  const [activeTab, setActiveTab] = useState('day-in-life');

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 p-6 lg:p-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
              <Briefcase className="w-12 h-12" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <TrendingUp className="w-3 h-3" />
                High Demand (12% Growth)
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-2">Software Engineer</h1>
              <p className="text-lg text-slate-500 dark:text-slate-400">Building the digital infrastructure of tomorrow.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Median Salary</p>
              <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">$124,200</p>
            </div>
            <Link to="/mission" className="w-full py-4 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25">
              Start Trial Mission
              <Target className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
              {[
                { id: 'day-in-life', label: 'Day in the Life', icon: Clock },
                { id: 'reality-check', label: 'Reality Check', icon: AlertTriangle },
                { id: 'insights', label: 'Pro Insights', icon: MessageSquare },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 shadow-md' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 min-h-[400px]">
              {activeTab === 'day-in-life' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">The Unglamorous Truth</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    It's not all hacking in dark rooms with green text. A significant portion of your day involves reading other people's code, attending meetings, and debugging frustrating errors.
                  </p>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                    {[
                      { time: '9:00 AM', title: 'Standup Meeting', desc: '15-minute sync with the team to discuss progress and blockers.' },
                      { time: '9:30 AM', title: 'Deep Work (Coding)', desc: 'Writing new features or fixing bugs. High concentration required.' },
                      { time: '12:00 PM', title: 'Code Review', desc: 'Reading and critiquing code written by peers to ensure quality.' },
                      { time: '2:00 PM', title: 'Architecture Planning', desc: 'Whiteboarding solutions for upcoming features with senior engineers.' },
                      { time: '4:00 PM', title: 'Debugging', desc: 'Tracking down why a specific feature is failing in production.' },
                    ].map((item, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-md">{item.time}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'reality-check' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                    Friction Points & Challenges
                  </h2>
                  <div className="grid gap-4">
                    {[
                      { title: 'Imposter Syndrome', desc: 'Technology moves fast. You will constantly feel like you don\'t know enough.' },
                      { title: 'Sedentary Lifestyle', desc: 'You will sit at a desk for 8+ hours a day. Ergonomics and exercise are mandatory.' },
                      { title: 'Frustration Tolerance', desc: 'You might spend 3 days looking for a missing semicolon or a typo in a configuration file.' },
                      { title: 'On-Call Rotations', desc: 'Depending on the company, you may have to wake up at 3 AM to fix a broken server.' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-1">
                          <span className="font-bold text-sm">{idx + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Authentic Professional Insights</h2>
                  <div className="grid gap-6">
                    {[
                      { name: 'Sarah J.', role: 'Senior Backend Engineer', quote: 'The best engineers aren\'t the ones who know every language. They are the ones who know how to ask the right questions and Google effectively.' },
                      { name: 'David L.', role: 'Frontend Developer', quote: 'Communication is 50% of the job. If you can\'t explain why your technical solution solves the business problem, your code doesn\'t matter.' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 relative">
                        <MessageSquare className="w-8 h-8 text-slate-200 dark:text-slate-700 absolute top-6 right-6" />
                        <p className="text-lg text-slate-700 dark:text-slate-300 italic mb-4 relative z-10">"{item.quote}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <PlayCircle className="w-5 h-5" />
                    Watch Video Interviews
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills & Tools */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Core Tools & Skills
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Hard Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'Python', 'Git', 'SQL', 'React', 'AWS'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Soft Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {['Problem Solving', 'Communication', 'Adaptability', 'Teamwork'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Education Pathways
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-xs">1</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">B.S. Computer Science</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Traditional 4-year degree</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 ml-auto mt-2" />
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-xs">2</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Coding Bootcamp</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Intensive 3-6 month program</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 ml-auto mt-2" />
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-xs">3</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Self-Taught</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Portfolio-driven approach</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 ml-auto mt-2" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
