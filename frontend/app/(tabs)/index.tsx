import { Image, StyleSheet, Platform, ScrollView, View, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const problems = [
    { id: 1, title: "Can't find reliable contractors", score: 85, color: '#FF6B6B' },
    { id: 2, title: "Too many subscription emails", score: 92, color: '#4ECDC4' },
    { id: 3, title: "Cooking for one is wasteful", score: 78, color: '#FFE66D' },
    { id: 4, title: "Networking events are awkward", score: 64, color: '#1A535C' },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Problèmes Validés</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Top Frustrations de la Semaine</ThemedText>
        <ThemedText>
          Voici les problèmes détectés par <ThemedText type="defaultSemiBold">FrustrationMiner</ThemedText> qui cherchent une solution.
        </ThemedText>
      </ThemedView>

      {problems.map((p) => (
        <View key={p.id} style={[styles.card, { borderLeftColor: p.color }]}>
          <Text style={styles.cardTitle}>{p.title}</Text>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>{p.score}% Besoin</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>J'ai ce problème</Text>
          </TouchableOpacity>
        </View>
      ))}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  scoreText: {
    color: '#DDD',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  }
});
