import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import storiesData from "../utils/data/storiesData";

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams();
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
      {/* Şeffaf Üst Bar */}
      <View style={styles.header}>
        <Image source={story.image} style={styles.headerImage} />
        <Text style={styles.headerTitle}>{story.title}</Text>
        <TouchableOpacity onPress={() => router.push(`/`)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Detay Görüntüsü */}
      <Image source={{ uri: story.detailImage }} style={styles.storyImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  storyImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
