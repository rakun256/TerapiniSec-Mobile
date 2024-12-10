import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../utils/themeContext";
import moodData from "../utils/data/moodData";

export default function MoodTrackerScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruh halinizi takip edin</Text>
      <Text style={styles.description}>
        Ruh hali takibi, zihinsel sağlığınızı anlamak ve yönetmek için faydalı bir yöntem olabilir.
      </Text>
      <Text style={styles.subtitle}>Bugün kendinizi nasıl hissediyorsunuz?</Text>

      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text>Harika, kendimi iyi hissediyorum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Daha iyi olabilirdi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>İyi değilim</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Ruh halimi kaydet</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Geçmiş Ruh Hali Kayıtları</Text>
      <View style={styles.historyContainer}>
        {moodData.map((mood) => (
          <View key={mood.id} style={styles.historyItem}>
            <Text style={styles.historyDate}>{mood.date}</Text>
            <Text style={styles.historyMood}>{mood.mood}</Text>
          </View>
        ))}
      </View>
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
      marginBottom: 10,
      color: theme.textDark,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      color: theme.textLight,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.textDark,
    },
    options: {
      marginBottom: 20,
    },
    option: {
      borderWidth: 0.5,
      borderColor: theme.textLight,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      backgroundColor: theme.accentLight,
    },
    recordButton: {
      backgroundColor: theme.accentDark,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    recordButtonText: {
      color: theme.textDark,
      fontWeight: "bold",
    },
    historyContainer: {
      marginTop: 20,
      borderTopWidth: 1,
      borderColor: theme.accentLight,
      paddingTop: 10,
    },
    historyItem: {
      marginBottom: 10,
    },
    historyDate: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.textDark,
    },
    historyMood: {
      fontSize: 14,
      color: theme.textLight,
    },
  });
