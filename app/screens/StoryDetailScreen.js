import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSearchParams } from "expo-router";
import colors from "../styles/globalStyles";
import storiesData from "../utils/data/storiesData";

export default function StoryDetailScreen() {
  const { id } = useSearchParams(); 
  const story = storiesData.find((item) => item.id === id); 

  if (!story) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Hikaye bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={story.image} style={styles.storyImage} />
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.description}>Bu hikaye ile ilham alın!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    padding: 20,
  },
  storyImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: colors.textDark,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
