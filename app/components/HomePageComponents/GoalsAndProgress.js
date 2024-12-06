import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import goalsData from "../../utils/data/goalsData";
import colors from "../../styles/globalStyles";

export default function GoalsAndProgress() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hedefler ve İlerleme</Text>
      {goalsData.map((goal) => (
        <View key={goal.id} style={styles.goalItem}>
          <Text style={styles.goalText}>{goal.title}</Text>
          <ProgressBar
            progress={goal.progress}
            width={null}
            height={10}
            color={colors.accentDark}
            unfilledColor={colors.accentLight}
            borderWidth={0}
          />
          <Text style={styles.progressText}>
            %{Math.round(goal.progress * 100)} tamamlandı
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.accentLight,
    borderRadius: 10,
    margin: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 20,
  },
  goalItem: {
    marginBottom: 20,
  },
  goalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: colors.textDark,
    marginTop: 5,
  },
});
