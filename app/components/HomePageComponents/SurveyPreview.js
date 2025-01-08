import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../utils/themeContext";
import surveysData from "../../utils/data/surveysData";
import { useRouter } from "expo-router";

export default function SurveysPreview() {
  const router = useRouter();
  const { theme, headerFontSize, bodyFontSize } = useTheme();
  const styles = createStyles(theme, headerFontSize, bodyFontSize);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bugün Katılmanız Gereken Anketler</Text>
      {surveysData.map((survey) => (
        <TouchableOpacity
          key={survey.id}
          style={styles.surveyItem}
          onPress={() => router.push(`/screens/SurveyDetailScreen?id=${survey.id}`)}
        >
          <FontAwesomeIcon icon={faClipboardList} style={styles.icon} size={18} />
          <Text style={styles.surveyText}>{survey.title}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/SurveyListScreen")}
      >
        <Text style={styles.buttonText}>Tüm Anketlere Git</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme, headerFontSize, bodyFontSize) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.accentLight,
      borderRadius: 10,
      padding: 20,
      margin: 20,
    },
    header: {
      fontSize: headerFontSize - 2,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    surveyItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.backgroundLight,
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    icon: {
      marginRight: 10,
      color: theme.accentDark,
    },
    surveyText: {
      fontSize: bodyFontSize,
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
