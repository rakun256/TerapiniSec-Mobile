import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/globalStyles";

export default function MoodTracker() {
  const router = useRouter();

  return (
    <View style={styles.moodTrackerSection}>
      <Text style={styles.moodTrackerHeader}>Ruh Halinizi Kaydedin 📝</Text>
      <TouchableOpacity
        onPress={() => router.push("/mood-tracker")}
        style={styles.moodTrackerButton}
      >
        <Text style={styles.moodTrackerButtonText}>Ruh Hali Kaydına Git</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  moodTrackerSection: {
    backgroundColor: colors.accentLight,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  moodTrackerHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
    textAlign: "center",
  },
  moodTrackerButton: {
    backgroundColor: colors.accentDark,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  moodTrackerButtonText: {
    color: colors.textDark,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
