import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://recovery-ai-tper.onrender.com';
      const response = await axios.post(`${apiUrl}/api/auth/signin`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ 
        email: response.data.email, 
        id: response.data.id,
        name: response.data.name,
        profession: response.data.profession 
      }));
      navigate('/assessment');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-[var(--color-warm-white)] text-[var(--color-charcoal)] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-[140px] px-6 md:px-12 pb-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[32px] shadow-2xl w-full max-w-md border border-[var(--color-cream)]"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[var(--color-sage-light)]/20 rounded-2xl flex items-center justify-center text-[var(--color-sage)] mx-auto mb-6">
              <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-2">Welcome Back</h2>
            <p className="text-[var(--color-muted)]">Continue your journey to digital wellness</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={20} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--color-warm-white)] border-2 border-[var(--color-cream)] p-4 pl-12 rounded-2xl outline-none focus:border-[var(--color-sage)] transition-all" 
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--color-warm-white)] border-2 border-[var(--color-cream)] p-4 pl-12 rounded-2xl outline-none focus:border-[var(--color-sage)] transition-all" 
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

            <button 
              disabled={loading}
              className="bg-[var(--color-charcoal)] text-white p-4 rounded-2xl font-bold hover:bg-[var(--color-sage-dark)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Login <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[var(--color-muted)]">
            Don't have an account? <Link to="/signup" className="text-[var(--color-accent)] font-bold hover:underline">Sign up for free</Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
