import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ProgressChart } from "react-native-chart-kit";
import weeklyReportData from "../../utils/data/weeklyReportData";
import { useTheme } from "../../utils/themeContext";

export default function WeeklyReportPreview() {
  const router = useRouter();
  const { theme , headerFontSize , bodyFontSize} = useTheme(); // Temayı alıyoruz
  const styles = createStyles(theme, headerFontSize , bodyFontSize); // Temaya dayalı stiller oluşturuyoruz

  const chartConfig = {
    backgroundColor: theme.accentLight,
    backgroundGradientFrom: theme.accentLight,
    backgroundGradientTo: theme.accentLight,
    color: (opacity = 1, index) => {
      if (index === 0) return `rgba(0, 255, 0, ${opacity})`;
      if (index === 1) return `rgba(0, 0, 255, ${opacity})`;
      if (index === 2) return `rgba(255, 0, 0, ${opacity})`;
      return theme.textDark;
    },
    labelColor: (opacity = 1) => theme.textDark,
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

// Dinamik temaya göre stil oluşturma fonksiyonu
const createStyles = (theme, headerFontSize , bodyFontSize) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.accentLight,
      borderRadius: 15,
      padding: 20,
      margin: 20,
      alignItems: "center",
    },
    header: {
      width: "100%",
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 20,
      textAlign: "left",
    },
    chart: {
      marginBottom: 15,
    },
    text: {
      fontSize: bodyFontSize,
      color: theme.textDark,
      textAlign: "center",
      marginTop: 10,
      lineHeight: 20,
    },
  });
