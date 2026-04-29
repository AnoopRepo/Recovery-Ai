import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="font-sans bg-[var(--color-warm-white)] text-[var(--color-charcoal)] overflow-x-hidden min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 pt-[120px] pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(168,196,180,0.25)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(212,133,106,0.12)_0%,transparent_50%)]"></div>
        <div className="absolute right-[-10%] md:right-[8%] top-1/2 -translate-y-1/2 w-[300px] md:w-[480px] h-[300px] md:h-[480px] rounded-full bg-[radial-gradient(circle,rgba(168,196,180,0.4)_0%,rgba(124,158,138,0.15)_50%,transparent_70%)] blur-[30px] md:blur-[40px] animate-pulse-slow"></div>
        
        <div className="relative z-10 max-w-[580px] w-full lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
          <div className="inline-flex items-center gap-2 bg-[rgba(124,158,138,0.12)] border border-[rgba(124,158,138,0.3)] px-4 py-1.5 rounded-full mb-8 text-[12px] font-semibold text-[var(--color-sage-dark)] uppercase tracking-wide animate-fade-up">
            <span className="w-1.5 h-1.5 bg-[var(--color-sage)] rounded-full animate-blink"></span>
            🌿 Science-backed recovery
          </div>
          <h1 className="font-serif text-[clamp(36px,5vw,68px)] leading-[1.1] font-bold text-[var(--color-charcoal)] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Heal your mind from <em className="text-[var(--color-sage-dark)] italic">digital</em> <span className="text-[var(--color-accent)]">burnout</span>
          </h1>
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[var(--color-muted)] font-light mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            A structured 30-day recovery platform that helps you reclaim your focus, sleep better, and build healthier screen habits — one day at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/assessment" className="w-full sm:w-auto bg-[var(--color-sage-dark)] text-white px-9 py-4 rounded-full text-[16px] font-semibold hover:bg-[var(--color-sage)] transition-all hover:-translate-y-0.5 shadow-[0_8px_32px_rgba(74,112,96,0.3)] hover:shadow-[0_12px_40px_rgba(74,112,96,0.4)]">
              Take Free Burnout Quiz →
            </Link>
            <button className="w-full sm:w-auto bg-transparent text-[var(--color-charcoal)] px-7 py-4 rounded-full text-[15px] font-medium border-[1.5px] border-[rgba(44,44,44,0.2)] hover:border-[var(--color-sage-dark)] hover:text-[var(--color-sage-dark)] transition-all">
              Watch how it works
            </button>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-10 mt-14 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-[24px] md:text-[32px] font-bold text-[var(--color-charcoal)]">12k+</span>
              <span className="text-[12px] md:text-[13px] text-[var(--color-muted)]">People recovered</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-[24px] md:text-[32px] font-bold text-[var(--color-charcoal)]">94%</span>
              <span className="text-[12px] md:text-[13px] text-[var(--color-muted)]">Feel better in 21 days</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-[24px] md:text-[32px] font-bold text-[var(--color-charcoal)]">4.9★</span>
              <span className="text-[12px] md:text-[13px] text-[var(--color-muted)]">User satisfaction</span>
            </div>
          </div>
        </div>

        {/* Float Cards */}
        <div className="relative lg:absolute lg:right-[5%] lg:top-1/2 lg:-translate-y-1/2 w-full max-w-[340px] flex flex-col gap-4 z-20 animate-fade-up mx-auto lg:mx-0" style={{ animationDelay: '0.5s' }}>
          <div className="bg-[#FDFAF5]/90 backdrop-blur-md border border-[#7C9E8A]/20 rounded-[20px] p-5 shadow-[0_8px_32px_rgba(44,44,44,0.06)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] bg-[#7C9E8A]/15">🧠</div>
              <div>
                <div className="font-semibold text-[14px] text-[var(--color-charcoal)]">Your Burnout Score</div>
                <div className="text-[12px] text-[var(--color-muted)]">Updated today</div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2"><span className="text-[12px] text-[var(--color-muted)]">Mental fatigue</span><span className="text-[12px] font-semibold text-[var(--color-charcoal)]">68%</span></div>
            <div className="h-1.5 bg-black/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000 bg-[var(--color-accent)] w-[68%]"></div></div>
            <div className="mt-2.5">
              <div className="flex justify-between items-center mb-2"><span className="text-[12px] text-[var(--color-muted)]">Screen dependency</span><span className="text-[12px] font-semibold text-[var(--color-charcoal)]">74%</span></div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000 bg-[var(--color-soft-blue)] w-[74%]"></div></div>
            </div>
            <div className="mt-2.5">
              <div className="flex justify-between items-center mb-2"><span className="text-[12px] text-[var(--color-muted)]">Sleep quality</span><span className="text-[12px] font-semibold text-[var(--color-charcoal)]">42%</span></div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000 bg-[var(--color-sage)] w-[42%]"></div></div>
            </div>
          </div>

          <div className="bg-[#FDFAF5]/90 backdrop-blur-md border border-[#7C9E8A]/20 rounded-[20px] p-5 shadow-[0_8px_32px_rgba(44,44,44,0.06)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] bg-[#D4856A]/15">✨</div>
              <div>
                <div className="font-semibold text-[14px] text-[var(--color-charcoal)]">How are you feeling?</div>
                <div className="text-[12px] text-[var(--color-muted)]">Daily check-in</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-all bg-[var(--color-sage-dark)] text-white">😴 Exhausted</span>
              <span className="px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-all bg-[#7C9E8A]/10 text-[var(--color-sage-dark)]">😰 Anxious</span>
              <span className="px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-all bg-[#7C9E8A]/10 text-[var(--color-sage-dark)]">😶 Numb</span>
              <span className="px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-all bg-[#7C9E8A]/10 text-[var(--color-sage-dark)]">🙂 Okay</span>
            </div>
          </div>

          <div className="bg-[#FDFAF5]/90 backdrop-blur-md border border-[#7C9E8A]/20 rounded-[20px] p-5 shadow-[0_8px_32px_rgba(44,44,44,0.06)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] bg-[#8BA9C0]/15">🔥</div>
              <div>
                <div className="font-semibold text-[14px] text-[var(--color-charcoal)]">Day 7 Streak!</div>
                <div className="text-[12px] text-[var(--color-muted)]">Keep it going</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              {['M','T','W','T','F','S'].map(d => (
                <div key={d} className="flex-1 h-8 bg-[var(--color-sage-dark)] rounded-lg flex items-center justify-center text-[11px] text-white font-semibold">{d}</div>
              ))}
              <div className="flex-1 h-8 bg-[#7C9E8A]/15 rounded-lg flex items-center justify-center text-[11px] text-[var(--color-muted)] font-semibold">S</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-6 md:px-12 py-[80px] md:py-[100px] bg-[var(--color-cream)]">
        <div className="text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-sage-dark)] mb-4 text-center lg:text-left">Process</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-center mt-10">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.15] text-[var(--color-charcoal)] mb-5 text-center lg:text-left">
              Recovery that actually <em className="italic text-[var(--color-sage-dark)]">works</em>
            </h2>
            <p className="text-[16px] md:text-[17px] text-[var(--color-muted)] leading-[1.7] font-light max-w-[520px] mx-auto lg:mx-0 text-center lg:text-left">
              A structured, science-backed approach to reversing digital burnout — not just another app with generic tips.
            </p>
            <div className="flex flex-col mt-10">
              {[
                { num: '01', title: 'Take the Burnout Assessment', desc: '20-question quiz that evaluates your screen habits, sleep, focus, and stress levels. Get your personalized burnout score in 5 minutes.' },
                { num: '02', title: 'Get Your Recovery Roadmap', desc: 'Based on your score, receive a personalized 7, 21, or 30-day program with daily micro-challenges and exercises.' },
                { num: '03', title: 'Check In Every Day', desc: 'Quick daily check-ins (under 2 minutes) track your mood, energy, and screen time. Streaks keep you motivated.' },
                { num: '04', title: 'Watch Your Score Improve', desc: 'Weekly insights show real progress. See your burnout score drop, sleep improve, and focus sharpen over time.' }
              ].map((step, idx, arr) => (
                <div key={step.num} className={`group flex flex-col sm:flex-row gap-4 sm:gap-5 py-7 border-[#7C9E8A]/15 cursor-pointer transition-all ${idx !== arr.length - 1 ? 'border-b' : ''}`}>
                  <div className="w-10 h-10 rounded-xl shrink-0 bg-[#7C9E8A]/10 text-[var(--color-sage-dark)] flex items-center justify-center font-bold text-[14px] transition-all group-hover:bg-[var(--color-sage-dark)] group-hover:text-white mx-auto sm:mx-0">
                    {step.num}
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-[16px] mb-1.5">{step.title}</div>
                    <div className="text-[14px] text-[var(--color-muted)] leading-[1.6]">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[var(--color-warm-white)] rounded-[28px] p-6 md:p-9 shadow-[0_20px_60px_rgba(44,44,44,0.08)] border border-[#7C9E8A]/10 w-full max-w-[500px] mx-auto lg:mx-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-7 gap-4">
              <div className="text-center sm:text-left">
                <div className="font-serif text-[18px] md:text-[20px] font-bold">Good morning, Zoro 👋</div>
                <div className="text-[12px] md:text-[13px] text-[var(--color-muted)]">Tuesday, Day 7 of 21</div>
              </div>
              <div className="bg-[#7C9E8A]/10 px-4 py-2 rounded-full text-[11px] md:text-[12px] font-semibold text-[var(--color-sage-dark)]">🔥 7 day streak</div>
            </div>
            <div className="w-[100px] md:w-[120px] h-[100px] md:h-[120px] rounded-full mx-auto mb-7 bg-[conic-gradient(var(--color-sage-dark)_0%_68%,rgba(124,158,138,0.15)_68%_100%)] flex items-center justify-center relative">
              <div className="w-[75px] md:w-[90px] h-[75px] md:h-[90px] rounded-full bg-[var(--color-warm-white)] flex flex-col items-center justify-center">
                <div className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-sage-dark)]">68</div>
                <div className="text-[9px] md:text-[10px] text-[var(--color-muted)] font-medium">SCORE</div>
              </div>
            </div>
            <div className="text-center mb-5 text-[12px] md:text-[13px] text-[var(--color-muted)]">Burnout Score — down 12 pts this week ↓</div>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {[
                { icon: '😴', val: '6.5h', lbl: 'Sleep last night' },
                { icon: '📱', val: '3.2h', lbl: 'Screen time' },
                { icon: '🧘', val: '12 min', lbl: 'Mindfulness' },
                { icon: '⚡', val: '7/10', lbl: 'Energy level' },
              ].map(m => (
                <div key={m.lbl} className="bg-[var(--color-cream)] rounded-2xl p-3 md:p-4 flex flex-col gap-1 md:gap-1.5">
                  <div className="text-[18px] md:text-[20px]">{m.icon}</div>
                  <div className="font-bold text-[16px] md:text-[18px]">{m.val}</div>
                  <div className="text-[10px] md:text-[11px] text-[var(--color-muted)]">{m.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
