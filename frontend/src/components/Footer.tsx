import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white/60 px-6 md:px-12 pt-[60px] pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="font-serif text-[22px] font-bold text-[#A8C4B4] tracking-tight block mb-4">
            re<span className="text-[#D4856A] italic">charge</span>
          </span>
          <p className="text-[14px] leading-relaxed max-w-[260px]">
            A science-backed platform to help you recover from digital burnout, reclaim your focus, and live more intentionally.
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
        <div className="text-[13px] text-center md:text-left">© 2026 Recharge. Made with 🌿 for a healthier digital world.</div>
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
