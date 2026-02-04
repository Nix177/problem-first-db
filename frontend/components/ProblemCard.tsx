import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

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
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const handleVote = (e: any) => {
        e.stopPropagation();
        if (hasVoted) return;

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Pulse animation
        Animated.sequence([
            Animated.timing(pulseAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
            Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();

        setHasVoted(true);
        setVoteCount(c => c + 1);
        onVote(problem.id);
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };

    const openDetails = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push({ pathname: "/modal", params: { id: problem.id } });
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    return (
        <Pressable
            onPress={openDetails}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <LinearGradient
                    colors={problem.isFounding
                        ? ['rgba(0, 240, 255, 0.08)', 'rgba(0, 240, 255, 0.02)']
                        : ['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.02)']}
                    style={[styles.card, problem.isFounding && styles.foundingBorder]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={2}>{problem.title}</Text>
                    </View>

                    {/* Badges */}
                    <View style={styles.badgeRow}>
                        {problem.isFounding && (
                            <LinearGradient
                                colors={[FrustraTheme.colors.primary, '#00A0AA']}
                                style={styles.foundingBadge}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.foundingText}>★ FOUNDING</Text>
                            </LinearGradient>
                        )}
                        {voteCount > 1000 && (
                            <View style={styles.premiumBadge}>
                                <Text style={styles.premiumText}>🔥 HOT</Text>
                            </View>
                        )}
                    </View>

                    {/* Tags */}
                    <View style={styles.tagsRow}>
                        {problem.tags?.slice(0, 3).map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>#{tag}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Animated.View style={[styles.scoreContainer, { transform: [{ scale: pulseAnim }] }]}>
                            <Text style={[styles.score, hasVoted && styles.scoreActive]}>
                                {formatNumber(voteCount)}
                            </Text>
                            <Text style={styles.scoreLabel}>frustrations</Text>
                        </Animated.View>

                        <TouchableOpacity
                            onPress={handleVote}
                            style={[styles.voteButton, hasVoted && styles.voteButtonActive]}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={hasVoted
                                    ? [FrustraTheme.colors.secondary, '#CC0044']
                                    : ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                                style={styles.voteGradient}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            >
                                <Text style={[styles.voteText, hasVoted && styles.voteTextActive]}>
                                    {hasVoted ? "✓ Voted" : "Me Too"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Tap hint */}
                    <View style={styles.tapHint}>
                        <Text style={styles.tapHintText}>Tap for details →</Text>
                    </View>
                </LinearGradient>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    foundingBorder: {
        borderColor: 'rgba(0, 240, 255, 0.3)',
        borderWidth: 1.5,
    },
    header: {
        marginBottom: 12,
    },
    title: {
        color: FrustraTheme.colors.text,
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 24,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    foundingBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    foundingText: {
        color: '#000',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    premiumBadge: {
        backgroundColor: 'rgba(255, 100, 50, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 100, 50, 0.3)',
    },
    premiumText: {
        color: '#FF6432',
        fontSize: 11,
        fontWeight: '700',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    tag: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    tagText: {
        color: FrustraTheme.colors.textDim,
        fontSize: 12,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },
    score: {
        color: FrustraTheme.colors.text,
        fontSize: 28,
        fontWeight: '900',
    },
    scoreActive: {
        color: FrustraTheme.colors.secondary,
    },
    scoreLabel: {
        color: FrustraTheme.colors.textDim,
        fontSize: 13,
    },
    voteButton: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    voteButtonActive: {
        shadowColor: FrustraTheme.colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    voteGradient: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    voteText: {
        color: FrustraTheme.colors.text,
        fontWeight: '700',
        fontSize: 14,
    },
    voteTextActive: {
        color: '#FFF',
    },
    tapHint: {
        marginTop: 12,
        alignItems: 'flex-end',
    },
    tapHintText: {
        color: FrustraTheme.colors.textDim,
        fontSize: 11,
        opacity: 0.6,
    },
});
