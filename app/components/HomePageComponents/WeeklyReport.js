import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ProgressChart } from "react-native-chart-kit";
import weeklyReportData from "../../utils/data/weeklyReportData";
import colors from "../../styles/globalStyles";

export default function WeeklyReportPreview() {
  const router = useRouter();

  const chartConfig = {
    backgroundColor: colors.accentLight,
    backgroundGradientFrom: colors.accentLight,
    backgroundGradientTo: colors.accentLight,
    color: (opacity = 1, index) => {
      if (index === 0) return `rgba(0, 255, 0, ${opacity})`;
      if (index === 1) return `rgba(0, 0, 255, ${opacity})`;
      if (index === 2) return `rgba(255, 0, 0, ${opacity})`;
      return colors.textDark;
    },
    labelColor: (opacity = 1) => colors.textDark,
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/screens/WeeklyReportScreen")}
    >
      <Text style={styles.header}>Haftalık Raporunuz</Text>
      <ProgressChart
        data={weeklyReportData}
        width={260}
        height={160}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
        style={styles.chart}
      />
      <Text style={styles.text}>
        Geçtiğimiz haftadan daha sağlıklı uyudunuz. Tebrikler!
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentLight,
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    fontSize: 22, 
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 20,
    textAlign: "left",
  },
  chart: {
    marginBottom: 15, 
  },
  text: {
    fontSize: 16, 
    color: colors.textDark,
    textAlign: "center",
    marginTop: 10, 
    lineHeight: 20, 
  },
});
