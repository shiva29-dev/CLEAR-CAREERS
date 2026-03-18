import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Target, LineChart, ShieldCheck, PlayCircle, BookOpen } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="px-4 md:px-8 py-4 md:py-6 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">Clear Careers</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#problem" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">The Problem</a>
          <a href="#solution" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How it Works</a>
          <a href="#benefits" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Benefits</a>
        </nav>
        <div className="flex gap-4">
          <button className="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Log In</button>
          <Link to="/onboarding" className="bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm">
            Start Discovery
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 md:px-8 py-12 md:py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              The Future of Career Discovery
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Stop guessing your future. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500 dark:from-brand-400 dark:to-indigo-400">Experience it.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Eliminate career confusion caused by pressure and trends. Discover your true path through structured assessment, real-world trials, and evidence-based guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/onboarding" className="bg-brand-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 group">
                Start Your Career Discovery Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-6 md:px-8 py-3 md:py-4 rounded-full text-base font-semibold text-slate-700 dark:text-slate-200 bg-brand-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0 px-4 sm:px-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-indigo-50 dark:from-brand-900/20 dark:to-indigo-900/20 rounded-[2rem] transform rotate-3 scale-105 -z-10"></div>
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-md flex-1"></div>
              </div>
              <div className="p-6 md:p-8 grid gap-4 md:gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                    <Compass className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">1. Direction Assessment</h3>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Psychometric & interest routing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">2. Reality-Based Intel</h3>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Data-driven authentic reality</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Target className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">3. Career Trial Missions</h3>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Experiential micro-internships</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <LineChart className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">4. Dual-Confidence Reports</h3>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Actionable analytics for all</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white dark:bg-slate-900 py-16 md:py-24 border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Designed for the entire ecosystem</h2>
              <p className="text-slate-600 dark:text-slate-400">Aligning students, parents, and educators with evidence-based career discovery.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">For Students</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  Stop guessing. Try careers before committing to a major. Build confidence through real-world micro-internships and discover what you actually enjoy doing.
                </p>
              </div>
              
              <div className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">For Parents</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  Get peace of mind. Receive data-driven confidence reports that validate your child's choices based on their actual performance and sustained interest.
                </p>
              </div>
              
              <div className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">For Schools</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  Scale career counseling. Provide every student with personalized, structured discovery paths and track aggregate engagement and outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
