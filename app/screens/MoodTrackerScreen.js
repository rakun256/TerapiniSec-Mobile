import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../utils/themeContext";
import moodData from "../utils/data/moodData"; // Artık yeni şema

export default function MoodTrackerScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Örnek: userMoods dizisini, virgülle ayırarak tek satırda göstermek
  // veya ilk mood'u göstermek. Tamamen tasarıma bağlı.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruh halinizi takip edin</Text>
      <Text style={styles.description}>
        Ruh hali takibi, zihinsel sağlığınızı anlamak ve yönetmek için faydalı bir yöntem olabilir.
      </Text>
      <Text style={styles.subtitle}>Bugün kendinizi nasıl hissediyorsunuz?</Text>

      {/* Yeni ruh hali seçenekleri vs. */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text>Harika, kendimi iyi hissediyorum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Daha iyi olabilirdi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>İyi değilim</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Ruh halimi kaydet</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Geçmiş Ruh Hali Kayıtları</Text>
      <View style={styles.historyContainer}>
        {moodData.map((mood) => {
          // logDateTime -> tarih-saat formatlama
          const dateObj = new Date(mood.logDateTime);
          const dateStr = dateObj.toLocaleDateString("tr-TR");
          const timeStr = dateObj.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <View key={mood.id} style={styles.historyItem}>
              {/* Tarih-saat */}
              <Text style={styles.historyDate}>
                {dateStr} - {timeStr}
              </Text>
              {/* userMoods dizisini virgülle ayırarak gösteriyoruz */}
              <Text style={styles.historyMood}>
                {mood.userMoods.join(", ")} 
              </Text>
              {/* Description (kullanıcının o anki durumu) */}
              <Text style={styles.historyDescription}>
                {mood.description}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.backgroundLight,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.textDark,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      color: theme.textLight,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.textDark,
    },
    options: {
      marginBottom: 20,
    },
    option: {
      borderWidth: 0.5,
      borderColor: theme.textLight,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      backgroundColor: theme.accentLight,
    },
    recordButton: {
      backgroundColor: theme.accentDark,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 40,
    },
    recordButtonText: {
      color: theme.textDark,
      fontWeight: "bold",
    },
    historyContainer: {
      marginTop: 5,
      borderTopWidth: 1,
      borderColor: theme.accentLight,
      paddingTop: 10,
    },
    historyItem: {
      marginBottom: 10,
    },
    historyDate: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.textDark,
    },
    historyMood: {
      fontSize: 14,
      color: theme.textDark,
    },
    historyDescription: {
      fontSize: 14,
      color: theme.textLight,
    },
  });
