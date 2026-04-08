import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { LogOut, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({ title: '', amount: '', category: 'Food', type: 'expense' });
    const BUDGET_LIMIT = 2000; // Smart Feature: Budget Tracking

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const { data } = await axios.get('http://localhost:5000/api/expenses', config);
        setExpenses(data);
    };

    const addExpense = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/expenses', formData, config);
            toast.success('Added successfully!');
            fetchExpenses();
            setFormData({ title: '', amount: '', category: 'Food', type: 'expense' });
        } catch (err) { toast.error('Error adding record'); }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/expenses/${id}`, config);
            toast.success('Deleted');
            fetchExpenses();
        } catch (err) { toast.error('Error deleting'); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    // Calculations
    const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncome = expenses.filter(e => e.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);

    // Chart Data
    const data = expenses.filter(e => e.type === 'expense').reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) existing.value += curr.amount;
        else acc.push({ name: curr.category, value: curr.amount });
        return acc;
    }, []);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Smart Expense Tracker</h1>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
                    <LogOut size={20}/> Logout
                </button>
            </div>

            {/* Smart Feature: Budget Alert */}
            {totalExpenses > BUDGET_LIMIT && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 shadow-sm border border-red-200">
                    ⚠️ Warning: You have exceeded your monthly budget of ${BUDGET_LIMIT}!
                </div>
            )}

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <h3 className="text-gray-500 mb-1">Total Balance</h3>
                    <p className="text-3xl font-bold text-gray-800">${totalIncome - totalExpenses}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition">
                    <h3 className="text-gray-500 mb-1">Total Income</h3>
                    <p className="text-3xl font-bold text-green-500">+${totalIncome}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition">
                    <h3 className="text-gray-500 mb-1">Total Expenses</h3>
                    <p className="text-3xl font-bold text-red-500">-${totalExpenses}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Form & Chart */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <form onSubmit={addExpense} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>
                        <input type="text" placeholder="Title (e.g. Groceries)" className="w-full border p-2 mb-3 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required/>
                        <input type="number" placeholder="Amount" className="w-full border p-2 mb-3 rounded" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required/>
                        <select className="w-full border p-2 mb-3 rounded" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <select className="w-full border p-2 mb-4 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                            <option>Food</option>
                            <option>Transport</option>
                            <option>Entertainment</option>
                            <option>Bills</option>
                            <option>Salary</option>
                        </select>
                        <button className="w-full bg-blue-600 text-white p-2 rounded flex justify-center items-center gap-2 hover:bg-blue-700 transition">
                            <Plus size={18}/> Add Record
                        </button>
                    </form>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64">
                        <h3 className="text-lg font-semibold mb-2">Expenses by Category</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                        {expenses.map(expense => (
                            <div key={expense._id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition">
                                <div>
                                    <h4 className="font-semibold text-gray-800">{expense.title}</h4>
                                    <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()} • {expense.category}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`font-bold ${expense.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                        {expense.type === 'income' ? '+' : '-'}${expense.amount}
                                    </span>
                                    <button onClick={() => deleteExpense(expense._id)} className="text-gray-400 hover:text-red-500 transition">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {expenses.length === 0 && <p className="text-center text-gray-500 py-8">No transactions yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}