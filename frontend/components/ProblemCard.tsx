import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { BlurView } from 'expo-blur'; // Use if installed, or plain view
import { LinearGradient } from 'expo-linear-gradient';

export interface Problem {
    id: number;
    title: string;
    score: number;
    tags?: string[];
    isFounding?: boolean;
}

interface Props {
    problem: Problem;
    onVote: (id: number) => void;
}

export function ProblemCard({ problem, onVote }: Props) {
    const [hasVoted, setHasVoted] = useState(false);
    const [voteCount, setVoteCount] = useState(problem.score);

    const handleVote = () => {
        if (hasVoted) return;

        // Optimistic Update
        setHasVoted(true);
        setVoteCount(c => c + 1);
        onVote(problem.id);
    };

    return (
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
            style={[styles.card, problem.isFounding && styles.foundingBorder]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{problem.title}</Text>
                {problem.isFounding && (
                    <View style={styles.foundingBadge}>
                        <Text style={styles.foundingText}>FOUNDING</Text>
                    </View>
                )}
            </View>

            <View style={styles.tagsRow}>
                {problem.tags?.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>#{tag}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <View style={styles.scoreContainer}>
                    <Text style={[styles.score, hasVoted && styles.scoreActive]}>
                        {voteCount}
                    </Text>
                    <Text style={styles.scoreLabel}>frustrations</Text>
                </View>

                <TouchableOpacity
                    onPress={handleVote}
                    style={[styles.voteButton, hasVoted && styles.voteButtonActive]}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.voteText, hasVoted && styles.voteTextActive]}>
                        {hasVoted ? "Voted" : "Me Too"}
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: FrustraTheme.borderRadius.m,
        padding: FrustraTheme.spacing.m,
        marginBottom: FrustraTheme.spacing.m,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    foundingBorder: {
        borderColor: FrustraTheme.colors.primary,
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: FrustraTheme.spacing.s,
    },
    title: {
        color: FrustraTheme.colors.text,
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        lineHeight: 24,
    },
    foundingBadge: {
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: FrustraTheme.colors.primary,
    },
    foundingText: {
        color: FrustraTheme.colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: FrustraTheme.spacing.m,
    },
    tag: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagText: {
        color: FrustraTheme.colors.textDim,
        fontSize: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    score: {
        color: FrustraTheme.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    scoreActive: {
        color: FrustraTheme.colors.secondary,
    },
    scoreLabel: {
        color: FrustraTheme.colors.textDim,
        fontSize: 12,
    },
    voteButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    voteButtonActive: {
        backgroundColor: FrustraTheme.colors.secondary,
    },
    voteText: {
        color: FrustraTheme.colors.text,
        fontWeight: '600',
    },
    voteTextActive: {
        color: '#FFF',
    },
});
