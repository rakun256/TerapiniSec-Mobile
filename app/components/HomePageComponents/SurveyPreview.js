import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/globalStyles";
import surveysData from "../../utils/data/surveysData";
import { useRouter } from "expo-router";

export default function SurveysPreview() {
  const router = useRouter();

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentLight,
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
  },
  surveyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
    color: colors.accentDark,
  },
  surveyText: {
    fontSize: 16,
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
