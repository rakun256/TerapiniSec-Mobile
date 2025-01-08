import React, { useState } from "react";
import { useTheme } from "../../utils/themeContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import surveysData from "../../utils/data/surveysData";

export default function SurveyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ?id=1 vb. parametreyi yakalıyoruz
  const { theme, headerFontSize, bodyFontSize } = useTheme();
  const styles = createStyles(theme, headerFontSize, bodyFontSize);

  // 1) SurveysData içinden bu anketi bul:
  const survey = surveysData.find((s) => s.id === id);

  // 2) Form state: Mesela 2 tane soru olduğunu varsayalım:
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
  });

  // 3) Anket yoksa basit bir hata mesajı
  if (!survey) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Anket bulunamadı.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tarih formatlama
  const dateObj = new Date(survey.surveyCreatedAt);
  const dateStr = dateObj.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeStr = dateObj.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // 4) Anketi gönderme fonksiyonu (şu an mock)
  const handleSubmit = () => {
    Alert.alert("Teşekkürler!", "Anket yanıtlarınız kaydedildi (mock).");
    // console.log("Submitted answers:", answers);
    // router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{survey.title}</Text>
      <Text style={styles.subHeader}>
        Oluşturulma Tarihi: {dateStr} - {timeStr}
      </Text>
      <Text style={styles.description}>{survey.description}</Text>

      {/* Örnek sorular */}
      <Text style={styles.question}>Soru 1: Gün içerisinde enerjinizi nasıl değerlendirirsiniz?</Text>
      <TextInput
        style={styles.input}
        placeholder="Cevabınız..."
        placeholderTextColor={theme.textLight}
        value={answers.question1}
        onChangeText={(text) => setAnswers({ ...answers, question1: text })}
      />

      <Text style={styles.question}>Soru 2: Son zamanlarda stres seviyeniz nasıl?</Text>
      <TextInput
        style={styles.input}
        placeholder="Cevabınız..."
        placeholderTextColor={theme.textLight}
        value={answers.question2}
        onChangeText={(text) => setAnswers({ ...answers, question2: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Gönder</Text>
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
    header: {
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    subHeader: {
      fontSize: bodyFontSize,
      color: theme.textDark,
      marginBottom: 10,
    },
    description: {
      fontSize: bodyFontSize,
      color: theme.textLight,
      marginBottom: 20,
      lineHeight: 20,
    },
    question: {
      fontSize: bodyFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.textLight,
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
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
