import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, X, User, Shield, BookOpen, MessageSquare, Calendar } from 'lucide-react';

// API Base URL (Change for production)
const API_URL = 'http://127.0.0.1:8000/api/';

// --- Components ---

const Navbar = ({ token, setToken }) => {
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <nav className="bg-navy-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-jungle-500">M ANANDA & Co</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-jungle-500 px-3 py-2 rounded-md">Home</Link>
              <Link to="/attorney" className="hover:text-jungle-500 px-3 py-2 rounded-md">Attorney</Link>
              <Link to="/services" className="hover:text-jungle-500 px-3 py-2 rounded-md">Services</Link>
              <Link to="/blog" className="hover:text-jungle-500 px-3 py-2 rounded-md">Resources</Link>
              {token ? (
                <>
                  <Link to="/portal" className="bg-jungle-500 hover:bg-jungle-600 px-4 py-2 rounded-md">Client Portal</Link>
                  <button onClick={logout} className="text-red-400 hover:text-red-300">Logout</button>
                </>
              ) : (
                <Link to="/login" className="bg-jungle-500 hover:bg-jungle-600 px-4 py-2 rounded-md">Login</Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-jungle-500 p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-navy-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block hover:text-jungle-500 px-3 py-2">Home</Link>
            <Link to="/attorney" className="block hover:text-jungle-500 px-3 py-2">Attorney</Link>
            <Link to="/services" className="block hover:text-jungle-500 px-3 py-2">Services</Link>
            {token ? (
               <Link to="/portal" className="block hover:text-jungle-500 px-3 py-2">Portal</Link>
            ) : (
               <Link to="/login" className="block hover:text-jungle-500 px-3 py-2">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Home = () => {
  return (
    <div className="bg-gray-50">
      <header className="bg-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Justice Served with Integrity</h1>
          <p className="text-xl mb-8 text-gray-300">M ANANDA & Co ADVOCATES - Mombasa, Kenya</p>
          <Link to="/contact" className="bg-jungle-500 hover:bg-jungle-600 text-white font-bold py-3 px-8 rounded-full">
            Free Consultation
          </Link>
        </div>
      </header>
      
      <section className="py-16 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-jungle-500">
          <Shield className="w-12 h-12 text-navy-800 mb-4" />
          <h3 className="text-xl font-bold mb-2">Expert Defense</h3>
          <p>15+ Years of experience handling complex legal matters in Kenya.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-jungle-500">
          <BookOpen className="w-12 h-12 text-navy-800 mb-4" />
          <h3 className="text-xl font-bold mb-2">Legal Resources</h3>
          <p>Access our glossary and blog for up-to-date legal information.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-jungle-500">
          <MessageSquare className="w-12 h-12 text-navy-800 mb-4" />
          <h3 className="text-xl font-bold mb-2">Client Portal</h3>
          <p>Secure access to your case files and direct communication.</p>
        </div>
      </section>
    </div>
  );
};

const AttorneyProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}profile/`).then(res => {
      if(res.data.length > 0) setProfile(res.data[0]);
    });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
            {profile.photo ? (
                <img src={profile.photo} alt="Attorney" className="w-64 h-64 object-cover rounded-full border-4 border-jungle-500" />
            ) : (
                <div className="w-64 h-64 bg-navy-800 rounded-full flex items-center justify-center text-white text-4xl">MA</div>
            )}
        </div>
        <div className="md:w-2/3 p-8">
          <h2 className="text-3xl font-bold text-navy-800 mb-2">{profile.user_details.first_name} {profile.user_details.last_name}</h2>
          <p className="text-jungle-600 font-semibold mb-4">Senior Advocate</p>
          <p className="text-gray-600 mb-6">{profile.bio}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div><strong>Degree:</strong> {profile.university}</div>
            <div><strong>Experience:</strong> {profile.experience_years}+ Years</div>
            <div><strong>Cases Won:</strong> {profile.cases_won}+</div>
            <div><strong>Location:</strong> {profile.location}</div>
          </div>
          
          <div className="bg-navy-800 text-white p-4 rounded">
            <h4 className="font-bold mb-2">Office Address</h4>
            <p>{profile.address}</p>
            <p className="mt-2">📞 {profile.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}services/`).then(res => setServices(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-navy-800 mb-12">Practice Areas</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map(service => (
          <div key={service.id} className="bg-white p-8 shadow-lg rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-jungle-600 mb-4">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-bold text-sm uppercase text-gray-500">Process</h4>
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                    {service.process_steps.split('|').map((step, i) => <li key={i}>{step}</li>)}
                </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ClientPortal = () => {
  const [cases, setCases] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token) {
        axios.get(`${API_URL}cases/`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setCases(res.data));
    }
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-navy-800 mb-8">My Cases</h2>
      {cases.length === 0 ? (
        <p>No active cases found.</p>
      ) : (
        <div className="grid gap-6">
            {cases.map(c => (
                <div key={c.id} className="bg-white p-6 rounded shadow border-l-4 border-jungle-500">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{c.title}</h3>
                        <span className={`px-3 py-1 rounded text-sm ${c.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-200'}`}>{c.status}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{c.description}</p>
                    {c.updates && (
                        <div className="bg-blue-50 p-3 rounded text-blue-800 text-sm">
                            <strong>Latest Update:</strong> {c.updates}
                        </div>
                    )}
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}token/`, { username, password });
            localStorage.setItem('token', res.data.access);
            setToken(res.data.access);
            window.location.href = '/portal';
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-navy-800">Client Login</h2>
                <input className="w-full mb-4 p-2 border rounded" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input className="w-full mb-6 p-2 border rounded" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button className="w-full bg-jungle-500 text-white p-2 rounded hover:bg-jungle-600">Login</button>
            </form>
        </div>
    );
};

// --- Main App ---

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attorney" element={<AttorneyProfile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portal" element={token ? <ClientPortal /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          {/* Add Blog, Contact, etc. similarly */}
        </Routes>
        <footer className="bg-navy-900 text-white text-center py-8 mt-12">
            <p>&copy; 2023 M ANANDA & Co ADVOCATES. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;