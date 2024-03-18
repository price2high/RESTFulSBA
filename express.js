// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Example middleware
app.use((req, res, next) => {
  console.log('Middleware executed.');
  next();
});

// Sample data for the self-made API
let items = ['Item 1', 'Item 2', 'Item 3'];

// Define routes for the RESTful API
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.status(201).send('Item added successfully.');
});

// Set up template engine
app.set('view engine', 'ejs');

// Define route to render HTML form
app.get('/add-item', (req, res) => {
  res.render('add-item');
});

// Define route to handle form submission
app.post('/add-item', (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.redirect('/'); // Redirect to home page
});

// Define route to render view with data from self-made API
app.get('/', (req, res) => {
  res.render('index', { items: items });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
