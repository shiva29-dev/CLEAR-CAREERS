import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, User, Book, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  { id: 'basics', title: 'The Basics', icon: User },
  { id: 'academics', title: 'Academics', icon: Book },
  { id: 'skills', title: 'Superpowers', icon: Target },
  { id: 'interests', title: 'Passions', icon: Heart },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    subjects: [] as string[],
    skills: [] as string[],
    interests: [] as string[],
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const toggleSelection = (field: 'subjects' | 'skills' | 'interests', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 flex items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-3xl">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-110' :
                    isPast ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'bg-brand-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border-2 border-slate-100 dark:border-slate-700'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? 'text-brand-600' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress Bar Background */}
          <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full -mt-12 relative z-0 mx-6">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-brand-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden min-h-[400px] flex flex-col">
          <div className="p-10 flex-1 relative">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Let's build your profile</h2>
                    <p className="text-slate-500 dark:text-slate-400">First, what should we call you?</p>
                  </div>
                  
                  <div className="max-w-md mx-auto space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Alex"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-lg text-slate-900 dark:text-white"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Current Grade</label>
                      <div className="grid grid-cols-4 gap-3">
                        {['9th', '10th', '11th', '12th'].map(grade => (
                          <button
                            key={grade}
                            onClick={() => setFormData({...formData, grade})}
                            className={`py-3 rounded-xl font-medium transition-all ${
                              formData.grade === grade 
                                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20' 
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600'
                            }`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">What do you enjoy learning?</h2>
                    <p className="text-slate-500 dark:text-slate-400">Select the subjects you actually look forward to.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {['Math', 'Science', 'Literature', 'History', 'Art', 'Computer Science', 'Languages', 'Music', 'Business'].map(subject => {
                      const isSelected = formData.subjects.includes(subject);
                      return (
                        <button
                          key={subject}
                          onClick={() => toggleSelection('subjects', subject)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            isSelected 
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                              : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full mb-3 flex items-center justify-center ${isSelected ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-transparent'}`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="font-semibold">{subject}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">What are your superpowers?</h2>
                    <p className="text-slate-500 dark:text-slate-400">Don't be humble. What are you naturally good at?</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                    {['Problem Solving', 'Public Speaking', 'Writing', 'Coding', 'Design', 'Leadership', 'Empathy', 'Data Analysis', 'Debate', 'Organization', 'Creativity'].map(skill => {
                      const isSelected = formData.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSelection('skills', skill)}
                          className={`px-5 py-3 rounded-full border-2 font-medium transition-all ${
                            isSelected 
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' 
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">What sparks your curiosity?</h2>
                    <p className="text-slate-500 dark:text-slate-400">Pick a few areas you'd love to explore in the real world.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {[
                      { id: 'tech', label: 'Building Technology', desc: 'Software, AI, Hardware' },
                      { id: 'health', label: 'Helping People', desc: 'Medicine, Psychology, Therapy' },
                      { id: 'creative', label: 'Creating Art/Media', desc: 'Design, Film, Writing' },
                      { id: 'business', label: 'Running a Business', desc: 'Startups, Finance, Marketing' },
                      { id: 'nature', label: 'Environment', desc: 'Sustainability, Biology, Outdoors' },
                      { id: 'justice', label: 'Law & Society', desc: 'Politics, Activism, Law' },
                    ].map(interest => {
                      const isSelected = formData.interests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleSelection('interests', interest.id)}
                          className={`p-5 rounded-2xl border-2 text-left transition-all ${
                            isSelected 
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-300' 
                              : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
                          }`}
                        >
                          <h4 className="font-bold mb-1">{interest.label}</h4>
                          <p className="text-xs opacity-70">{interest.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
            <button 
              onClick={handleBack}
              className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors ${
                currentStep === 0 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            {currentStep === STEPS.length - 1 ? (
              <Link 
                to="/assessment"
                className="px-8 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25 flex items-center gap-2"
              >
                Generate Profile
                <Sparkles className="w-5 h-5" />
              </Link>
            ) : (
              <button 
                onClick={handleNext}
                className="px-8 py-3 rounded-full bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
