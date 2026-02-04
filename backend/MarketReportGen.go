package main

import (
	"fmt"
	"time"
)

// MarketReportGen
// Generates data dossiers for investors when 1000 votes are reached.

type Report struct {
	ProblemID   int
	Title       string
	VoteCount   int
	GeneratedAt time.Time
	Status      string
}

func GenerateReport(problemId int, votes int) {
	fmt.Printf("Checking threshold for Problem %d... Current Votes: %d\n", problemId, votes)

	if votes >= 1000 {
		report := Report{
			ProblemID:   problemId,
			Title:       "High Value Market Opportunity #2026",
			VoteCount:   votes,
			GeneratedAt: time.Now(),
			Status:      "PREMIUM_ACCESS_ONLY",
		}
		fmt.Printf(">> REPORT GENERATED: %+v\n", report)
		fmt.Println(">> Notification sent to VC Network.")
	} else {
		fmt.Println("Threshold not met. No report generated.")
	}
}

func main() {
	fmt.Println("Starting MarketReportGen Service...")
	// Mock listener
	GenerateReport(1, 850)
	GenerateReport(2, 1050)
}
