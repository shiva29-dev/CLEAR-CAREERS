import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Target, 
  Compass, 
  Award, 
  TrendingUp, 
  Zap, 
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Sparkles,
  BookOpen,
  Briefcase,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { GoogleGenAI, Type } from '@google/genai';

const SKILL_DATA = [
  { subject: 'Problem Solving', A: 85, fullMark: 100 },
  { subject: 'Creativity', A: 65, fullMark: 100 },
  { subject: 'Communication', A: 90, fullMark: 100 },
  { subject: 'Technical', A: 75, fullMark: 100 },
  { subject: 'Leadership', A: 60, fullMark: 100 },
  { subject: 'Adaptability', A: 80, fullMark: 100 },
];

const RECENT_MISSIONS = [
  { title: 'Frontend Fixer', role: 'Software Engineer', status: 'Completed', score: '85%', date: 'Today' },
  { title: 'Wireframe Wizard', role: 'UX Designer', status: 'Completed', score: '92%', date: 'Yesterday' },
  { title: 'Sprint Planning', role: 'Product Manager', status: 'In Progress', score: '--', date: '2 days ago' },
];

const COMPATIBILITY_SCORES = [
  { career: 'Software Engineering', score: 92, trend: 'up' },
  { career: 'UX Design', score: 78, trend: 'up' },
  { career: 'Product Management', score: 65, trend: 'down' },
];

interface AIRecommendations {
  careerPaths: { title: string; matchPercentage: number; reason: string }[];
  articles: { title: string; topic: string; summary: string }[];
  trialMissions: { title: string; difficulty: string; description: string }[];
}

export default function StudentDashboard() {
  const [recommendations, setRecommendations] = useState<AIRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        Analyze the following student profile and generate personalized recommendations.
        
        Skills:
        ${JSON.stringify(SKILL_DATA)}
        
        Recent Trial Missions:
        ${JSON.stringify(RECENT_MISSIONS)}
        
        Current Career Compatibility:
        ${JSON.stringify(COMPATIBILITY_SCORES)}
        
        Based on this data, suggest:
        1. 3 Personalized Career Paths (with match percentage and reason)
        2. 3 Relevant Articles to read
        3. 3 Suitable Trial Missions to try next
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              careerPaths: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    matchPercentage: { type: Type.NUMBER },
                    reason: { type: Type.STRING }
                  }
                }
              },
              articles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    topic: { type: Type.STRING },
                    summary: { type: Type.STRING }
                  }
                }
              },
              trialMissions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      if (response.text) {
        setRecommendations(JSON.parse(response.text));
      }
    } catch (err) {
      console.error("Failed to generate recommendations:", err);
      setError("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 p-4 md:p-6 lg:p-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Welcome back, Jane</h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">You're making great progress on your career discovery journey.</p>
          </div>
          <Link to="/student-report" className="px-6 py-3 rounded-full bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-sm">
            View Decision Report
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Assessments', value: '3/3', icon: Compass, color: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-100 dark:bg-brand-900/30' },
            { label: 'Missions Completed', value: '12', icon: Target, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
            { label: 'Skills Unlocked', value: '8', icon: Zap, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            { label: 'Current Streak', value: '5 Days', icon: TrendingUp, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                <p className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Compatibility Scores */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  Dynamic Compatibility
                </h2>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Updated Today</span>
              </div>
              
              <div className="space-y-6">
                {COMPATIBILITY_SCORES.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300">{item.career}</span>
                      <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white">{item.score}%</span>
                    </div>
                    <div className="h-2 md:h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className={`h-full rounded-full ${
                          item.score > 80 ? 'bg-emerald-500' : item.score > 60 ? 'bg-brand-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Missions */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Recent Trial Missions
              </h2>
              
              <div className="space-y-4">
                {RECENT_MISSIONS.map((mission, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        mission.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                      }`}>
                        {mission.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">{mission.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{mission.role} • {mission.date}</p>
                      </div>
                    </div>
                    <div className="sm:text-right pl-14 sm:pl-0">
                      <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white">{mission.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:space-y-8">
            {/* Skill Radar */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Skill Profile
              </h2>
              <div className="h-56 md:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                    <Radar name="Jane" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recommended Next Steps */}
            <div className="bg-brand-600 dark:bg-brand-900 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-brand-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <h2 className="text-lg md:text-xl font-display font-bold mb-6 relative z-10">Recommended Next Steps</h2>
              
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-50/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Complete Data Science Mission</p>
                    <p className="text-xs text-brand-200 dark:text-brand-300">Test your analytical skills further.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-50/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Read "Day in the Life: PM"</p>
                    <p className="text-xs text-brand-200 dark:text-brand-300">Explore why your PM score dropped.</p>
                  </div>
                </li>
              </ul>
              
              <button className="w-full mt-8 py-3 rounded-xl bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-white font-bold hover:bg-brand-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                Start Next Mission
              </button>
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 mt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-brand-500" />
                AI-Powered Recommendations
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Personalized career paths, articles, and missions based on your unique profile.
              </p>
            </div>
            <button 
              onClick={generateRecommendations}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Profile...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Insights
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 text-red-700 dark:text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {recommendations && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Career Paths */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  Suggested Careers
                </h3>
                <div className="space-y-4">
                  {recommendations.careerPaths.map((career, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white">{career.title}</h4>
                        <span className="px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                          {career.matchPercentage}% Match
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{career.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Articles */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  Recommended Reading
                </h3>
                <div className="space-y-4">
                  {recommendations.articles.map((article, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1 block uppercase tracking-wider">{article.topic}</span>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{article.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{article.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trial Missions */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Target className="w-5 h-5 text-amber-500" />
                  Next Trial Missions
                </h3>
                <div className="space-y-4">
                  {recommendations.trialMissions.map((mission, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white">{mission.title}</h4>
                        <span className="px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
                          {mission.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{mission.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!recommendations && !loading && !error && (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Recommendations Yet</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Click the button above to generate your personalized career insights using our AI engine.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
