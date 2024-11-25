import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/globalStyles";

export default function MoodTrackerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track your mood</Text>
      <Text style={styles.description}>
        Mood tracking can be a helpful way to understand and manage your mental health.
      </Text>
      <Text style={styles.subtitle}>How are you feeling today?</Text>

      {/* Seçenekler */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text>Great, I'm doing well</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Could be better</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Not good</Text>
        </TouchableOpacity>
      </View>

      {/* Butonlar */}
      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Record my mood</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyButtonText}>View my history</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textDark,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.textLight,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textDark,
  },
  options: {
    marginBottom: 20,
  },
  option: {
    borderWidth: 0.5,
    borderColor: colors.textLight,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: colors.accentLight,
  },
  recordButton: {
    backgroundColor: colors.accentDark,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  recordButtonText: {
    color: colors.textDark,
    fontWeight: "bold",
  },
  historyButton: {
    backgroundColor: colors.accentDark,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  historyButtonText: {
    color: colors.textDark,
    fontWeight: "bold",
  },
});
