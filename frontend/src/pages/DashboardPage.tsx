import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, FileText, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const DashboardPage = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your history.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/assessment/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(response.data);
      } catch (err: any) {
        setError('Failed to fetch history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="font-sans bg-[var(--color-warm-white)] text-[var(--color-charcoal)] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[140px] px-6 md:px-12 pb-20 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage-dark)] text-xs font-bold uppercase tracking-wider mb-4">
              <History size={14} />
              User History
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Your Recovery Journey</h1>
          </div>
          <button 
            onClick={() => window.location.href = '/assessment'}
            className="flex items-center gap-2 bg-[var(--color-charcoal)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--color-sage-dark)] transition-all shadow-lg"
          >
            Take New Assessment
            <ArrowRight size={18} />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[var(--color-sage)] mb-4" size={40} />
            <p className="text-[var(--color-muted)] font-medium">Loading your history...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            {!localStorage.getItem('token') && (
              <button 
                onClick={() => window.location.href = '/login'}
                className="bg-[var(--color-charcoal)] text-white px-6 py-2 rounded-full font-bold"
              >
                Login Now
              </button>
            )}
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[var(--color-cream)] shadow-sm">
            <div className="w-20 h-20 bg-[var(--color-warm-white)] rounded-full flex items-center justify-center text-[var(--color-muted)] mx-auto mb-6">
              <FileText size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">No assessments yet</h3>
            <p className="text-[var(--color-muted)] mb-8">Take your first assessment to start your recovery plan.</p>
            <button 
              onClick={() => window.location.href = '/assessment'}
              className="bg-[var(--color-sage)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--color-sage-dark)] transition-all"
            >
              Start Assessment
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={item.id}
                className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-[var(--color-cream)] hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/4">
                    <div className="flex items-center gap-2 text-[var(--color-muted)] mb-2">
                      <Calendar size={16} />
                      <span className="text-sm font-bold uppercase tracking-wider">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-warm-white)] text-[var(--color-charcoal)] text-xs font-bold border border-[var(--color-cream)]">
                      <Sparkles size={12} className="text-[var(--color-gold)]" />
                      AI Analyzed
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      Assessment Result
                    </h4>
                    <div className="text-[var(--color-muted)] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                      {item.response}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
