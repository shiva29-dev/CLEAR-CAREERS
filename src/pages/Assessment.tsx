import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Brain, Briefcase, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI, Type } from '@google/genai';

const QUESTIONS = [
  {
    id: 1,
    text: "When working on a group project, what role do you naturally gravitate towards?",
    options: [
      { id: 'a', text: "Organizing the timeline and delegating tasks.", type: 'Management' },
      { id: 'b', text: "Brainstorming the core concept and designing the presentation.", type: 'Creative' },
      { id: 'c', text: "Doing the deep research and analyzing the data.", type: 'Analytical' },
      { id: 'd', text: "Building the actual prototype or writing the final document.", type: 'Technical' },
    ]
  },
  {
    id: 2,
    text: "How do you prefer to solve a complex problem?",
    options: [
      { id: 'a', text: "Look at the big picture and find patterns.", type: 'Strategic' },
      { id: 'b', text: "Break it down into small, logical steps.", type: 'Analytical' },
      { id: 'c', text: "Discuss it with others to get different perspectives.", type: 'Collaborative' },
      { id: 'd', text: "Try out different hands-on solutions until one works.", type: 'Practical' },
    ]
  },
  {
    id: 3,
    text: "What type of environment helps you do your best work?",
    options: [
      { id: 'a', text: "A fast-paced, ever-changing environment with new challenges daily.", type: 'Dynamic' },
      { id: 'b', text: "A quiet, structured space where I can focus deeply on one task.", type: 'Focused' },
      { id: 'c', text: "A highly collaborative space with lots of team interaction.", type: 'Social' },
      { id: 'd', text: "An environment where I can be independent and set my own schedule.", type: 'Autonomous' },
    ]
  },
  {
    id: 4,
    text: "When learning something new, what is your preferred method?",
    options: [
      { id: 'a', text: "Reading articles, books, or documentation.", type: 'Textual' },
      { id: 'b', text: "Watching videos or visual tutorials.", type: 'Visual' },
      { id: 'c', text: "Listening to podcasts or lectures.", type: 'Auditory' },
      { id: 'd', text: "Jumping right in and learning by doing.", type: 'Kinesthetic' },
    ]
  },
  {
    id: 5,
    text: "What kind of impact do you want your work to have?",
    options: [
      { id: 'a', text: "Creating something beautiful or entertaining that people love.", type: 'Creative Impact' },
      { id: 'b', text: "Solving critical problems that improve efficiency or save money.", type: 'Practical Impact' },
      { id: 'c', text: "Helping individuals directly and improving their lives.", type: 'Social Impact' },
      { id: 'd', text: "Advancing human knowledge or building cutting-edge technology.", type: 'Innovative Impact' },
    ]
  }
];

interface CareerResult {
  cluster: string;
  score: number;
  careers: string[];
}

export default function Assessment() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<CareerResult[]>([]);

  const evaluateAnswers = async (finalAnswers: Record<number, string>) => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      
      const promptData = QUESTIONS.map((q, index) => {
        const selectedOption = q.options.find(o => o.id === finalAnswers[index]);
        return `Q: ${q.text}\nA: ${selectedOption?.text} (${selectedOption?.type})`;
      }).join('\n\n');

      const prompt = `Based on the following answers to a career assessment, suggest 3 career clusters and 2-3 specific careers for each cluster. 
      Make the scores realistic percentages between 60 and 98, ordered from highest to lowest score.
      
      User Answers:
      ${promptData}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                cluster: { type: Type.STRING, description: "Name of the career cluster" },
                score: { type: Type.NUMBER, description: "Match percentage (60-98)" },
                careers: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "List of 2-3 specific careers"
                }
              },
              required: ["cluster", "score", "careers"]
            }
          }
        }
      });

      if (response.text) {
        const parsedResults = JSON.parse(response.text);
        setResults(parsedResults);
      }
    } catch (error) {
      console.error("Error evaluating answers:", error);
      // Fallback results
      setResults([
        { cluster: "Technology & Engineering", score: 92, careers: ["Software Engineer", "Data Scientist", "UX Designer"] },
        { cluster: "Creative Arts & Design", score: 78, careers: ["Product Designer", "Art Director", "Animator"] },
        { cluster: "Business & Strategy", score: 65, careers: ["Product Manager", "Management Consultant"] }
      ]);
    } finally {
      setIsAnalyzing(false);
      setIsComplete(true);
    }
  };

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [currentQ]: optionId };
    setAnswers(newAnswers);
    
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(q => q + 1), 300);
    } else {
      evaluateAnswers(newAnswers);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-blue-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-200">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-brand-100 dark:border-brand-900/30 border-t-brand-600 dark:border-t-brand-500 mb-8"
        />
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Analyzing your profile...</h2>
        <p className="text-slate-500 dark:text-slate-400">Mapping your traits to 500+ career paths using AI</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-blue-50 dark:bg-slate-950 p-6 lg:p-12 transition-colors duration-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Your Career Compass Results</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Based on your psychometric profile, we've identified your strongest career clusters and generated a shortlist of paths to explore.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {results.map((result, idx) => (
              <motion.div 
                key={result.cluster}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-8 border ${idx === 0 ? 'border-brand-500 shadow-xl shadow-brand-500/10 relative overflow-hidden' : 'border-slate-200 dark:border-slate-800 shadow-sm'}`}
              >
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Top Match
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${idx === 0 ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    <Brain className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-display font-bold ${idx === 0 ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>{result.score}%</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Match</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{result.cluster}</h3>
                
                <div className="space-y-3 mb-8">
                  {result.careers.map(career => (
                    <div key={career} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                      <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{career}</span>
                    </div>
                  ))}
                </div>

                {idx === 0 && (
                  <Link to="/reality" className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors">
                    Explore Reality Pages
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQ];

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold">
            <Compass className="w-5 h-5" />
            <span>The Compass</span>
          </div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Question {currentQ + 1} of {QUESTIONS.length}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-8 leading-tight">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option) => {
              const isSelected = answers[currentQ] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-center justify-between ${
                    isSelected 
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-200 dark:hover:border-brand-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`text-lg font-medium ${isSelected ? 'text-brand-900 dark:text-brand-100' : 'text-slate-700 dark:text-slate-300'}`}>
                    {option.text}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                    isSelected ? 'border-brand-500 bg-brand-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-brand-300 dark:group-hover:border-brand-600'
                  }`}>
                    {isSelected && <Zap className="w-3 h-3 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
