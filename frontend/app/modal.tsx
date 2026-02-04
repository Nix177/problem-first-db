import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { GradientBackground } from '@/components/GradientBackground';
import { ThemedText } from '@/components/themed-text';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://localhost:3000/api';

export default function ProblemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await fetch(`${API_URL}/problems/${id}`);
      const data = await res.json();
      setProblem(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleProposeSolution = () => {
    Alert.alert("Coming Soon", "StartupNexus integration is under construction. Pitch your deck here soon!");
  };

  if (loading) {
    return (
      <GradientBackground style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={FrustraTheme.colors.primary} />
      </GradientBackground>
    );
  }

  if (!problem) return null;

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backText}>← Back</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          <ThemedText type="title" style={styles.title}>{problem.title}</ThemedText>

          <View style={styles.tagsRow}>
            {problem.tags?.map((tag: string, i: number) => (
              <View key={i} style={styles.tag}>
                <ThemedText style={styles.tagText}>#{tag}</ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.statRow}>
            <ThemedText style={styles.score}>{problem.score} People Frustrated</ThemedText>
          </View>

          <View style={styles.divider} />

          <ThemedText type="subtitle" style={styles.sectionTitle}>Context</ThemedText>
          <ThemedText style={styles.description}>
            {problem.description || "No further details provided for this frustration."}
          </ThemedText>

          <View style={styles.divider} />

          <ThemedText type="subtitle" style={styles.sectionTitle}>Community Discussion</ThemedText>
          {problem.comments?.length > 0 ? (
            problem.comments.map((c: any, i: number) => (
              <LinearGradient key={i} colors={['rgba(255,255,255,0.05)', 'transparent']} style={styles.commentCard}>
                <ThemedText style={styles.commentUser}>{c.user}</ThemedText>
                <ThemedText style={styles.commentText}>{c.text}</ThemedText>
              </LinearGradient>
            ))
          ) : (
            <ThemedText style={styles.emptyText}>No comments yet. Be the first to validate this.</ThemedText>
          )}

          <TouchableOpacity style={styles.ctaButton} onPress={handleProposeSolution}>
            <LinearGradient
              colors={[FrustraTheme.colors.primary, '#0090FF']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.ctaText}>PROPOSE SOLUTION</ThemedText>
              <ThemedText style={styles.ctaSubtext}>Build a startup for this audience</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: FrustraTheme.colors.textDim,
  },
  mainContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    lineHeight: 34,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#CCC',
    fontSize: 12,
  },
  statRow: {
    marginBottom: 20,
  },
  score: {
    color: FrustraTheme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: FrustraTheme.colors.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    lineHeight: 24,
    color: '#DDD',
    fontSize: 16,
  },
  commentCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: FrustraTheme.colors.primary,
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: FrustraTheme.colors.primary,
  },
  commentText: {
    color: '#EEE',
  },
  emptyText: {
    color: FrustraTheme.colors.textDim,
    fontStyle: 'italic',
  },
  ctaButton: {
    marginTop: 40,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: FrustraTheme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontWeight: '900',
    fontSize: 18,
    color: '#000',
    letterSpacing: 1,
  },
  ctaSubtext: {
    fontSize: 12,
    color: '#003344',
    marginTop: 4,
    fontWeight: '600',
  },
});
