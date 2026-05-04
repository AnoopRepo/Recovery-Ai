import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Briefcase, Calendar, ShieldCheck, Loader2, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  profession: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // SET YOUR ADMIN EMAIL HERE
  const ADMIN_EMAIL = "anoopyadav5984@gmail.com"; 

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    fetchUsers();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="font-sans bg-[var(--color-warm-white)] text-[var(--color-charcoal)] min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Navbar />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[32px] shadow-2xl max-w-md border border-red-100"
        >
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 text-red-600">Access Denied</h2>
          <p className="text-[var(--color-muted)] mb-8">This area is reserved for authorized administrators only.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-[var(--color-charcoal)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-sage-dark)] transition-all shadow-lg"
          >
            Login as Admin
          </button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  const fetchUsers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://recovery-ai-tper.onrender.com';
      const response = await axios.get(`${apiUrl}/api/auth/users`);
      setUsers(response.data);
    } catch (err: any) {
      setError('Failed to fetch users. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profession?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sans bg-[var(--color-warm-white)] text-[var(--color-charcoal)] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[140px] px-6 md:px-12 pb-20 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--color-sage-light)]/20 rounded-2xl flex items-center justify-center text-[var(--color-sage)]">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-[var(--color-muted)]">Manage users and monitor platform growth.</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, email or profession..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-[var(--color-cream)] p-4 pl-12 rounded-2xl outline-none focus:border-[var(--color-sage)] transition-all shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[var(--color-sage)]" size={48} />
            <p className="text-[var(--color-muted)] font-medium">Loading user database...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl text-center">
            <p className="text-red-500 font-bold mb-2">Error</p>
            <p className="text-red-400">{error}</p>
            <button onClick={fetchUsers} className="mt-4 text-[var(--color-sage-dark)] font-bold underline">Try Again</button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-[var(--color-cream)]"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-warm-white)] border-b border-[var(--color-cream)]">
                    <th className="p-6 font-serif font-bold text-[var(--color-charcoal)]">User</th>
                    <th className="p-6 font-serif font-bold text-[var(--color-charcoal)]">Contact</th>
                    <th className="p-6 font-serif font-bold text-[var(--color-charcoal)]">Profession</th>
                    <th className="p-6 font-serif font-bold text-[var(--color-charcoal)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[var(--color-cream)] hover:bg-[var(--color-warm-white)]/50 transition-all"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[var(--color-sage)] rounded-full flex items-center justify-center text-white font-bold">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <span className="font-bold text-[var(--color-charcoal)]">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-[var(--color-muted)]">
                          <Mail size={16} />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-[var(--color-sage-dark)] font-medium">
                          <Briefcase size={16} />
                          <span>{user.profession || 'Not Specified'}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider border border-green-100">
                          Active
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                <Users size={48} className="text-[var(--color-cream)]" />
                <p className="text-[var(--color-muted)] font-medium">No users found matching your search.</p>
              </div>
            )}
            
            <div className="p-6 bg-[var(--color-warm-white)] border-t border-[var(--color-cream)] flex items-center justify-between">
              <p className="text-sm text-[var(--color-muted)]">Showing {filteredUsers.length} total users</p>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
