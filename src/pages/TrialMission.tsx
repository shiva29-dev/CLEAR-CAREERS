import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Code, 
  Lightbulb, 
  BrainCircuit, 
  Scale, 
  Globe, 
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Play,
  Terminal,
  MessageSquare
} from 'lucide-react';

const MISSION_STEPS = [
  {
    id: 'intro',
    type: 'intro',
    title: 'Mission Briefing',
    icon: Target,
    content: "You are a junior frontend developer at a fast-growing e-commerce startup. The checkout page is converting poorly on mobile devices. Your task is to analyze the problem, propose a solution, and write a small snippet of code to fix a UI bug."
  },
  {
    id: 'skill',
    type: 'Skill Exposure',
    title: 'Fix the CSS Bug',
    icon: Code,
    content: "The 'Buy Now' button is overlapping with the product description on screens smaller than 375px. Which CSS property would you use to prevent this?",
    options: ['margin-bottom', 'z-index', 'flex-wrap', 'position: absolute']
  },
  {
    id: 'problem',
    type: 'Problem Solving',
    title: 'Analyze the Drop-off',
    icon: BrainCircuit,
    content: "Analytics show 40% of users abandon the cart at the 'Shipping Address' step. What is the most logical first step to investigate?",
    options: ['Redesign the entire page', 'Check for form validation errors on mobile', 'Offer a 10% discount', 'Change the button color to red']
  },
  {
    id: 'creative',
    type: 'Creativity',
    title: 'Ideate a Solution',
    icon: Lightbulb,
    content: "How would you redesign the shipping form to reduce friction? (Select the best approach)",
    options: ['Add more fields for detailed data', 'Implement Google Maps autocomplete for addresses', 'Split the form into 5 separate pages', 'Remove the shipping form entirely']
  },
  {
    id: 'decision',
    type: 'Decision Making',
    title: 'The Trade-off',
    icon: Scale,
    content: "The autocomplete API costs $0.05 per request. The engineering manager asks if it's worth it. What is your response?",
    options: ['No, it\'s too expensive.', 'Yes, if the increased conversion rate outpaces the API cost.', 'Let\'s build our own maps API instead.', 'Only use it for desktop users.']
  },
  {
    id: 'realworld',
    type: 'Real-World Thinking',
    title: 'Stakeholder Communication',
    icon: Globe,
    content: "You fixed the bug, but it will delay another feature by 2 days. How do you communicate this to the Product Manager?",
    options: ['Say nothing and hope they don\'t notice.', 'Send a quick Slack message explaining the trade-off and asking for prioritization.', 'Work through the weekend to finish both.', 'Blame the designer for the bad mobile layout.']
  },
  {
    id: 'reflection',
    type: 'Self-Reflection',
    title: 'Gut Check',
    icon: HeartHandshake,
    content: "How did this mission feel? Did you enjoy the mix of technical problem-solving and user empathy?",
    options: ['Loved it! Felt very natural.', 'It was okay, but I prefer just coding.', 'I liked the design part, but not the coding.', 'Not for me. Too frustrating.']
  }
];

export default function TrialMission() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = (answer?: string) => {
    if (answer) {
      setAnswers({ ...answers, [MISSION_STEPS[currentStep].id]: answer });
    }
    
    if (currentStep < MISSION_STEPS.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setIsComplete(true);
    }
  };

  const step = MISSION_STEPS[currentStep];
  const Icon = step.icon;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-slate-800 rounded-3xl p-12 text-center border border-slate-700 shadow-2xl"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Mission Accomplished</h1>
          <p className="text-slate-400 text-lg mb-8">
            You successfully navigated a real-world frontend engineering scenario. Your performance data has been logged to your dashboard.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
              <p className="text-sm text-slate-500 mb-1">Technical Aptitude</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 w-[85%]"></div>
                </div>
                <span className="text-sm font-bold">85%</span>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
              <p className="text-sm text-slate-500 mb-1">Interest Level</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%]"></div>
                </div>
                <span className="text-sm font-bold">High</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 transition-colors">
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col text-slate-300">
      {/* Top Navigation Bar */}
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-white leading-tight">Frontend Fixer</h2>
            <p className="text-xs text-slate-500">Micro-Internship • Software Engineering</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {MISSION_STEPS.map((s, idx) => (
              <div 
                key={s.id} 
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStep ? 'bg-brand-500 scale-150' : 
                  idx < currentStep ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          <div className="px-3 py-1.5 rounded-md bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700">
            {currentStep + 1} / {MISSION_STEPS.length}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800 rounded-[2rem] border border-slate-700 shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-2">
                    <Icon className="w-3 h-3" />
                    {step.type}
                  </div>
                </div>
                
                <h2 className="text-3xl font-display font-bold text-white mb-6 leading-tight">
                  {step.title}
                </h2>
                
                <p className="text-lg text-slate-400 leading-relaxed mb-10">
                  {step.content}
                </p>

                {step.id === 'intro' ? (
                  <button 
                    onClick={() => handleNext()}
                    className="w-full py-4 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20"
                  >
                    Accept Mission
                    <Play className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    {step.options?.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNext(option)}
                        className="w-full text-left p-5 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-brand-500 hover:bg-slate-900 transition-all group flex items-center justify-between"
                      >
                        <span className="text-slate-300 group-hover:text-white font-medium">{option}</span>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Terminal-like footer for immersion */}
              <div className="bg-slate-950 p-4 border-t border-slate-800 font-mono text-xs text-slate-500 flex items-center gap-2">
                <span className="text-brand-500">~/mission</span>
                <span className="text-slate-700">$</span>
                <span className="animate-pulse">_</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
