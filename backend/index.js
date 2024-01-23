// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let snippets = [
    { id: 1, title: 'Sample Snippet 1', code: 'console.log("Hello, World!");' },
    { id: 2, title: 'Sample Snippet 2', code: 'function add(a, b) { return a + b; }' },
];

app.get('/api/snippets', (req, res) => {
    res.json(snippets);
});

app.post('/api/snippets', (req, res) => {
    const { title, code } = req.body;
    const newSnippet = { id: snippets.length + 1, title, code };
    snippets.push(newSnippet);
    res.json(newSnippet);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
