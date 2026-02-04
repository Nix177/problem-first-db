import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, FlatList, RefreshControl, View, ActivityIndicator, SafeAreaView, Animated, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { ProblemCard, Problem } from '@/components/ProblemCard';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const API_URL = 'http://localhost:3000/api';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const fetchProblems = async () => {
    try {
      const response = await fetch(`${API_URL}/problems`);
      const data = await response.json();
      setProblems(data.sort((a: any, b: any) => b.score - a.score));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProblems();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleVote = async (id: number) => {
    try {
      await fetch(`${API_URL}/vote/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: `user_${Date.now()}` })
      });
    } catch (e) {
      console.error("Vote failed", e);
    }
  };

  const totalVotes = problems.reduce((sum, p) => sum + p.score, 0);
  const foundingProblems = problems.filter(p => p.isFounding);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProblems();
  };

  if (loading) {
    return (
      <GradientBackground style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={FrustraTheme.colors.primary} size="large" />
        <ThemedText style={{ marginTop: 16, color: FrustraTheme.colors.textDim }}>Loading opportunities...</ThemedText>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={FrustraTheme.colors.primary} />}
      >
        {/* HERO SECTION */}
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <LinearGradient
            colors={['rgba(0, 240, 255, 0.1)', 'transparent']}
            style={styles.heroGlow}
          />
          <ThemedText style={styles.heroLabel}>THE PROBLEM DATABASE</ThemedText>
          <ThemedText style={styles.heroTitle}>Turn Frustrations{'\n'}Into Fortunes</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Every unicorn started with a complaint. We catalog the world's frustrations so you can build the next billion-dollar solution.
          </ThemedText>

          <TouchableOpacity
            style={styles.heroCTA}
            onPress={() => router.push('/(tabs)/submit')}
          >
            <LinearGradient
              colors={[FrustraTheme.colors.primary, '#00A0AA']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.ctaText}>+ Submit a Problem</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* STATS DASHBOARD */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{problems.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Active Problems</ThemedText>
          </View>
          <View style={[styles.statCard, styles.statCardHighlight]}>
            <ThemedText style={[styles.statNumber, { color: FrustraTheme.colors.primary }]}>{totalVotes.toLocaleString()}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Votes</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{foundingProblems.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Founding Problems</ThemedText>
          </View>
        </View>

        {/* FEATURED SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>🔥 Trending Problems</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>Highest validation this week</ThemedText>
          </View>

          {problems.slice(0, 3).map((problem, index) => (
            <View key={problem.id} style={styles.featuredCard}>
              <View style={styles.rankBadge}>
                <ThemedText style={styles.rankText}>#{index + 1}</ThemedText>
              </View>
              <ProblemCard problem={problem} onVote={handleVote} />
            </View>
          ))}
        </View>

        {/* FOUNDING PROBLEMS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>⭐ Founding Problems</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>High-value opportunities for startups</ThemedText>
          </View>

          {foundingProblems.slice(0, 5).map((problem) => (
            <ProblemCard key={problem.id} problem={problem} onVote={handleVote} />
          ))}
        </View>

        {/* ALL PROBLEMS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>📋 All Problems</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>Browse the complete database</ThemedText>
          </View>

          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} onVote={handleVote} />
          ))}
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Frustra © 2026 — The Problem-First Database</ThemedText>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: 0,
    left: -50,
    right: -50,
    height: 300,
    borderRadius: 200,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    color: FrustraTheme.colors.primary,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFF',
    lineHeight: 44,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: FrustraTheme.colors.textDim,
    lineHeight: 24,
    marginBottom: 24,
  },
  heroCTA: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    shadowColor: FrustraTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaGradient: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  ctaText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statCardHighlight: {
    borderColor: FrustraTheme.colors.primary,
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 11,
    color: FrustraTheme.colors.textDim,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: FrustraTheme.colors.textDim,
    marginTop: 4,
  },
  featuredCard: {
    position: 'relative',
  },
  rankBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: FrustraTheme.colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: FrustraTheme.colors.textDim,
    fontSize: 12,
  },
});
