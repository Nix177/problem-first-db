const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock Database - Seeding "Frustra" Content
let problems = [
    {
        id: 1,
        title: "Contractors never show up on time and ghost me",
        score: 1240,
        tags: ["services", "home", "trust"],
        isFounding: true,
        description: "Renovating my house has been a nightmare. I've gone through 3 contractors who take a deposit and then disappear or show up 4 hours late. We need a platform that holds specific payments in escrow until geolocation confirms arrival.",
        comments: [
            { user: "Sarah_Builder", text: "As a contractor, I agree. Verify us too!" },
            { user: "HomeOwner99", text: "I lost $5k last year to this. Would pay for a solution." }
        ]
    },
    {
        id: 2,
        title: "Impossible to cancel gym memberships online",
        score: 890,
        tags: ["consumer-rights", "finance"],
        isFounding: false,
        description: "Why do I have to send a certified letter to cancel a service I signed up for in 3 clicks? It's predatory.",
        comments: []
    },
    {
        id: 3,
        title: "Split bills with roommates who utilize different banks",
        score: 450,
        tags: ["fintech", "social"],
        isFounding: true,
        description: "Venmo, CashApp, Zelle... we all have different primaries. Settling utilities is a spreadsheet nightmare monthly.",
        comments: []
    },
    {
        id: 4,
        title: "Recruiters spamming me with irrelevant roles",
        score: 2100,
        tags: ["hiring", "dev-experience"],
        isFounding: true,
        description: "I am a React Native dev. Stop offering me .NET legacy maintenance roles. LinkedIn filters are broken.",
        comments: [
            { user: "DevDave", text: "This. 100x this." }
        ]
    },
    {
        id: 5,
        title: "Video calls still cut out in 2026",
        score: 300,
        tags: ["tech", "infrastructure"],
        isFounding: false,
        description: "With all our bandwidth, why is 'Can you hear me now?' still a daily phrase?",
        comments: []
    },
    {
        id: 6,
        title: "Finding ethically sourced clothes that aren't beige",
        score: 670,
        tags: ["fashion", "sustainability"],
        isFounding: false,
        description: "Sustainable fashion seems to think we all want to look like sacks of potatoes. Where is the style?",
        comments: []
    },
    {
        id: 7,
        title: "Tracking freelance invoices across email threads",
        score: 1540,
        tags: ["freelance", "productivity"],
        isFounding: true,
        description: "I spend 4 hours a week just chasing payments. My email is a mess of 'Did you see this?'.",
        comments: []
    },
    {
        id: 8,
        title: "Gifting for people who 'have everything'",
        score: 230,
        tags: ["lifestyle", "social"],
        isFounding: false,
        description: "I need a tool that scrapes their public likes/wishlists and suggests genuinely surprising experiences, not stuff.",
        comments: []
    },
    {
        id: 9,
        title: "Public transport schedules are fiction",
        score: 3100,
        tags: ["urban", "transit"],
        isFounding: true,
        description: "The bus is always '1 min away' for 15 minutes. We need crowdsourced real-time tracking.",
        comments: []
    },
    {
        id: 10,
        title: "Grocery expiration dates are unreadable codes",
        score: 120,
        tags: ["food", "consumer"],
        isFounding: false,
        description: "Is it Day/Month or Month/Day? Why is the code rubbed off? I throw away good food because I'm scared.",
        comments: []
    },
    {
        id: 11,
        title: "Note-taking apps are where ideas go to die",
        score: 1800,
        tags: ["productivity", "knowledge"],
        isFounding: true,
        description: "I have 500 notes. I never look at them. I need an app that resurfaces relevant thoughts when I'm working on related context.",
        comments: []
    }
];

// Routes
app.get('/api/problems', (req, res) => {
    // Return summary list (lightweight)
    const summary = problems.map(({ comments, description, ...rest }) => rest);
    res.json(summary);
});

app.get('/api/problems/:id', (req, res) => {
    const problem = problems.find(p => p.id === parseInt(req.params.id));
    if (problem) res.json(problem);
    else res.status(404).json({ message: "Not found" });
});

app.post('/api/problems', (req, res) => {
    const newProblem = {
        id: problems.length + 1,
        title: req.body.title,
        description: req.body.description || "",
        score: 0,
        tags: req.body.tags || [],
        comments: []
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
