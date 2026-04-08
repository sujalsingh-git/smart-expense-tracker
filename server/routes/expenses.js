const router = require('express').Router();
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');
const verify = require('../middleware/authMiddleware');

// 'verify' protects these routes
router.get('/', verify, getExpenses);
router.post('/', verify, addExpense);
router.delete('/:id', verify, deleteExpense);

module.exports = router;