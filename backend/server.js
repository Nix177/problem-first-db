const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock Database
let problems = [
    { id: 1, title: "Can't find reliable contractors", score: 85, tags: ["services", "home"] },
    { id: 2, title: "Too many subscription emails", score: 92, tags: ["productivity", "email"] }
];

// Routes
app.get('/api/problems', (req, res) => {
    res.json(problems);
});

app.post('/api/problems', (req, res) => {
    const newProblem = {
        id: problems.length + 1,
        title: req.body.title,
        score: 0,
        tags: req.body.tags || []
    };
    problems.push(newProblem);
    res.status(201).json(newProblem);
});

app.post('/api/vote/:id', (req, res) => {
    const problem = problems.find(p => p.id === parseInt(req.params.id));
    if (problem) {
        problem.score += 1;
        res.json(problem);
    } else {
        res.status(404).json({ message: "Problem not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
