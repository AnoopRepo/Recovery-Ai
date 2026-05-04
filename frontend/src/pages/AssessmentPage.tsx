import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, ClipboardCheck, Sparkles, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const professionQuestions: Record<string, { id: number, question: string, options: string[] }[]> = {
  'Student': [
    { id: 1, question: "How often do you feel overwhelmed by your academic workload?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 2, question: "Do you struggle to focus on studying due to digital distractions?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 3, question: "How often do you feel anxious about upcoming exams or assignments?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 4, question: "Do you feel like your social life is entirely dependent on social media?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, question: "How often do you sacrifice sleep to finish your studies?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 6, question: "Do you feel a lack of motivation toward your chosen field of study?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 7, question: "How often do you compare your academic progress with others online?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 8, question: "Do you experience physical symptoms like headaches or eye strain from long study sessions?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 9, question: "How often do you feel that your academic efforts go unrecognized?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 10, question: "Do you feel constant pressure to be 'productive' every hour of the day?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ],
  'Software Engineer': [
    { id: 1, question: "How often do you feel 'stuck' or mentally blocked on a coding problem?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 2, question: "Do you find it difficult to stop thinking about code after work hours?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 3, question: "How often do you feel overwhelmed by the rapid pace of technological change?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 4, question: "Do you experience 'Imposter Syndrome' regarding your technical skills?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, question: "How often do you feel drained by long meetings or 'sprint' deadlines?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 6, question: "Do you find yourself working through lunch or breaks consistently?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 7, question: "How often do you feel a lack of creative control over your projects?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 8, question: "Do you struggle with physical issues like back pain or carpal tunnel?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 9, question: "How often do you feel isolated while working remotely or in a silo?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 10, question: "Do you feel that your work-life balance is being compromised by 'on-call' duties?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ],
  'Healthcare Worker': [
    { id: 1, question: "How often do you feel emotionally exhausted by patient care?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 2, question: "Do you experience 'compassion fatigue' or feel less empathetic than usual?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 3, question: "How often do you feel overwhelmed by the administrative part of healthcare?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 4, question: "Do you find it hard to 'switch off' from work-related trauma at home?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, question: "How often do you feel that you don't have enough time for each patient?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 6, question: "Do you feel physically unsafe or highly stressed in your work environment?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 7, question: "How often do you worry about making a clinical error due to fatigue?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 8, question: "Do you struggle with irregular shift patterns affecting your sleep?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 9, question: "How often do you feel that your mental health is secondary to your job?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 10, question: "Do you feel supported by your institution's leadership?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ],
  'Corporate Employee': [
    { id: 1, question: "How often do you feel that your daily tasks are repetitive or mundane?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 2, question: "Do you feel pressured to respond to emails/messages instantly?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 3, question: "How often do you feel that your work goals are unrealistic?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 4, question: "Do you find office politics or corporate hierarchy stressful?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, question: "How often do you feel your personal values conflict with company goals?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 6, question: "Do you experience a lack of growth or learning opportunities?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 7, question: "How often do you feel micromanaged by your superiors?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 8, question: "Do you feel that your contributions are undervalued in the company?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 9, question: "How often do you feel anxious about job security?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 10, question: "Do you struggle to maintain a healthy diet or exercise due to long hours?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ],
  'Entrepreneur': [
    { id: 1, question: "How often do you feel the full weight of business responsibility on your shoulders?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 2, question: "Do you find it impossible to take a true day off without checking work?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 3, question: "How often do you feel anxious about cash flow or financial stability?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 4, question: "Do you struggle with the isolation of making all major decisions alone?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, question: "How often do you feel that your identity is too tied to your business success?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 6, question: "Do you find yourself working late into the night consistently?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 7, question: "How often do you feel overwhelmed by the need to 'wear many hats'?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 8, question: "Do you experience physical symptoms of stress related to business risks?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 9, question: "How often do you feel that you are neglecting personal relationships for work?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 10, question: "Do you feel that the 'hustle culture' is negatively impacting your health?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ],
  'Other': [
    { id: 1, question: "How often do you feel physically exhausted after a day of work?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 2, question: "Do you feel emotionally drained by your tasks and responsibilities?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 3, question: "How often do you find yourself reacting with irritability?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 4, question: "Do you feel like your productivity and quality of work have declined?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, question: "How often do you feel that your work is not meaningful?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 6, question: "Do you have trouble disconnecting from work and digital devices?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 7, question: "How often do you feel overwhelmed by digital notifications?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 8, question: "Do you feel like you are 'always on' and can never truly rest?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 9, question: "How often do you experience physical stress (headaches, muscle tension)?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 10, question: "Do you feel a lack of support in your professional life?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ]
};

const AssessmentPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userProfession = user.profession || 'Other';
  const questions = professionQuestions[userProfession] || professionQuestions['Other'];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError("You must be logged in to submit an assessment.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userContext = `User Name: ${user.name || 'User'}\nProfession: ${userProfession}\n\n`;
      const answersString = userContext + questions.map(q => `${q.question}: ${answers[q.id]}`).join('\n');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://recovery-ai-tper.onrender.com';
      const response = await axios.post(`${apiUrl}/api/assessment/submit`, 
        { answers: answersString },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data.analysis);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || "Something went wrong. Please try again.";
      if (typeof msg === 'string' && (msg.includes('429') || msg.includes('high demand') || msg.includes('rate'))) {
        setError("⏳ The AI service is busy right now. Please wait 30 seconds and try again.");
      } else {
        setError(typeof msg === 'string' ? msg : "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="font-sans bg-[var(--color-warm-white)] text-[var(--color-charcoal)] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[120px] px-6 md:px-12 pb-20 max-w-4xl mx-auto w-full">
        {!result ? (
          <div className="w-full">
            <div className="mb-12 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage-dark)] text-xs font-bold uppercase tracking-wider mb-4">
                <ClipboardCheck size={14} />
                Assessment
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Digital Burnout Analysis</h1>
              <p className="text-[var(--color-muted)] max-w-xl mx-auto">Answer these questions honestly to receive a personalized recovery plan generated by our AI.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden border border-[var(--color-cream)]">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[var(--color-cream)]">
                <motion.div 
                  className="h-full bg-[var(--color-sage)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="text-sm font-bold text-[var(--color-sage)] uppercase tracking-widest">Question {currentStep + 1} / {questions.length}</span>
                {error && <span className="text-red-500 text-sm font-medium">{error}</span>}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[300px]"
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-10 leading-tight">
                    {questions[currentStep].question}
                  </h2>

                  <div className="grid gap-4">
                    {questions[currentStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
                          answers[questions[currentStep].id] === option
                            ? 'border-[var(--color-sage)] bg-[var(--color-sage-light)]/10 text-[var(--color-sage-dark)]'
                            : 'border-[var(--color-cream)] hover:border-[var(--color-sage-light)] hover:bg-[var(--color-warm-white)]'
                        }`}
                      >
                        <span className="font-medium text-lg">{option}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          answers[questions[currentStep].id] === option
                            ? 'bg-[var(--color-sage)] border-[var(--color-sage)]'
                            : 'border-[var(--color-cream)] group-hover:border-[var(--color-sage-light)]'
                        }`}>
                          {answers[questions[currentStep].id] === option && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex items-center justify-between">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={`flex items-center gap-2 font-bold text-sm transition-all ${
                    currentStep === 0 ? 'opacity-0' : 'text-[var(--color-muted)] hover:text-[var(--color-charcoal)]'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Back
                </button>

                {currentStep === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !answers[questions[currentStep].id]}
                    className="flex items-center gap-2 bg-[var(--color-charcoal)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-sage-dark)] transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Generating Analysis...
                      </>
                    ) : (
                      <>
                        Get My Recovery Plan
                        <Sparkles size={20} />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled={!answers[questions[currentStep].id]}
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex items-center gap-2 text-[var(--color-sage-dark)] font-bold transition-all hover:translate-x-1 disabled:opacity-30"
                  >
                    Next Question
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-[var(--color-cream)]"
          >
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 bg-[var(--color-sage-light)]/20 rounded-full flex items-center justify-center text-[var(--color-sage)] mb-6">
                <Sparkles size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Your Personalized Analysis</h2>
              <div className="h-1 w-20 bg-[var(--color-sage)] rounded-full mb-8" />
            </div>

            <div className="prose prose-lg max-w-none text-[var(--color-charcoal)] leading-relaxed text-left">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-serif font-bold mb-4 mt-8 text-[var(--color-sage-dark)]" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-serif font-bold mb-3 mt-6 text-[var(--color-sage-dark)]" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 mt-4 text-[var(--color-charcoal)]" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-[var(--color-charcoal)]/80" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-[var(--color-charcoal)]/80" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-[var(--color-sage-dark)]" {...props} />,
                }}
              >
                {result || ""}
              </ReactMarkdown>
            </div>

            <div className="mt-16 flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-[var(--color-charcoal)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-sage-dark)] transition-all shadow-lg"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([result || ""], {type: 'text/markdown'});
                  element.href = URL.createObjectURL(file);
                  element.download = "Recovery_Report.md";
                  document.body.appendChild(element);
                  element.click();
                }}
                className="bg-[var(--color-sage)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-sage-dark)] transition-all shadow-lg"
              >
                Download Detailed Report
              </button>
              <button 
                onClick={() => { setResult(null); setCurrentStep(0); setAnswers({}); }}
                className="border-2 border-[var(--color-cream)] text-[var(--color-charcoal)] px-8 py-4 rounded-full font-bold hover:bg-[var(--color-warm-white)] transition-all"
              >
                Take Assessment Again
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AssessmentPage;
