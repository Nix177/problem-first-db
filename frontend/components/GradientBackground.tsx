import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, ViewStyle, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FrustraTheme } from '@/constants/FrustraTheme';

const { width, height } = Dimensions.get('window');

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
}

export function GradientBackground({ children, style }: Props) {
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0, duration: 4000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.6],
    });

    return (
        <LinearGradient
            colors={['#0A0A0F', '#0D1117', '#161B22']}
            style={[styles.container, style]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {/* Animated glow orbs */}
            <Animated.View style={[styles.glowOrb, styles.glowOrb1, { opacity: glowOpacity }]} />
            <Animated.View style={[styles.glowOrb, styles.glowOrb2, { opacity: glowOpacity }]} />

            {/* Grid overlay for tech feel */}
            <View style={styles.gridOverlay} />

            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    glowOrb: {
        position: 'absolute',
        borderRadius: 999,
    },
    glowOrb1: {
        width: 400,
        height: 400,
        top: -100,
        right: -150,
        backgroundColor: FrustraTheme.colors.primary,
        opacity: 0.15,
        filter: 'blur(100px)',
    },
    glowOrb2: {
        width: 300,
        height: 300,
        bottom: 100,
        left: -100,
        backgroundColor: FrustraTheme.colors.secondary,
        opacity: 0.1,
        filter: 'blur(80px)',
    },
    gridOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.02,
        // Would normally use an SVG grid pattern here
    },
});
