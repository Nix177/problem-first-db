import requests
from textblob import TextBlob
import json
import random

# Mock Data Source (since we don't have API keys configured yet)
# In production, this would use PRAW for Reddit or Twitter API
def fetch_complaints():
    print("Fetching complaints from social media...")
    
    # Simulating data scraped from Reddit threads like r/startups, r/entrepreneur
    raw_posts = [
        "I hate how difficult it is to find a good plumber on weekends.",
        "Why is there no simple tool to track freelance expenses?",
        "Is there an app that cancels subscriptions automatically? I keep forgetting.",
        "I need a dashboard that aggregates all my social media metrics in one place.",
        "Cooking for one person is so wasteful with ingredient portions."
    ]
    
    analyzed_problems = []
    
    for post in raw_posts:
        blob = TextBlob(post)
        sentiment = blob.sentiment.polarity
        
        # We look for negative sentiment (complaints) but not too toxic
        if -0.8 < sentiment < 0.2:
            analyzed_problems.append({
                "problem": post,
                "opportunity_score": round((1 - sentiment) * 50 + random.randint(10, 40)), # Algorithm placeholder
                "source": "social_listening"
            })
            
    return analyzed_problems

if __name__ == "__main__":
    problems = fetch_complaints()
    print(json.dumps(problems, indent=2))
    
    # Future integration: Send to Backend API
    # requests.post('http://localhost:3000/api/problems', json=problems[0])
