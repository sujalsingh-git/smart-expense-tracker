import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData);
            
            if (isLogin) {
                localStorage.setItem('token', data.token);
                toast.success('Welcome back!');
                window.location.reload(); // Refresh to load dashboard
            } else {
                toast.success('Registered successfully! Please login.');
                setIsLogin(true);
            }
        } catch (err) {
            toast.error(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLogin && (
                        <input type="text" placeholder="Name" className="border p-2 rounded" 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} required/>
                    )}
                    <input type="email" placeholder="Email" className="border p-2 rounded" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
                    <input type="password" placeholder="Password" className="border p-2 rounded" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm cursor-pointer text-blue-600" 
                   onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
}