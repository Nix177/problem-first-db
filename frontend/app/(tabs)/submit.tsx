import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { ThemedText } from '@/components/themed-text';
import { FrustraTheme } from '@/constants/FrustraTheme';
import { router } from 'expo-router';

const API_URL = 'http://localhost:3000/api';

export default function SubmitScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert("Missing Info", "Please describe the problem.");
            return;
        }

        setSubmitting(true);
        try {
            await fetch(`${API_URL}/problems`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    tags: ["user-submitted", "manual"],
                    // description: description // Add if backend supports it
                })
            });
            Alert.alert("Success", "Problem submitted!", [
                {
                    text: "OK", onPress: () => {
                        setTitle('');
                        setDescription('');
                        router.push('/(tabs)');
                    }
                }
            ]);
        } catch (e) {
            Alert.alert("Error", "Failed to submit. Check connection.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <GradientBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <ThemedText type="title">New Frustration</ThemedText>
                        <ThemedText style={styles.subtitle}>What functionality is missing? What is broken?</ThemedText>
                    </View>

                    <View style={styles.form}>
                        <ThemedText style={styles.label}>PROBLEM STATEMENT</ThemedText>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., I can't find a reliable plumber..."
                            placeholderTextColor={FrustraTheme.colors.textDim}
                            value={title}
                            onChangeText={setTitle}
                            multiline
                        />

                        <ThemedText style={styles.label}>CONTEXT / DETAILS (Optional)</ThemedText>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe the situation..."
                            placeholderTextColor={FrustraTheme.colors.textDim}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            style={[styles.button, submitting && styles.buttonDisabled]}
                            onPress={handleSubmit}
                            disabled={submitting}
                        >
                            <ThemedText style={styles.buttonText}>
                                {submitting ? "SUBMITTING..." : "SUBMIT PROBLEM"}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: FrustraTheme.spacing.m,
        paddingTop: 60,
    },
    header: {
        marginBottom: 40,
    },
    subtitle: {
        marginTop: 8,
        color: FrustraTheme.colors.textDim,
    },
    form: {
        gap: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: FrustraTheme.colors.primary,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: FrustraTheme.borderRadius.m,
        padding: 16,
        color: '#FFF',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    textArea: {
        minHeight: 120,
    },
    button: {
        backgroundColor: FrustraTheme.colors.secondary,
        padding: 16,
        borderRadius: FrustraTheme.borderRadius.l,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: FrustraTheme.colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
