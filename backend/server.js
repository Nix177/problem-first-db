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

const validationEngine = require('./ValidationEngine');

app.post('/api/vote/:id', (req, res) => {
    const problemId = parseInt(req.params.id);
    const userId = req.body.userId;

    // 1. Check existence
    const problem = problems.find(p => p.id === problemId);
    if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
    }

    // 2. Validate Vote
    const validation = validationEngine.vote(problemId, userId);
    if (!validation.success) {
        return res.status(400).json({ message: validation.reason });
    }

    // 3. Apply Vote
    problem.score += 1;
    res.json({
        problem,
        message: "Vote recorded",
        total_votes: validation.new_count
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
