import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import tasksData from "../../utils/data/tasksData";
import colors from "../../styles/globalStyles";

export default function Tasks() {
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
        color={colors.accentDark}
        unfilledColor={colors.accentLight}
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

const styles = StyleSheet.create({
  taskSection: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  taskHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
  },
  progressBar: {
    marginVertical: 10,
  },
  progressText: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 10,
    textAlign: "right",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.accentLight,
    borderRadius: 5,
    
  },
  taskIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  taskText: {
    fontSize: 16,
    color: colors.textDark,
    marginRight: 20,
  },
});
