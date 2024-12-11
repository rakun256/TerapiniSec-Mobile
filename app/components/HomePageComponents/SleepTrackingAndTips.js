import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import sleepData from "../../utils/data/sleepData";
import { useTheme } from "../../utils/themeContext";

export default function SleepTrackingAndTips() {
  const router = useRouter();
  const { theme, headerFontSize, bodyFontSize } = useTheme();
  const styles = createStyles(theme, headerFontSize, bodyFontSize);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Son Uyku Kayıtları</Text>
        {sleepData.logs.map((log) => (
          <View key={log.id} style={styles.logItem}>
            <Text style={styles.logText}>
              {log.date} - {log.duration} ({log.quality})
            </Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/screens/SleepLogScreen")}
        >
          <Text style={styles.buttonText}>Uyku Kayıtlarını Gör</Text>
        </TouchableOpacity>
      </View>

      {/* Daha İyi Uyku için İpuçları */}
      <View style={styles.section}>
        <Text style={styles.header}>Daha İyi Uyku için İpuçları</Text>
        {sleepData.tips.map((tip) => (
          <View key={tip.id} style={styles.tipItem}>
            <Text style={styles.tipText}>• {tip.title}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/screens/SleepLogDetailScreen")}
        >
          <Text style={styles.buttonText}>Uyku İpuçlarını Oku</Text>
        </TouchableOpacity>
      </View>
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
    section: {
      marginBottom: 40,
    },
    header: {
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    logItem: {
      backgroundColor: theme.backgroundLight,
      padding: 10,
      marginBottom: 5,
      borderRadius: 5,
    },
    logText: {
      fontSize: bodyFontSize - 2,
      color: theme.textDark,
    },
    tipItem: {
      marginBottom: 5,
    },
    tipText: {
      fontSize: bodyFontSize - 2,
      color: theme.textDark,
    },
    button: {
      backgroundColor: theme.accentDark,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: theme.textDark,
      fontSize: bodyFontSize,
      fontWeight: "bold",
    },
  });
