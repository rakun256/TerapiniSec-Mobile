import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/globalStyles";
import libraryData from "../../utils/data/libraryData";

export default function LibraryPreview() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/screens/FileDetailScreen?id=${item.id}`)}
    >
      <View style={styles.bookCover}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>by {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Günün Kaynağı</Text>
      <FlatList
        data={libraryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/LibraryScreen")}
      >
        <Text style={styles.buttonText}>Tüm Kaynaklara Git</Text>
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
  flatListContainer: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: colors.accentDark,
    borderRadius: 10,
    width: 150,
    marginRight: 15,
    padding: 10,
    alignItems: "center",
  },
  bookCover: {
    width: 140,
    height: 200,
    backgroundColor: colors.accentDark,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
    textAlign: "left",
    marginBottom: 50,
    width: "100%",
  },
  bookAuthor: {
    width: "100%",
    fontSize: 14,
    color: colors.textLight,
    textAlign: "left",
  },
  button: {
    backgroundColor: colors.accentDark,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: "bold",
  },
});
