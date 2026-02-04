import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: FrustraTheme.colors.primary,
        tabBarInactiveTintColor: FrustraTheme.colors.textDim,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Transparent background
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          },
          default: {
            backgroundColor: '#111',
            borderTopWidth: 0,
            borderColor: '#222',
          },
        }),
        tabBarBackground: () => (
          Platform.OS === 'ios' ?
            <BlurView intensity={80} style={{ flex: 1 }} tint="dark" /> :
            undefined
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="submit"
        options={{
          title: 'Submit',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.line.uptrend.xyaxis" color={color} />,
        }}
      />
    </Tabs>
  );
}
