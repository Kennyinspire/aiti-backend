// Sample request to create a new expense resource
// POST /expenses
// {
//     "description": "Groceries",
//     "amount": 100,
//     "date": "2021-07-01",
//     "category": "Food"
// }

// Sample response for the request to create a new expense resource
// {
//     "id": "f9b5f6d6-3d3d-4b1e-9e3e-4d5f1e3d3d3d",
//     "description": "Groceries",
//     "amount": 100,
//     "date": "2021-07-01T00:00:00.000Z",
//     "category": "Food",
//     "__v": 0
// }
const express = require('express'); 
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to the MongoDB database
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
      });
  }

// Define a schema for the expense resource
const expenseSchema = new mongoose.Schema({
    id: String,
    description: String,
    amount: Number,
    date: Date,
    category: { type: String, required: false } // Making category field optional
});

// Create a model for the expense resource
const Expense = mongoose.model('Expense', expenseSchema);

// CRUD operations
// Create a new expense resource for tracking expenses (POST)
app.post('/expenses', async (req, res) => {
    try {
        const { description, amount, date, category } = req.body;
        const newExpense = new Expense({
            id: uuidv4(),
            description,
            amount,
            date,
            category
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Retrieve all expenses from the tracking expenses DB (GET)
app.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Retrieve a single expense from the tracking expenses DB by id
app.get('/expenses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOne({ id });
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
        } else {
            res.status(200).json(expense);
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Update an expense resource by id in the tracking expenses DB (PUT)
app.put('/expenses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount, date, category } = req.body;
        const expense = await Expense.findOne({ id });
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
        } else {
            expense.description = description;
            expense.amount = amount;
            expense.date = date;
            expense.category = category;
            await expense.save();
            res.status(200).json(expense);
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Delete an expense resource by id from the tracking expenses DB (DELETE)
app.delete('/expenses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOne({ id });
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
        } else {
            await expense.remove();
            res.status(200).json({ message: 'Expense deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// connect to server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  }

module.exports = app;
