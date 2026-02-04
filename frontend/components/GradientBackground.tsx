import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FrustraTheme } from '@/constants/FrustraTheme';

interface Props {
    children?: React.ReactNode;
    style?: ViewStyle;
}

export function GradientBackground({ children, style }: Props) {
    return (
        <LinearGradient
            colors={[FrustraTheme.colors.background, '#111122']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.container, style]}
        >
            {/* Decorative Glows */}
            <LinearGradient
                colors={['rgba(0, 240, 255, 0.03)', 'transparent']}
                style={styles.glowTopLeft}
            />
            <LinearGradient
                colors={['rgba(255, 0, 85, 0.03)', 'transparent']}
                style={styles.glowBottomRight}
            />
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    glowTopLeft: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    glowBottomRight: {
        position: 'absolute',
        bottom: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
    },
});
