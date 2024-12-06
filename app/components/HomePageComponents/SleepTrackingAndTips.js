import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import sleepData from "../../utils/data/sleepData";
import colors from "../../styles/globalStyles";

export default function SleepTrackingAndTips() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Son Uyku Kayıtları */}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.accentLight,
    borderRadius: 10,
    margin: 20,
  },
  section: {
    marginBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
  },
  logItem: {
    backgroundColor: colors.backgroundLight,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  logText: {
    fontSize: 14,
    color: colors.textDark,
  },
  tipItem: {
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.accentDark,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: "bold",
  },
});
