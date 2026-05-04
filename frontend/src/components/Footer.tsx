import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white/60 px-6 md:px-12 pt-[60px] pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className="w-8 h-8">
              <circle cx="24" cy="24" r="22" fill="#A8C4B4" opacity="0.2"/>
              <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#A8C4B4" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M24 32s-7-4.5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 31 23c0 4.5-7 9-7 9z" fill="#D4856A"/>
              <path d="M10 28h4l2-4 4 8 3-5 2 3h5" stroke="#A8C4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-serif text-[20px] font-bold text-[#A8C4B4] tracking-tight">
              Mind<span className="text-[#D4856A] italic">Heal</span> <span className="text-[11px] font-semibold bg-[#A8C4B4]/20 text-[#A8C4B4] px-1.5 py-0.5 rounded-md ml-0.5 not-italic">AI</span>
            </span>
          </div>
          <p className="text-[14px] leading-relaxed max-w-[260px]">
            An AI-powered mental health recovery platform to help you overcome burnout, reclaim your focus, and build lasting resilience.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[14px] text-white/90 mb-5">Platform</h4>
          <ul className="flex flex-col gap-3 list-none">
            <li><Link to="/assessment" className="text-[14px] text-white/50 hover:text-[#A8C4B4] transition-colors">Burnout Quiz</Link></li>
            <li><a href="#programs" className="text-[14px] text-white/50 hover:text-[#A8C4B4] transition-colors">Programs</a></li>
            <li><Link to="/dashboard" className="text-[14px] text-white/50 hover:text-[#A8C4B4] transition-colors">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[14px] text-white/90 mb-5">Company</h4>
          <ul className="flex flex-col gap-3 list-none">
            <li><a href="#" className="text-[14px] text-white/50 hover:text-[#A8C4B4] transition-colors">About Us</a></li>
            <li><a href="#" className="text-[14px] text-white/50 hover:text-[#A8C4B4] transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[14px] text-white/90 mb-5">Support</h4>
          <ul className="flex flex-col gap-3 list-none">
            <li><a href="#" className="text-[14px] text-white/50 hover:text-[#A8C4B4] transition-colors">Help Center</a></li>
            <li><a href="#" className="text-[14px] text-white/50 hover:text-[#A8C4B4] transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[13px] text-center md:text-left">© 2026 MindHeal AI. Made with 🧠💚 for better mental wellness.</div>
        <div className="flex gap-4">
          <a href="#" className="w-9 h-9 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-[14px] text-white transition-all hover:bg-[#7C9E8A]/20 hover:border-[#A8C4B4]">𝕏</a>
          <a href="#" className="w-9 h-9 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-[14px] text-white transition-all hover:bg-[#7C9E8A]/20 hover:border-[#A8C4B4]">in</a>
          <a href="#" className="w-9 h-9 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-[14px] text-white transition-all hover:bg-[#7C9E8A]/20 hover:border-[#A8C4B4]">ig</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
