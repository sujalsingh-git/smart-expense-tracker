const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        // Find expenses only for the logged-in user
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, date, type } = req.body;
        const newExpense = new Expense({ user: req.user.id, title, amount, category, date, type });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};