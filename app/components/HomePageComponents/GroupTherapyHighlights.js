import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import groupTherapiesData from "../../utils/data/groupTherapiesData"; // Artık yeni şema
import { useTheme } from "../../utils/themeContext";

const { width } = Dimensions.get("window");

export default function GroupTherapyFlatList() {
  const router = useRouter();
  const { theme, headerFontSize, bodyFontSize } = useTheme();
  const styles = createStyles(theme, headerFontSize, bodyFontSize);

  const renderItem = ({ item }) => {
    // Tarih ve saat formatlama
    const dateObj = new Date(item.sessionDateTime);
    const dateStr = dateObj.toLocaleDateString("tr-TR"); // Örn. "10.12.2024"
    const timeStr = dateObj.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.card}>
        {/* sessionName'i başlık olarak göster */}
        <Text style={styles.cardTitle}>{item.sessionName}</Text>

        {/* sessionDateTime’den alınan tarih/saat bilgisi */}
        <Text style={styles.cardDate}>
          {dateStr} tarihinde, saat {timeStr}
        </Text>

        {/* description alanı */}
        <Text style={styles.cardDescription}>{item.description}</Text>

        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => router.push(`/grouptherapy-detail/${item.id}`)}
        >
          <Text style={styles.detailButtonText}>Detayları Gör</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yaklaşan Grup Terapileri</Text>
      <FlatList
        data={groupTherapiesData}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        snapToInterval={width * 0.8 + 15}
        decelerationRate="fast"
        snapToAlignment="start"
        overScrollMode="never"
      />
    </View>
  );
}

const createStyles = (theme, headerFontSize, bodyFontSize) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.backgroundLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: 20,
    },
    header: {
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 15,
    },
    flatListContainer: {
      paddingLeft: 10,
    },
    card: {
      backgroundColor: theme.accentLight,
      padding: 20,
      borderRadius: 10,
      marginRight: 15,
      width: width * 0.8,
    },
    cardTitle: {
      fontSize: headerFontSize - 1,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    cardDate: {
      fontSize: bodyFontSize - 2,
      color: theme.textDark,
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: bodyFontSize - 2,
      color: theme.textDark,
      marginBottom: 15,
    },
    detailButton: {
      backgroundColor: theme.accentDark,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    detailButtonText: {
      color: theme.textDark,
      fontWeight: "bold",
      fontSize: bodyFontSize,
    },
  });
