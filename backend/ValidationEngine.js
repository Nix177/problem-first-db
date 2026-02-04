// Validation Engine - Standalone Logic

// Validation Engine
// Responsibilities: "Me Too" voting, Identity Verification (Anti-Bot)

class ValidationEngine {
    constructor() {
        this.votes = new Map(); // ProblemID -> Set(UserIDs)
    }

    vote(problemId, userId) {
        if (!this.verifyIdentity(userId)) {
            return { success: false, reason: "Identity Verification Failed" };
        }

        if (!this.votes.has(problemId)) {
            this.votes.set(problemId, new Set());
        }

        const problemVotes = this.votes.get(problemId);

        if (problemVotes.has(userId)) {
            return { success: false, reason: "Already voted" };
        }

        problemVotes.add(userId);
        return { success: true, new_count: problemVotes.size };
    }

    verifyIdentity(userId) {
        // Mock Identity Check (e.g., via OAuth or Captcha score)
        // In "Frustra", we ensure real humans (investors/users)
        console.log(`Verifying identity for user ${userId}...`);
        return userId && userId.length > 0;
    }
}

module.exports = new ValidationEngine();
