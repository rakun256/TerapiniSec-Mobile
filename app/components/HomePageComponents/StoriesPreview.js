import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/globalStyles";
import storiesData from "../../utils/data/storiesData";

export default function StoriesPreview() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.story}
      onPress={() => router.push(`/story-detail/${item.id}`)} 
    >
      <View style={styles.storyCircle}>
        <Image source={item.image} style={styles.storyImage} />
      </View>
      <Text style={styles.storyText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={storiesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  flatListContainer: {
    paddingVertical: 10,
  },
  story: {
    alignItems: "center",
    marginRight: 15,
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.accentDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyText: {
    fontSize: 12,
    color: colors.textDark,
    textAlign: "center",
  },
});
