import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../utils/themeContext";
import libraryData from "../../utils/data/libraryData";

export default function FileDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ?id=xxx
  const { theme, headerFontSize, bodyFontSize } = useTheme();
  const styles = createStyles(theme, headerFontSize, bodyFontSize);

  // Gelen ID'ye göre datadaki dokümanı bul
  const documentItem = libraryData.find((doc) => doc.id === Number(id));

  if (!documentItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Belge bulunamadı.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // documentUploadDate => tarih formatlama (opsiyonel)
  const dateObj = new Date(documentItem.documentUploadDate);
  const dateStr = dateObj.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeStr = dateObj.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Dokümanı açmak için Linking kullanabilirsiniz (PDF link, vs.)
  const handleOpenDocument = () => {
    // Deneme amaçlı, device tarayıcıda linki açar
    Linking.openURL(documentItem.documentUrl).catch((err) => {
      console.error("Belge açılamadı:", err);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{documentItem.title}</Text>
      <Text style={styles.author}>Yükleyen: {documentItem.uploaderName}</Text>
      <Text style={styles.info}>
        Yüklenme Tarihi: {dateStr} - {timeStr}
      </Text>
      <Text style={styles.description}>{documentItem.description}</Text>

      {/* Public / Premium bilgisi */}
      <Text style={styles.info}>
        Bu belge {documentItem.isPublic ? "genel erişime açık" : "özel"}.
      </Text>
      <Text style={styles.info}>
        {documentItem.accesibleByPremiumOnly
          ? "Yalnızca Premium kullanıcılar erişebilir"
          : "Tüm kullanıcılar erişebilir"}
      </Text>

      {/* Dokümanı açma butonu */}
      <TouchableOpacity style={styles.openButton} onPress={handleOpenDocument}>
        <Text style={styles.openButtonText}>Belgeyi Aç</Text>
      </TouchableOpacity>

      {/* Geri dönüş butonu */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme, headerFontSize, bodyFontSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundLight,
      padding: 20,
    },
    title: {
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    author: {
      fontSize: bodyFontSize,
      color: theme.textDark,
      marginBottom: 5,
    },
    info: {
      fontSize: bodyFontSize - 1,
      color: theme.textLight,
      marginBottom: 5,
    },
    description: {
      fontSize: bodyFontSize,
      color: theme.textDark,
      marginBottom: 15,
      lineHeight: 20,
    },
    openButton: {
      backgroundColor: theme.accentDark,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 20,
    },
    openButtonText: {
      color: theme.textDark,
      fontSize: bodyFontSize,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: theme.accentLight,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: theme.textDark,
      fontSize: bodyFontSize,
      fontWeight: "bold",
    },
    errorText: {
      fontSize: headerFontSize - 2,
      color: "red",
      marginBottom: 20,
    },
  });
