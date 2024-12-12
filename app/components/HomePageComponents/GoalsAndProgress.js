import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import goalsData from "../../utils/data/goalsData";
import { useTheme } from "../../utils/themeContext";

export default function GoalsAndProgress() {
  const { theme, headerFontSize, bodyFontSize } = useTheme();
  const styles = createStyles(theme, headerFontSize, bodyFontSize);

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
            borderRadius={5}
            color={theme.accentDark}
            unfilledColor={theme.accentLight}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            %{Math.round(goal.progress * 100)} tamamlandı
          </Text>
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme, headerFontSize, bodyFontSize) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.accentLight,
      borderRadius: 10,
      margin: 20,
    },
    header: {
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 20,
    },
    goalItem: {
      marginBottom: 20,
    },
    goalText: {
      fontSize: bodyFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 5,
    },
    progressText: {
      fontSize: bodyFontSize - 2,
      color: theme.textDark,
      marginTop: 5,
    },
  });
