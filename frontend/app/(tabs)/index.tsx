import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, View, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { ProblemCard, Problem } from '@/components/ProblemCard';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { ThemedText } from '@/components/themed-text';

const API_URL = 'http://localhost:3000/api'; // Or your local IP if running on device

export default function HomeScreen() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProblems = async () => {
    try {
      const response = await fetch(`${API_URL}/problems`);
      const data = await response.json();
      // Sort by score descending
      setProblems(data.sort((a: any, b: any) => b.score - a.score));
    } catch (error) {
      console.error(error);
      // Alert.alert("Error", "Could not fetch problems. ensure backend is running.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleVote = async (id: number) => {
    try {
      await fetch(`${API_URL}/vote/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: "user_mobile_1" }) // Mock User
      });
    } catch (e) {
      console.error("Vote failed", e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProblems();
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.appTitle}>Frustra</ThemedText>
          <ThemedText style={styles.appSubtitle}>The Problem Database</ThemedText>
        </View>

        {loading ? (
          <ActivityIndicator color={FrustraTheme.colors.primary} size="large" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={problems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProblemCard problem={item} onVote={handleVote} />
            )}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={FrustraTheme.colors.primary}
              />
            }
          />
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: FrustraTheme.spacing.m,
    paddingTop: 40,
    marginBottom: 0,
  },
  appTitle: {
    fontFamily: 'SpaceMono', // or default bold
    color: '#FFF',
    fontSize: 32,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  appSubtitle: {
    color: FrustraTheme.colors.primary,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
    opacity: 0.8,
  },
  listContent: {
    padding: FrustraTheme.spacing.m,
    paddingTop: 0,
  },
});
