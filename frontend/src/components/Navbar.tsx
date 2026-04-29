import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#FDFAF5]/85 backdrop-blur-md border-b border-[#7C9E8A]/15">
      <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
        <div className="font-serif text-[20px] md:text-[22px] font-bold text-[#4A7060] tracking-tight">
          <Link to="/">re<span className="text-[#D4856A] italic">charge</span></Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 list-none items-center">
          <li><Link to="/" className="text-[#7A7A72] text-[14px] font-medium transition-colors hover:text-[#4A7060]">Home</Link></li>
          {isLoggedIn && (
            <li><Link to="/dashboard" className="text-[#7A7A72] text-[14px] font-medium transition-colors hover:text-[#4A7060] flex items-center gap-1"><LayoutDashboard size={16} /> Dashboard</Link></li>
          )}
          <li><a href="#how-it-works" className="text-[#7A7A72] text-[14px] font-medium transition-colors hover:text-[#4A7060]">How it works</a></li>
          <li><a href="#programs" className="text-[#7A7A72] text-[14px] font-medium transition-colors hover:text-[#4A7060]">Programs</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/assessment" className="hidden sm:block bg-[#4A7060] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold hover:bg-[#7C9E8A] transition-all transform hover:-translate-y-px">
            Take Free Quiz
          </Link>
          
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 text-[#7A7A72] text-[14px] font-bold hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 text-[#4A7060] text-[14px] font-bold hover:text-[#7C9E8A] transition-colors">
              <User size={18} />
              Login
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#4A7060]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden bg-[#FDFAF5] border-t border-[#7C9E8A]/10 px-6 py-8 flex flex-col gap-6 animate-fade-down">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-[#7A7A72] text-[16px] font-medium">Home</Link>
          {isLoggedIn && (
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-[#7A7A72] text-[16px] font-medium">Dashboard</Link>
          )}
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-[#7A7A72] text-[16px] font-medium">How it works</a>
          <Link to="/assessment" onClick={() => setIsOpen(false)} className="bg-[#4A7060] text-white px-6 py-3 rounded-full text-[15px] font-semibold text-center">
            Take Free Quiz
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-500 text-[16px] font-bold text-left">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-[#4A7060] text-[16px] font-bold">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
