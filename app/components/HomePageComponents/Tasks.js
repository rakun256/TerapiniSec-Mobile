import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import tasksData from "../../utils/data/tasksData";
import { useTheme } from "../../utils/themeContext";

export default function Tasks() {
  const { theme , headerFontSize, bodyFontSize} = useTheme(); // Temayı alıyoruz
  const styles = createStyles(theme,headerFontSize,bodyFontSize); // Dinamik stiller oluşturuyoruz

  const completedTasks = tasksData.filter((task) => task.completed).length;
  const totalTasks = tasksData.length;
  const progress = completedTasks / totalTasks;

  return (
    <View style={styles.taskSection}>
      <Text style={styles.taskHeader}>Günlük Görevleriniz</Text>
      <Progress.Bar
        progress={progress}
        width={null}
        height={10}
        borderRadius={5}
        color={theme.accentDark}
        unfilledColor={theme.accentLight}
        style={styles.progressBar}
      />
      <Text style={styles.progressText}>
        {completedTasks}/{totalTasks} görev tamamlandı
      </Text>
      {tasksData.map((task) => (
        <View key={task.id} style={styles.taskItem}>
          <Text style={styles.taskIcon}>{task.icon}</Text>
          <Text style={styles.taskText}>{task.text}</Text>
        </View>
      ))}
    </View>
  );
}

// Dinamik temaya göre stil oluşturma fonksiyonu
const createStyles = (theme,headerFontSize,bodyFontSize) =>
  StyleSheet.create({
    taskSection: {
      padding: 20,
      backgroundColor: theme.backgroundLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -20,
    },
    taskHeader: {
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    progressBar: {
      marginVertical: 10,
    },
    progressText: {
      fontSize: bodyFontSize,
      color: theme.textDark,
      marginBottom: 10,
      textAlign: "right",
    },
    taskItem: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: theme.accentLight,
      borderRadius: 5,
    },
    taskIcon: {
      fontSize: 24,
      marginRight: 15,
    },
    taskText: {
      fontSize: bodyFontSize,
      color: theme.textDark,
      marginRight: 20,
    },
  });

