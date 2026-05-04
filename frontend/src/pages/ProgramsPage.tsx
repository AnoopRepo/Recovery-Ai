import { motion } from 'framer-motion';
import { Sparkles, Calendar, Zap, Brain, Moon, Coffee, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const programs = [
  {
    title: "Digital Detox & Deep Work",
    subtitle: "7-Day Tech Recovery",
    price: "Free",
    isFree: true,
    description: "Designed for Software Engineers and Tech Professionals to reclaim focus and eliminate screen fatigue.",
    color: "bg-[var(--color-sage)]",
    icon: <Zap className="text-white" size={32} />,
    days: [
      { day: 1, focus: "Digital Audit", activity: "Unsubscribe from all non-essential notifications and delete 'doom-scrolling' apps." },
      { day: 2, focus: "Single-Tasking", activity: "Work on one task for 90 minutes without checking email or messages." },
      { day: 3, focus: "Gray-Scale Sunday", activity: "Turn your phone screen to grayscale to reduce visual dopamine hits." },
      { day: 4, focus: "Deep Focus Blocks", activity: "Implement three 2-hour 'Deep Work' sessions with zero interruptions." },
      { day: 5, focus: "Analog Evening", activity: "No screens 3 hours before bed. Read a physical book or journal." },
      { day: 6, focus: "Movement & Flow", activity: "Engage in 1 hour of non-digital hobby (painting, cooking, hiking)." },
      { day: 7, focus: "Mindful Reset", activity: "Reflect on focus improvements and set new digital boundaries for the week ahead." }
    ]
  },
  {
    title: "Mindful Balance & Vitality",
    subtitle: "7-Day Holistic Recovery",
    price: "₹1499",
    isFree: false,
    description: "Ideal for Students and Corporate Professionals to reduce anxiety and restore mental energy with expert guidance.",
    color: "bg-[var(--color-accent)]",
    icon: <Sparkles className="text-white" size={32} />,
    days: [
      { day: 1, focus: "Breath & Presence", activity: "Practice 10 minutes of box breathing every 4 hours." },
      { day: 2, focus: "Nature Connection", activity: "Spend 20 minutes outside without headphones or phone." },
      { day: 3, focus: "Compassionate Boundaries", activity: "Practice saying 'no' to one non-essential social or work commitment." },
      { day: 4, focus: "Sleep Optimization", activity: "Set a strict 'No-Work' zone in your bedroom. Dim lights at 8 PM." },
      { day: 5, focus: "Gratitude Mapping", activity: "Write down 5 things you're grateful for and why they matter." },
      { day: 6, focus: "Social Sabbatical", activity: "Spend the entire day away from social media. Connect with someone in person." },
      { day: 7, focus: "Vision Alignment", activity: "Set 3 intentions for the month that prioritize peace over productivity." }
    ]
  }
];

const ProgramsPage = () => {
  return (
    <div className="font-sans bg-[var(--color-warm-white)] text-[var(--color-charcoal)] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[140px] px-6 md:px-12 pb-20 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[var(--color-sage-light)]/20 px-4 py-2 rounded-full text-[var(--color-sage-dark)] font-bold text-sm mb-6 uppercase tracking-wider"
          >
            <Calendar size={16} /> 7-Day Transformation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6 text-[var(--color-charcoal)]"
          >
            Recovery <span className="text-[var(--color-sage)] italic">Blueprints</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed"
          >
            Select a specialized 7-day program designed to help you break the burnout cycle and reclaim your vitality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {programs.map((program, pIndex) => (
            <motion.div 
              key={program.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: pIndex * 0.2 }}
              className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-[var(--color-cream)] flex flex-col"
            >
              <div className={`${program.color} p-10 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4 scale-150">
                  {program.icon}
                </div>
                {!program.isFree && (
                  <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                    Recommended
                  </div>
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    {program.icon}
                  </div>
                  <div className="flex items-end gap-3 mb-2">
                    <h2 className="text-3xl font-serif font-bold">{program.title}</h2>
                    <span className="text-2xl font-bold opacity-90 pb-0.5">{program.price}</span>
                  </div>
                  <p className="text-white/80 font-medium mb-4 uppercase tracking-widest text-sm">{program.subtitle}</p>
                  <p className="text-white/90 leading-relaxed max-w-md">{program.description}</p>
                </div>
              </div>

              <div className="p-10 flex-grow">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <CheckCircle2 className="text-[var(--color-sage)]" /> The 7-Day Journey
                </h3>
                
                <div className="space-y-6">
                  {program.days.map((day, dIndex) => (
                    <div key={day.day} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-warm-white)] flex items-center justify-center text-xs font-bold text-[var(--color-muted)] group-hover:bg-[var(--color-sage)] group-hover:text-white transition-all">
                        {day.day}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-sage-dark)] transition-colors">{day.focus}</h4>
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed">{day.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className={`w-full mt-12 ${program.isFree ? 'bg-[var(--color-charcoal)]' : 'bg-[var(--color-accent)]'} text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg group`}>
                  {program.isFree ? 'Start Free Journey' : 'Upgrade to Premium'} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-[var(--color-sage)] rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">Not sure which one to choose?</h2>
            <p className="text-white/80 text-lg mb-8">Take our AI-powered assessment to get a personalized recommendation based on your burnout symptoms.</p>
            <button 
              onClick={() => window.location.href='/assessment'}
              className="bg-white text-[var(--color-sage-dark)] px-10 py-5 rounded-full font-bold text-lg hover:bg-[var(--color-warm-white)] transition-all shadow-xl"
            >
              Take the Assessment
            </button>
          </div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramsPage;
