import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, TouchableOpacity } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { ThemedText } from '@/components/themed-text';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://localhost:3000/api';
const { width } = Dimensions.get('window');

interface CategoryData {
  name: string;
  count: number;
  color: string;
}

export default function TrendingScreen() {
  const [problems, setProblems] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/problems`);
      const data = await res.json();
      setProblems(data);

      // Calculate category breakdown
      const tagCounts: { [key: string]: number } = {};
      data.forEach((p: any) => {
        p.tags?.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      const colors = ['#00F0FF', '#FF0066', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'];
      const categoryArray = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count], i) => ({ name, count, color: colors[i % colors.length] }));

      setCategories(categoryArray);
    } catch (e) {
      console.error(e);
    }
  };

  const totalVotes = problems.reduce((sum, p) => sum + p.score, 0);
  const avgScore = problems.length > 0 ? Math.round(totalVotes / problems.length) : 0;
  const topProblem = problems.length > 0 ? problems.reduce((a, b) => a.score > b.score ? a : b) : null;

  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerLabel}>ANALYTICS</ThemedText>
          <ThemedText style={styles.headerTitle}>Market Intelligence</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Real-time insights from frustration data</ThemedText>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsRow}>
          <LinearGradient colors={['rgba(0, 240, 255, 0.15)', 'rgba(0, 240, 255, 0.05)']} style={styles.metricCard}>
            <ThemedText style={styles.metricValue}>${(totalVotes * 0.15).toFixed(0)}K</ThemedText>
            <ThemedText style={styles.metricLabel}>Est. Market Value</ThemedText>
          </LinearGradient>
          <LinearGradient colors={['rgba(255, 0, 102, 0.15)', 'rgba(255, 0, 102, 0.05)']} style={styles.metricCard}>
            <ThemedText style={[styles.metricValue, { color: FrustraTheme.colors.secondary }]}>{avgScore}</ThemedText>
            <ThemedText style={styles.metricLabel}>Avg. Validation</ThemedText>
          </LinearGradient>
        </View>

        {/* Category Breakdown */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>📊 Category Breakdown</ThemedText>
          <View style={styles.categoryGrid}>
            {categories.map((cat, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={[styles.categoryBar, { backgroundColor: cat.color, width: `${(cat.count / Math.max(...categories.map(c => c.count))) * 100}%` }]} />
                <View style={styles.categoryInfo}>
                  <ThemedText style={styles.categoryName}>{cat.name}</ThemedText>
                  <ThemedText style={[styles.categoryCount, { color: cat.color }]}>{cat.count} problems</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Opportunity */}
        {topProblem && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>🚀 Top Opportunity</ThemedText>
            <LinearGradient
              colors={['rgba(0, 240, 255, 0.1)', 'rgba(139, 92, 246, 0.1)']}
              style={styles.topCard}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.topTitle}>{topProblem.title}</ThemedText>
              <View style={styles.topStats}>
                <View style={styles.topStat}>
                  <ThemedText style={styles.topStatValue}>{topProblem.score.toLocaleString()}</ThemedText>
                  <ThemedText style={styles.topStatLabel}>Votes</ThemedText>
                </View>
                <View style={styles.topStat}>
                  <ThemedText style={[styles.topStatValue, { color: '#10B981' }]}>High</ThemedText>
                  <ThemedText style={styles.topStatLabel}>Demand</ThemedText>
                </View>
                <View style={styles.topStat}>
                  <ThemedText style={[styles.topStatValue, { color: FrustraTheme.colors.secondary }]}>$$$</ThemedText>
                  <ThemedText style={styles.topStatLabel}>Value</ThemedText>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Investment CTA */}
        <View style={styles.section}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.2)', 'rgba(236, 72, 153, 0.2)']}
            style={styles.investCard}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <ThemedText style={styles.investTitle}>For Investors</ThemedText>
            <ThemedText style={styles.investText}>
              Access premium market reports, startup matching, and early-stage deal flow based on validated frustration data.
            </ThemedText>
            <TouchableOpacity style={styles.investButton}>
              <ThemedText style={styles.investButtonText}>Request Access →</ThemedText>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Data refreshes every 24 hours</ThemedText>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    color: FrustraTheme.colors.secondary,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: FrustraTheme.colors.textDim,
    marginTop: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '900',
    color: FrustraTheme.colors.primary,
  },
  metricLabel: {
    fontSize: 12,
    color: FrustraTheme.colors.textDim,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
  },
  categoryGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  categoryBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    opacity: 0.2,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    textTransform: 'capitalize',
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  topCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.2)',
  },
  topTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
    lineHeight: 26,
  },
  topStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topStat: {
    alignItems: 'center',
  },
  topStatValue: {
    fontSize: 24,
    fontWeight: '800',
    color: FrustraTheme.colors.primary,
  },
  topStatLabel: {
    fontSize: 12,
    color: FrustraTheme.colors.textDim,
    marginTop: 4,
  },
  investCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  investTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
  },
  investText: {
    fontSize: 14,
    color: FrustraTheme.colors.textDim,
    lineHeight: 22,
    marginBottom: 16,
  },
  investButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  investButtonText: {
    color: '#FFF',
    fontWeight: '600',
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
