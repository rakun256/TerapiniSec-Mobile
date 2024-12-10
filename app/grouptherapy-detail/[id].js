import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import groupTherapiesData from "../utils/data/groupTherapiesData";
import { useTheme } from "../utils/themeContext";

export default function GroupTherapyDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const therapy = groupTherapiesData.find((item) => item.id === id);

  if (!therapy) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Grup terapisi bulunamadı.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{therapy.title}</Text>
      <Text style={styles.date}>
        {therapy.date} tarihinde, saat {therapy.time}
      </Text>
      <Text style={styles.description}>{therapy.description}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.backgroundLight,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    date: {
      fontSize: 16,
      color: theme.textDark,
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      color: theme.textLight,
      marginBottom: 20,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundLight,
    },
    errorText: {
      fontSize: 18,
      color: "red",
      textAlign: "center",
      marginBottom: 20,
    },
    backButton: {
      backgroundColor: theme.accentDark,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    backButtonText: {
      color: theme.textDark,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
